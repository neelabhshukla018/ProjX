import Task from '../models/Task.js';
import Project from '../models/Project.js';
import Comment from '../models/Comment.js';
import { createNotification } from './notificationController.js';

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private (Project Manager only)
export const createTask = async (req, res, next) => {
  try {
    const { title, description, project: projectId, assignedTo, priority, dueDate, status } = req.body;

    if (!title || !projectId || !assignedTo || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Task title, associated project, assigned team member, and due date are required',
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Associated project not found' });
    }

    // Verify ownership: PM must own the project
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only create tasks for projects you own',
      });
    }

    // Verify assignedTo is an accepted member of the project
    const isMember = project.members.some((m) => m.toString() === assignedTo.toString());
    if (!isMember) {
      return res.status(400).json({
        success: false,
        message: 'Cannot assign task: the selected user is not an accepted member of this project',
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      project: projectId,
      assignedTo,
      createdBy: req.user._id,
      priority: priority || 'Medium',
      dueDate: new Date(dueDate),
      status: status || 'To Do',
    });

    // Notify assigned team member
    await createNotification({
      recipient: assignedTo,
      sender: req.user._id,
      type: 'task_assigned',
      title: 'New Task Assigned',
      message: `You have been assigned "${task.title}" in project "${project.name}".`,
      relatedProject: project._id,
      relatedTask: task._id,
    });

    const populated = await Task.findById(task._id)
      .populate('project', 'name status deadline')
      .populate('assignedTo', 'fullName email profilePhoto headline')
      .populate('createdBy', 'fullName email profilePhoto headline');

    res.status(201).json({
      success: true,
      message: 'Task created and assigned successfully',
      task: populated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's tasks
// @route   GET /api/tasks/my-tasks
// @access  Private
export const getMyTasks = async (req, res, next) => {
  try {
    let query = {};

    if (req.user.role === 'team_member') {
      // Team members only see tasks assigned to them
      query = { assignedTo: req.user._id };
    } else {
      // PM sees tasks in projects they own or tasks they created
      const ownedProjects = await Project.find({ owner: req.user._id }).select('_id');
      const projectIds = ownedProjects.map((p) => p._id);
      query = {
        $or: [{ project: { $in: projectIds } }, { createdBy: req.user._id }],
      };
    }

    const tasks = await Task.find(query)
      .populate('project', 'name status deadline photo')
      .populate('assignedTo', 'fullName email profilePhoto headline')
      .populate('createdBy', 'fullName email profilePhoto headline')
      .sort({ dueDate: 1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks for a specific project
// @route   GET /api/tasks/project/:projectId
// @access  Private
export const getProjectTasks = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Access check: must be PM owner or accepted project member
    const isOwner = project.owner.toString() === req.user._id.toString();
    const isMember = project.members.some((m) => m.toString() === req.user._id.toString());

    if (!isOwner && !isMember) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have access to tasks in this project',
      });
    }

    const tasks = await Task.find({ project: project._id })
      .populate('project', 'name status')
      .populate('assignedTo', 'fullName email profilePhoto headline')
      .populate('createdBy', 'fullName email profilePhoto headline')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('project', 'name status owner members')
      .populate('assignedTo', 'fullName email profilePhoto headline skills experience')
      .populate('createdBy', 'fullName email profilePhoto headline');

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Access check
    const isOwner = task.project.owner.toString() === req.user._id.toString();
    const isMember = task.project.members.some((m) => m.toString() === req.user._id.toString());
    const isAssigned = task.assignedTo._id.toString() === req.user._id.toString();

    if (!isOwner && !isMember && !isAssigned) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You are not authorized to view this task',
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task details or status
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const isOwner = task.project.owner.toString() === req.user._id.toString();
    const isAssigned = task.assignedTo.toString() === req.user._id.toString();

    if (!isOwner && !isAssigned) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to modify this task',
      });
    }

    const {
      title,
      description,
      priority,
      status,
      dueDate,
      assignedTo,
      progressUpdate,
    } = req.body;

    // PM can update all fields
    if (isOwner) {
      if (title) task.title = title.trim();
      if (description !== undefined) task.description = description.trim();
      if (priority) task.priority = priority;
      if (status) task.status = status;
      if (dueDate) task.dueDate = new Date(dueDate);
      if (progressUpdate !== undefined) task.progressUpdate = progressUpdate.trim();

      if (assignedTo && assignedTo !== task.assignedTo.toString()) {
        const isNewAssigneeMember = task.project.members.some(
          (m) => m.toString() === assignedTo.toString()
        );
        if (!isNewAssigneeMember) {
          return res.status(400).json({
            success: false,
            message: 'New assignee must be an accepted member of the project',
          });
        }
        task.assignedTo = assignedTo;
      }
    }
    // Team member assigned to this task can only update status and progressUpdate
    else if (isAssigned) {
      if (status) {
        if (!['To Do', 'In Progress', 'In Review', 'Completed'].includes(status)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid status value',
          });
        }
        task.status = status;
      }
      if (progressUpdate !== undefined) {
        task.progressUpdate = progressUpdate.trim();
      }
    }

    await task.save();

    // Trigger notifications based on who updated the task
    if (isOwner && task.assignedTo.toString() !== req.user._id.toString()) {
      await createNotification({
        recipient: task.assignedTo,
        sender: req.user._id,
        type: 'task_updated',
        title: 'Assigned Task Updated',
        message: `Project Manager updated task "${task.title}" (Status: ${task.status}).`,
        relatedProject: task.project._id || task.project,
        relatedTask: task._id,
      });
    } else if (isAssigned && task.project.owner.toString() !== req.user._id.toString()) {
      const isReview = task.status === 'In Review';
      await createNotification({
        recipient: task.project.owner,
        sender: req.user._id,
        type: isReview ? 'task_submitted' : 'task_progress',
        title: isReview ? 'Work Submitted for Review' : 'Task Progress Update',
        message: `${req.user.fullName} updated task "${task.title}" to "${task.status}"${task.progressUpdate ? `: "${task.progressUpdate}"` : ''}`,
        relatedProject: task.project._id || task.project,
        relatedTask: task._id,
      });
    }

    const updated = await Task.findById(task._id)
      .populate('project', 'name status')
      .populate('assignedTo', 'fullName email profilePhoto headline')
      .populate('createdBy', 'fullName email profilePhoto headline');

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private (Project Manager owner only)
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Only PM owner of the project can delete tasks
    if (task.project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Only the Project Manager who owns the project can delete tasks',
      });
    }

    await Comment.deleteMany({ task: task._id });
    await Task.findByIdAndDelete(task._id);

    res.status(200).json({
      success: true,
      message: 'Task removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
