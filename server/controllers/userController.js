import path from 'path';
import fs from 'fs';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Application from '../models/Application.js';

// @desc    Get logged in user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// @desc    Update logged in user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const {
      fullName,
      headline,
      bio,
      skills,
      experience,
      education,
      socialLinks,
      portfolioLinks,
    } = req.body;

    if (fullName) user.fullName = fullName.trim();
    if (headline !== undefined) user.headline = headline.trim();
    if (bio !== undefined) user.bio = bio.trim();
    if (experience !== undefined) user.experience = experience.trim();
    if (education !== undefined) user.education = education.trim();

    if (skills !== undefined) {
      user.skills = Array.isArray(skills)
        ? skills.map((s) => s.trim()).filter(Boolean)
        : typeof skills === 'string'
        ? skills.split(',').map((s) => s.trim()).filter(Boolean)
        : user.skills;
    }

    if (socialLinks) {
      user.socialLinks = {
        instagram: socialLinks.instagram !== undefined ? socialLinks.instagram.trim() : user.socialLinks?.instagram || '',
        github: socialLinks.github !== undefined ? socialLinks.github.trim() : user.socialLinks?.github || '',
        linkedin: socialLinks.linkedin !== undefined ? socialLinks.linkedin.trim() : user.socialLinks?.linkedin || '',
      };
    }

    if (portfolioLinks !== undefined) {
      user.portfolioLinks = Array.isArray(portfolioLinks)
        ? portfolioLinks.map((p) => p.trim()).filter(Boolean)
        : typeof portfolioLinks === 'string'
        ? portfolioLinks.split(',').map((p) => p.trim()).filter(Boolean)
        : user.portfolioLinks;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile by ID (with authorization rules)
// @route   GET /api/users/:id
// @access  Private
export const getUserById = async (req, res, next) => {
  try {
    const targetId = req.params.id;
    const caller = req.user;

    const targetUser = await User.findById(targetId);
    if (!targetUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check permissions:
    // 1. Caller is targetUser
    const isSelf = caller._id.toString() === targetId;

    // 2. If caller is PM, check if targetUser applied to or is a member of any project owned by caller
    let isAuthorizedPM = false;
    if (caller.role === 'project_manager') {
      const ownedProjects = await Project.find({ owner: caller._id }).select('_id');
      const projectIds = ownedProjects.map((p) => p._id);

      const hasApplication = await Application.exists({
        project: { $in: projectIds },
        applicant: targetId,
      });

      const isMember = await Project.exists({
        _id: { $in: projectIds },
        members: targetId,
      });

      isAuthorizedPM = Boolean(hasApplication || isMember);
    }

    // 3. If caller is Team Member, check if targetUser is PM of a project they applied to / joined,
    // or if they share an accepted project membership
    let isSharedProject = false;
    if (caller.role === 'team_member') {
      // Is targetUser a PM of a project caller belongs to or applied to?
      const targetIsPM = await Project.exists({
        owner: targetId,
        $or: [
          { members: caller._id },
          { _id: { $in: await Application.find({ applicant: caller._id }).distinct('project') } },
        ],
      });

      // Or do they share an accepted project membership?
      const shareProject = await Project.exists({
        members: { $all: [caller._id, targetId] },
      });

      isSharedProject = Boolean(targetIsPM || shareProject);
    }

    // Allow viewing general public professional info for collaboration
    // But hide resume unless authorized
    const canAccessResume = isSelf || isAuthorizedPM;

    const userObj = targetUser.toJSON();
    if (!canAccessResume) {
      delete userObj.resume;
    }

    res.status(200).json({
      success: true,
      user: userObj,
      canAccessResume,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload user profile photo
// @route   POST /api/users/profile/photo
// @access  Private
export const uploadPhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select an image file to upload' });
    }

    const user = await User.findById(req.user._id);
    const photoUrl = `/uploads/profiles/${req.file.filename}`;
    user.profilePhoto = photoUrl;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile photo updated successfully',
      profilePhoto: photoUrl,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload team member resume (PDF)
// @route   POST /api/users/profile/resume
// @access  Private (Team Member only)
export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select a PDF resume file to upload' });
    }

    const user = await User.findById(req.user._id);
    const resumeUrl = `/uploads/resumes/${req.file.filename}`;
    user.resume = resumeUrl;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Resume uploaded successfully',
      resume: resumeUrl,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete team member resume
// @route   DELETE /api/users/profile/resume
// @access  Private (Team Member only)
export const deleteResume = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.resume) {
      // Remove file from disk if exists
      const filePath = path.join(process.cwd(), user.resume);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.warn('Failed to delete resume file from disk:', err.message);
        }
      }
      user.resume = '';
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};
