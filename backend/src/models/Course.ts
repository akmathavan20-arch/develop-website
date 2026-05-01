import mongoose, { Schema } from 'mongoose';

const courseSchema = new Schema({
  title: String,
  classLevel: { type: String, enum: ['KG', '1','2','3','4','5','6','7','8','9','10','11','12'] },
  subject: String,
  description: String,
  facultyId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Course = mongoose.model('Course', courseSchema);
