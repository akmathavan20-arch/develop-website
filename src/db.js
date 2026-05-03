import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./dreamlearn.db');

export function initDb() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      role TEXT CHECK(role IN ('student','faculty','admin')) NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      age_group TEXT,
      subject TEXT,
      faculty_id INTEGER,
      FOREIGN KEY (faculty_id) REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      plan_name TEXT NOT NULL,
      amount INTEGER NOT NULL,
      status TEXT CHECK(status IN ('Active','Pending','Expired')) NOT NULL,
      start_date TEXT,
      expiry_date TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      course_id INTEGER NOT NULL,
      percent INTEGER DEFAULT 0,
      completed_lessons INTEGER DEFAULT 0,
      verified_completion INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (course_id) REFERENCES courses(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER NOT NULL,
      content_type TEXT CHECK(content_type IN ('video','notes','book','live_link')) NOT NULL,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      price INTEGER DEFAULT 0,
      FOREIGN KEY (course_id) REFERENCES courses(id)
    )`);
  });
}
