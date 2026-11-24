import User from '../models/User.js';
import { generateToken, clearToken } from '../utils/generateToken.js';

// @desc    Register a new user (Project Manager or Team Member)
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { fullName, email, password, confirmPassword, role } = req.body;

    // Validate presence
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: fullName, email, password, role',
      });
    }

    // Role check
    const normalizedRole = role.toLowerCase().replace(/\s+/g, '_');
    if (!['project_manager', 'team_member'].includes(normalizedRole)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be either Project Manager or Team Member.',
      });
    }

    // Password confirmation
    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Check existing email
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    // Create user
    const user = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: normalizedRole,
    });

    // Generate JWT and set HTTP-only cookie
    const token = generateToken(res, user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: {
        _id: user._id,
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profilePhoto: user.profilePhoto,
        headline: user.headline,
        bio: user.bio,
        skills: user.skills,
        experience: user.experience,
        education: user.education,
        socialLinks: user.socialLinks,
        portfolioLinks: user.portfolioLinks,
        resume: user.resume,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate token and set HTTP-only cookie
    const token = generateToken(res, user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        _id: user._id,
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profilePhoto: user.profilePhoto,
        headline: user.headline,
        bio: user.bio,
        skills: user.skills,
        experience: user.experience,
        education: user.education,
        socialLinks: user.socialLinks,
        portfolioLinks: user.portfolioLinks,
        resume: user.resume,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Log out user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logout = async (req, res) => {
  clearToken(res);
  res.status(200).json({
    success: true,
    message: 'Signed out successfully',
  });
};

// @desc    Get current authenticated user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// @desc    Change user password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new passwords',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long',
      });
    }

    const user = await User.findById(req.user._id);

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};
