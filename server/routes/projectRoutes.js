import express from 'express';
import {
  createProject,
  getProjects,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isProjectManager } from '../middleware/roleMiddleware.js';
import { uploadProjectFiles } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getProjects)
  .post(protect, isProjectManager, uploadProjectFiles, createProject);

router.get('/my-projects', protect, getMyProjects);

router.route('/:id')
  .get(protect, getProjectById)
  .put(protect, isProjectManager, uploadProjectFiles, updateProject)
  .delete(protect, isProjectManager, deleteProject);

export default router;
