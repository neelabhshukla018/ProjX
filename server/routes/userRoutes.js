import express from 'express';
import {
  getProfile,
  updateProfile,
  getUserById,
  uploadPhoto,
  uploadResume,
  deleteResume,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isTeamMember } from '../middleware/roleMiddleware.js';
import {
  uploadProfilePhoto,
  uploadResume as uploadResumeMiddleware,
} from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

router.post('/profile/photo', protect, uploadProfilePhoto, uploadPhoto);
router.post('/profile/resume', protect, isTeamMember, uploadResumeMiddleware, uploadResume);
router.delete('/profile/resume', protect, isTeamMember, deleteResume);

router.get('/:id', protect, getUserById);

export default router;
