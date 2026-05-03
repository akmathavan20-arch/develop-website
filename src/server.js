import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db, initDb } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dreamlearn-secret';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

initDb();

function auth(requiredRoles = []) {
  return (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const user = jwt.verify(token, JWT_SECRET);
      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      req.user = user;
      next();
    } catch {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
}

app.post('/api/register', async (req, res) => {
  const { name, email, phone, role, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  db.run(
    'INSERT INTO users(name,email,phone,role,password_hash) VALUES(?,?,?,?,?)',
    [name, email, phone, role, passwordHash],
    function (err) {
      if (err) return res.status(400).json({ error: 'Email already exists' });
      res.json({ message: 'Registered successfully', userId: this.lastID });
    }
  );
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email=?', [email], async (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, role: user.role, name: user.name });
  });
});

app.get('/api/dashboard/student', auth(['student']), (req, res) => {
  const q = `SELECT p.status, p.expiry_date, pr.percent, pr.completed_lessons, c.title
             FROM progress pr
             JOIN courses c ON c.id=pr.course_id
             LEFT JOIN payments p ON p.user_id=pr.user_id
             WHERE pr.user_id=?`;
  db.all(q, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed loading dashboard' });
    res.json(rows);
  });
});

app.get('/api/dashboard/admin/users', auth(['admin']), (_req, res) => {
  db.all('SELECT id,name,email,phone,role,created_at FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed loading users' });
    res.json(rows);
  });
});

app.post('/api/ai/chat', auth(['student', 'faculty', 'admin']), (req, res) => {
  const { prompt } = req.body;
  res.json({ answer: `AI tutor reply for: ${prompt}` });
});

app.post('/api/ai/story', auth(['student', 'faculty', 'admin']), (req, res) => {
  const { topic, level } = req.body;
  res.json({ story: `Once upon a time in ${topic}, a ${level} learner became a hero through practice.` });
});

app.post('/api/ai/quiz', auth(['student', 'faculty', 'admin']), (req, res) => {
  const { subject } = req.body;
  res.json({
    subject,
    questions: [
      { question: `What is a basic concept in ${subject}?`, options: ['A', 'B', 'C', 'D'], answer: 'A' }
    ]
  });
});

app.get('/api/curriculum', (_req, res) => {
  res.json({
    nursery: ['alphabets', 'numbers', 'colors', 'shapes'],
    junior_kg: ['phonics', 'counting', 'drawing', 'stories'],
    senior_kg: ['reading', 'writing', 'math', 'science'],
    grade1: ['english', 'maths', 'evs', 'gk'],
    grade2: ['grammar', 'arithmetic', 'science', 'hindi'],
    grade3: ['comprehension', 'fractions', 'biology', 'history'],
    grade4: ['algebra', 'geography', 'physics', 'civics'],
    grade5: ['adv_maths', 'chemistry', 'computer', 'social_science']
  });
});

app.listen(PORT, () => console.log(`Dream Learn server running on ${PORT}`));
