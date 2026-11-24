import express from 'express';
import {
  addComment,
  getTaskComments,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addComment);
router.get('/task/:taskId', protect, getTaskComments);

router.route('/:id')
  .put(protect, updateComment)
  .delete(protect, deleteComment);

export default router;
