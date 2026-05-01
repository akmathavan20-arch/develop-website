import mongoose, { Schema } from 'mongoose';

const quizAttemptSchema = new Schema({
  quizId: { type: Schema.Types.ObjectId, ref: 'Quiz' },
  studentId: { type: Schema.Types.ObjectId, ref: 'User' },
  answers: [Number],
  score: Number
}, { timestamps: true });

export const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);
