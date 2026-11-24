import Project from '../models/Project.js';
import Application from '../models/Application.js';
import Task from '../models/Task.js';
import Comment from '../models/Comment.js';

// Helper to compute dynamic project progress from tasks
const computeProjectStats = async (projectId) => {
  const tasks = await Task.find({ project: projectId }).select('status');
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const inReviewTasks = tasks.filter((t) => t.status === 'In Review').length;
  const todoTasks = tasks.filter((t) => t.status === 'To Do').length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return {
    totalTasks,
    completedTasks,
    inProgressTasks,
    inReviewTasks,
    todoTasks,
    progress,
  };
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Project Manager only)
export const createProject = async (req, res, next) => {
  try {
    const {
      name,
      description,
      requiredSkills,
      requiredExperience,
      requiredMembers,
      startDate,
      deadline,
      status,
    } = req.body;

    if (!name || !description || !deadline) {
      return res.status(400).json({
        success: false,
        message: 'Project name, description, and deadline are required',
      });
    }

    // Process photo and documents from multer if present
    let photo = '';
    let documents = [];

    if (req.files) {
      if (req.files.photo && req.files.photo[0]) {
        photo = `/uploads/projects/${req.files.photo[0].filename}`;
      }
      if (req.files.documents && req.files.documents.length > 0) {
        documents = req.files.documents.map((f) => `/uploads/documents/${f.filename}`);
      }
    } else if (req.body.photo) {
      photo = req.body.photo;
    }

    const skills = Array.isArray(requiredSkills)
      ? requiredSkills
      : typeof requiredSkills === 'string'
      ? requiredSkills.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const project = await Project.create({
      name: name.trim(),
      description: description.trim(),
      photo,
      documents,
      requiredSkills: skills,
      requiredExperience: requiredExperience || '',
      requiredMembers: Number(requiredMembers) || 1,
      startDate: startDate || new Date(),
      deadline: new Date(deadline),
      status: status || 'Planning',
      owner: req.user._id,
      members: [],
    });

    const populated = await Project.findById(project._id)
      .populate('owner', 'fullName email profilePhoto headline')
      .populate('members', 'fullName email profilePhoto skills headline');

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project: {
        ...populated.toObject(),
        progress: 0,
        totalTasks: 0,
        completedTasks: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all projects (Explore / Browse)
// @route   GET /api/projects
// @access  Private
export const getProjects = async (req, res, next) => {
  try {
    const { search, status, skill } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { requiredSkills: { $regex: search, $options: 'i' } },
      ];
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    if (skill && skill !== 'all') {
      query.requiredSkills = { $in: [new RegExp(skill, 'i')] };
    }

    const projects = await Project.find(query)
      .populate('owner', 'fullName email profilePhoto headline bio')
      .populate('members', 'fullName email profilePhoto headline skills')
      .sort({ createdAt: -1 });

    // Compute dynamic stats and user application status for each project
    const results = await Promise.all(
      projects.map(async (p) => {
        const stats = await computeProjectStats(p._id);
        const pObj = p.toObject();

        let myApplicationStatus = null;
        if (req.user && req.user.role === 'team_member') {
          const app = await Application.findOne({
            project: p._id,
            applicant: req.user._id,
          });
          myApplicationStatus = app ? app.status : null;
        }

        return {
          ...pObj,
          ...stats,
          myApplicationStatus,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: results.length,
      projects: results,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's relevant projects (Owned for PM, Accepted for Team Member)
// @route   GET /api/projects/my-projects
// @access  Private
export const getMyProjects = async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role === 'project_manager') {
      query = { owner: req.user._id };
    } else {
      // Team member: projects where they are accepted in the members array
      query = { members: req.user._id };
    }

    const projects = await Project.find(query)
      .populate('owner', 'fullName email profilePhoto headline bio')
      .populate('members', 'fullName email profilePhoto headline skills')
      .sort({ createdAt: -1 });

    const results = await Promise.all(
      projects.map(async (p) => {
        const stats = await computeProjectStats(p._id);
        return {
          ...p.toObject(),
          ...stats,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: results.length,
      projects: results,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project details
// @route   GET /api/projects/:id
// @access  Private
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'fullName email profilePhoto headline bio skills socialLinks')
      .populate('members', 'fullName email profilePhoto headline skills experience education resume');

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const stats = await computeProjectStats(project._id);
    const pObj = project.toObject();

    // If caller is the PM owner, also retrieve all applications for review
    let applications = [];
    if (req.user.role === 'project_manager' && project.owner._id.toString() === req.user._id.toString()) {
      applications = await Application.find({ project: project._id })
        .populate('applicant', 'fullName email profilePhoto headline bio skills experience education resume socialLinks')
        .sort({ appliedAt: -1 });
    }

    // If caller is a team member, check their application status
    let myApplicationStatus = null;
    if (req.user.role === 'team_member') {
      const app = await Application.findOne({
        project: project._id,
        applicant: req.user._id,
      });
      myApplicationStatus = app ? app.status : null;
    }

    res.status(200).json({
      success: true,
      project: {
        ...pObj,
        ...stats,
        applications,
        myApplicationStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Project Manager owner only)
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Verify ownership
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only edit projects you created',
      });
    }

    const {
      name,
      description,
      requiredSkills,
      requiredExperience,
      requiredMembers,
      startDate,
      deadline,
      status,
    } = req.body;

    if (name) project.name = name.trim();
    if (description) project.description = description.trim();
    if (requiredExperience !== undefined) project.requiredExperience = requiredExperience.trim();
    if (requiredMembers !== undefined) project.requiredMembers = Number(requiredMembers);
    if (startDate) project.startDate = new Date(startDate);
    if (deadline) project.deadline = new Date(deadline);
    if (status) project.status = status;

    if (requiredSkills !== undefined) {
      project.requiredSkills = Array.isArray(requiredSkills)
        ? requiredSkills
        : typeof requiredSkills === 'string'
        ? requiredSkills.split(',').map((s) => s.trim()).filter(Boolean)
        : project.requiredSkills;
    }

    // Process new files if uploaded
    if (req.files) {
      if (req.files.photo && req.files.photo[0]) {
        project.photo = `/uploads/projects/${req.files.photo[0].filename}`;
      }
      if (req.files.documents && req.files.documents.length > 0) {
        const newDocs = req.files.documents.map((f) => `/uploads/documents/${f.filename}`);
        project.documents = [...project.documents, ...newDocs];
      }
    } else if (req.body.photo) {
      project.photo = req.body.photo;
    }

    await project.save();

    const updated = await Project.findById(project._id)
      .populate('owner', 'fullName email profilePhoto headline')
      .populate('members', 'fullName email profilePhoto headline skills');

    const stats = await computeProjectStats(project._id);

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      project: {
        ...updated.toObject(),
        ...stats,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Project Manager owner only)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Verify ownership
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only delete projects you created',
      });
    }

    // Cleanup associated applications, tasks, comments
    const tasks = await Task.find({ project: project._id }).select('_id');
    const taskIds = tasks.map((t) => t._id);

    await Comment.deleteMany({ task: { $in: taskIds } });
    await Task.deleteMany({ project: project._id });
    await Application.deleteMany({ project: project._id });
    await Project.findByIdAndDelete(project._id);

    res.status(200).json({
      success: true,
      message: `Project '${project.name}' and all associated tasks and applications have been deleted`,
    });
  } catch (error) {
    next(error);
  }
};
