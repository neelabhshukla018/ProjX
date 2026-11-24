import Comment from '../models/Comment.js';
import Task from '../models/Task.js';
import Project from '../models/Project.js';
import { createNotification } from './notificationController.js';

// @desc    Add comment to a task
// @route   POST /api/comments
// @access  Private
export const addComment = async (req, res, next) => {
  try {
    const { taskId, message } = req.body;

    if (!taskId || !message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Task ID and message are required',
      });
    }

    const task = await Task.findById(taskId).populate('project');
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Check permission: PM owner or project member or assigned to task
    const isOwner = task.project.owner.toString() === req.user._id.toString();
    const isMember = task.project.members.some((m) => m.toString() === req.user._id.toString());
    const isAssigned = task.assignedTo.toString() === req.user._id.toString();

    if (!isOwner && !isMember && !isAssigned) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You cannot comment on tasks in projects you do not belong to',
      });
    }

    const comment = await Comment.create({
      task: taskId,
      author: req.user._id,
      message: message.trim(),
    });

    // Notify counterpart (PM -> Assignee, or Team Member -> PM)
    if (isOwner && task.assignedTo.toString() !== req.user._id.toString()) {
      await createNotification({
        recipient: task.assignedTo,
        sender: req.user._id,
        type: 'task_feedback',
        title: 'Project Manager Feedback',
        message: `${req.user.fullName} commented on "${task.title}": "${message.trim().slice(0, 70)}"`,
        relatedProject: task.project._id || task.project,
        relatedTask: task._id,
      });
    } else if (!isOwner && task.project.owner.toString() !== req.user._id.toString()) {
      await createNotification({
        recipient: task.project.owner,
        sender: req.user._id,
        type: 'comment_added',
        title: 'New Comment on Task',
        message: `${req.user.fullName} commented on "${task.title}": "${message.trim().slice(0, 70)}"`,
        relatedProject: task.project._id || task.project,
        relatedTask: task._id,
      });
    }

    const populated = await Comment.findById(comment._id)
      .populate('author', 'fullName email profilePhoto role headline');

    res.status(201).json({
      success: true,
      message: 'Comment added',
      comment: populated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get comments for a task
// @route   GET /api/comments/task/:taskId
// @access  Private
export const getTaskComments = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId).populate('project');
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Verify access
    const isOwner = task.project.owner.toString() === req.user._id.toString();
    const isMember = task.project.members.some((m) => m.toString() === req.user._id.toString());
    const isAssigned = task.assignedTo.toString() === req.user._id.toString();

    if (!isOwner && !isMember && !isAssigned) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You cannot view comments for this task',
      });
    }

    const comments = await Comment.find({ task: taskId })
      .populate('author', 'fullName email profilePhoto role headline')
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private (Author only)
export const updateComment = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message content is required' });
    }

    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only edit your own comments',
      });
    }

    comment.message = message.trim();
    await comment.save();

    const updated = await Comment.findById(comment._id)
      .populate('author', 'fullName email profilePhoto role headline');

    res.status(200).json({
      success: true,
      message: 'Comment updated',
      comment: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private (Author or PM project owner)
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id).populate({
      path: 'task',
      populate: { path: 'project' },
    });

    if (!comment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    const isAuthor = comment.author.toString() === req.user._id.toString();
    const isPM = comment.task?.project?.owner?.toString() === req.user._id.toString();

    if (!isAuthor && !isPM) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to delete this comment',
      });
    }

    await Comment.findByIdAndDelete(comment._id);

    res.status(200).json({
      success: true,
      message: 'Comment removed',
    });
  } catch (error) {
    next(error);
  }
};
