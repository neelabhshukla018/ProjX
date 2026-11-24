import express from 'express';
import {
  createTask,
  getMyTasks,
  getProjectTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
import { isProjectManager } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, isProjectManager, createTask);

router.get('/my-tasks', protect, getMyTasks);
router.get('/project/:projectId', protect, getProjectTasks);

router.route('/:id')
  .get(protect, getTaskById)
  .put(protect, updateTask)
  .delete(protect, isProjectManager, deleteTask);

export default router;
