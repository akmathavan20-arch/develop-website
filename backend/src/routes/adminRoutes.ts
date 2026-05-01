import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import { User } from '../models/User';
import { Course } from '../models/Course';
import { Note } from '../models/Note';
import { QuizAttempt } from '../models/QuizAttempt';

export const adminRoutes = Router();
adminRoutes.use(protect, authorize('admin'));
adminRoutes.get('/students', async (_req, res) => res.json(await User.find({ role: 'student' })));
adminRoutes.get('/faculty', async (_req, res) => res.json(await User.find({ role: 'faculty' })));
adminRoutes.delete('/faculty/:id', async (req, res) => res.json(await User.findByIdAndDelete(req.params.id)));
adminRoutes.get('/analytics', async (_req, res) => {
  const [courses, notes, attempts] = await Promise.all([Course.countDocuments(), Note.countDocuments(), QuizAttempt.countDocuments()]);
  res.json({ courses, notes, attempts });
});
