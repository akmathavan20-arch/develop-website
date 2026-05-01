import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
  (req as any).user = decoded;
  next();
};

export const authorize = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!roles.includes((req as any).user.role)) return res.status(403).json({ message: 'Forbidden' });
  next();
};
