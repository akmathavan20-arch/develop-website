import mongoose, { Schema } from 'mongoose';

const noteSchema = new Schema({
  title: String,
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  type: { type: String, enum: ['pdf', 'video'] },
  url: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Note = mongoose.model('Note', noteSchema);
