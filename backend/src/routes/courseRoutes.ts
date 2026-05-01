import { Router } from 'express';
import { Course } from '../models/Course';
import { authorize, protect } from '../middleware/auth';

export const courseRoutes = Router();
courseRoutes.get('/', async (_req, res) => res.json(await Course.find()));
courseRoutes.post('/', protect, authorize('admin'), async (req, res) => res.json(await Course.create(req.body)));
courseRoutes.put('/:id', protect, authorize('admin'), async (req, res) => res.json(await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })));
courseRoutes.delete('/:id', protect, authorize('admin'), async (req, res) => res.json(await Course.findByIdAndDelete(req.params.id)));
