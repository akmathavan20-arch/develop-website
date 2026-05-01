import { Router } from 'express';
import { Quiz } from '../models/Quiz';
import { QuizAttempt } from '../models/QuizAttempt';
import { authorize, protect } from '../middleware/auth';

export const quizRoutes = Router();
quizRoutes.post('/', protect, authorize('faculty', 'admin'), async (req, res) => res.json(await Quiz.create(req.body)));
quizRoutes.get('/course/:courseId', protect, async (req, res) => res.json(await Quiz.find({ courseId: req.params.courseId })));
quizRoutes.post('/:id/submit', protect, authorize('student'), async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  const answers = req.body.answers as number[];
  const score = quiz.questions.reduce((acc: number, q: any, i: number) => acc + (q.answer === answers[i] ? 1 : 0), 0);
  const attempt = await QuizAttempt.create({ quizId: quiz.id, studentId: (req as any).user.id, answers, score });
  res.json(attempt);
});
