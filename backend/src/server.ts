import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';
import { authRoutes } from './routes/authRoutes';
import { courseRoutes } from './routes/courseRoutes';
import { noteRoutes } from './routes/noteRoutes';
import { quizRoutes } from './routes/quizRoutes';
import { aiRoutes } from './routes/aiRoutes';
import { adminRoutes } from './routes/adminRoutes';
import { paymentRoutes } from './routes/paymentRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);
app.use(errorHandler);

const port = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(port, () => console.log(`Backend running on ${port}`));
});
