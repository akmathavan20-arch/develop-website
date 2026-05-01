import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({
  question: String,
  options: [String],
  answer: Number
});

const quizSchema = new Schema({
  title: String,
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  questions: [questionSchema],
  durationMinutes: Number
}, { timestamps: true });

export const Quiz = mongoose.model('Quiz', quizSchema);
