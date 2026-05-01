import { Router } from 'express';
import { Note } from '../models/Note';
import { authorize, protect } from '../middleware/auth';

export const noteRoutes = Router();
noteRoutes.get('/course/:courseId', async (req, res) => res.json(await Note.find({ courseId: req.params.courseId })));
noteRoutes.post('/', protect, authorize('admin', 'faculty'), async (req, res) => res.json(await Note.create({ ...req.body, createdBy: (req as any).user.id })));
noteRoutes.delete('/:id', protect, authorize('admin', 'faculty'), async (req, res) => res.json(await Note.findByIdAndDelete(req.params.id)));
