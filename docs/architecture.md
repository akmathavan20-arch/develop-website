# Architecture

## Database Schema
- users(name,email,password,role,plan,planExpiry)
- courses(title,classLevel,subject,description,facultyId)
- notes(title,courseId,type,url,createdBy)
- quizzes(title,courseId,questions[],durationMinutes)
- quiz_attempts(quizId,studentId,answers,score)

## API Routes
- POST /api/auth/register, POST /api/auth/login
- GET/POST/PUT/DELETE /api/courses
- GET/POST/DELETE /api/notes
- POST /api/quizzes, GET /api/quizzes/course/:courseId, POST /api/quizzes/:id/submit
- POST /api/ai/chat, /api/ai/quiz-generator, /api/ai/notes-generator, /api/ai/recommendations
- GET /api/admin/students, /api/admin/faculty, /api/admin/analytics
- POST /api/payments/subscribe

## Security & Scalability
- JWT role-based authorization middleware
- Input validation layer ready via express-validator
- Cloudinary/Firebase storage ready point
- Service-layer AI and payment abstraction for scaling microservices
