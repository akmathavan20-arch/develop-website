# Dreamlearn Education Pvt Ltd – Learn Towards Success

Production-ready full-stack AI-powered LMS starter with role-based access for Admin, Faculty, and Students.

## Stack
- Frontend: Next.js 14 + TypeScript + Tailwind + Recharts
- Backend: Node.js + Express + TypeScript + MongoDB (Mongoose)
- Auth: JWT + bcrypt
- Payments: Razorpay/Stripe abstraction
- AI: OpenAI API for chatbot, quiz/notes/question generation, and recommendations

## Run
### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

## Modules
- Authentication with role redirect
- Admin dashboard (courses, notes, faculty, students, payments, analytics)
- Faculty panel (notes, quizzes, AI generation)
- Student dashboard (courses, notes, timed quizzes, progress, AI doubts)
- Subscription and expiry tracking
- Secure middleware, validation, file uploads

