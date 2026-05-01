import mongoose, { Schema } from 'mongoose';

export type UserRole = 'admin' | 'faculty' | 'student';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'faculty', 'student'], default: 'student' },
  plan: { type: String, enum: ['free', '99', '299'], default: 'free' },
  planExpiry: Date
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
