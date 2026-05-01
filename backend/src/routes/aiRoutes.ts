import { Router } from 'express';
import { askAI } from '../services/aiService';
import { protect } from '../middleware/auth';

export const aiRoutes = Router();
aiRoutes.post('/chat', protect, async (req, res) => res.json({ reply: await askAI(req.body.prompt) }));
aiRoutes.post('/quiz-generator', protect, async (req, res) => res.json({ content: await askAI(`Create MCQ quiz: ${req.body.topic}`) }));
aiRoutes.post('/notes-generator', protect, async (req, res) => res.json({ content: await askAI(`Generate study notes for ${req.body.topic}`) }));
aiRoutes.post('/recommendations', protect, async (req, res) => res.json({ content: await askAI(`Give personalized suggestions: ${req.body.progress}`) }));
