import { Router } from 'express';
import { protect } from '../middleware/auth';
import { User } from '../models/User';

export const paymentRoutes = Router();
paymentRoutes.post('/subscribe', protect, async (req, res) => {
  const days = req.body.plan === '299' ? 90 : req.body.plan === '99' ? 30 : 7;
  const planExpiry = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  const user = await User.findByIdAndUpdate((req as any).user.id, { plan: req.body.plan, planExpiry }, { new: true });
  res.json({ status: 'paid', user });
});
