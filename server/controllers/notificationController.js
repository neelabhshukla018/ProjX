import Notification from '../models/Notification.js';

// Helper to reliably create a notification from any backend controller
export const createNotification = async ({
  recipient,
  sender,
  type,
  title,
  message,
  relatedProject = null,
  relatedTask = null,
  relatedApplication = null,
}) => {
  try {
    if (!recipient || !sender || !type || !title || !message) return null;
    // Don't notify oneself
    if (recipient.toString() === sender.toString()) return null;

    return await Notification.create({
      recipient,
      sender,
      type,
      title,
      message,
      relatedProject,
      relatedTask,
      relatedApplication,
      isRead: false,
    });
  } catch (err) {
    console.warn('[Notification Error]: Failed to create notification:', err.message);
    return null;
  }
};

// @desc    Get logged in user's notifications
// @route   GET /api/notifications
// @access  Private
export const getMyNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .populate('sender', 'fullName email profilePhoto role headline')
      .populate('relatedProject', 'name status deadline photo')
      .populate('relatedTask', 'title status priority dueDate')
      .populate('relatedApplication', 'status appliedAt')
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false,
    });

    res.status(200).json({
      success: true,
      count: notifications.length,
      unreadCount,
      notifications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get unread notification count
// @route   GET /api/notifications/unread-count
// @access  Private
export const getUnreadCount = async (req, res, next) => {
  try {
    const count = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false,
    });

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark a specific notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      recipient: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found or access denied',
      });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      notification,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark all notifications as read for current user
// @route   PATCH /api/notifications/read-all
// @access  Private
export const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
// @access  Private
export const deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found or access denied',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Notification removed',
    });
  } catch (error) {
    next(error);
  }
};
