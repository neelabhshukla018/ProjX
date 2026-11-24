import express from 'express';
import {
  applyToProject,
  getMyApplications,
  getProjectApplications,
  updateApplicationStatus,
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isTeamMember, isProjectManager } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', protect, isTeamMember, applyToProject);
router.get('/my-applications', protect, isTeamMember, getMyApplications);
router.get('/project/:projectId', protect, isProjectManager, getProjectApplications);
router.put('/:id/status', protect, isProjectManager, updateApplicationStatus);

export default router;
