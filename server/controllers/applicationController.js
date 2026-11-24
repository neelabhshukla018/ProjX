import Application from '../models/Application.js';
import Project from '../models/Project.js';

// @desc    Apply / Express Interest in a project
// @route   POST /api/applications
// @access  Private (Team Member only)
export const applyToProject = async (req, res, next) => {
  try {
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({ success: false, message: 'Project ID is required' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check if already an accepted member
    if (project.members.some((m) => m.toString() === req.user._id.toString())) {
      return res.status(400).json({
        success: false,
        message: 'You are already an accepted member of this project',
      });
    }

    // Check for existing application
    const existingApplication = await Application.findOne({
      project: projectId,
      applicant: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: `You have already applied to this project (Status: ${existingApplication.status})`,
        application: existingApplication,
      });
    }

    const application = await Application.create({
      project: projectId,
      applicant: req.user._id,
      status: 'Pending',
    });

    const populated = await Application.findById(application._id)
      .populate('project', 'name description status deadline photo owner')
      .populate('applicant', 'fullName email profilePhoto headline skills experience resume');

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully. Waiting for Project Manager review.',
      application: populated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get team member's own applications
// @route   GET /api/applications/my-applications
// @access  Private (Team Member only)
export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate({
        path: 'project',
        select: 'name description status deadline photo owner requiredSkills',
        populate: {
          path: 'owner',
          select: 'fullName email profilePhoto headline',
        },
      })
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get applications for a project
// @route   GET /api/applications/project/:projectId
// @access  Private (Project Manager owner only)
export const getProjectApplications = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Verify ownership
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only view applications for projects you manage',
      });
    }

    const applications = await Application.find({ project: project._id })
      .populate('applicant', 'fullName email profilePhoto headline bio skills experience education resume socialLinks')
      .sort({ appliedAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status (Accept / Reject)
// @route   PUT /api/applications/:id/status
// @access  Private (Project Manager owner only)
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'Accepted' or 'Rejected'",
      });
    }

    const application = await Application.findById(req.params.id).populate('project');
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Verify caller owns the project
    if (application.project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only review applications for projects you manage',
      });
    }

    application.status = status;
    await application.save();

    // If accepted, add applicant to project's accepted members
    if (status === 'Accepted') {
      await Project.findByIdAndUpdate(application.project._id, {
        $addToSet: { members: application.applicant },
      });
    } else if (status === 'Rejected') {
      // If previously accepted and now rejected, remove from members
      await Project.findByIdAndUpdate(application.project._id, {
        $pull: { members: application.applicant },
      });
    }

    const updated = await Application.findById(application._id)
      .populate('project', 'name status members')
      .populate('applicant', 'fullName email profilePhoto headline skills experience resume');

    res.status(200).json({
      success: true,
      message: `Application ${status.toLowerCase()} successfully`,
      application: updated,
    });
  } catch (error) {
    next(error);
  }
};
