import jwt from 'jsonwebtoken';
import type {Request, Response, NextFunction} from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({message: 'Akses ditolak'});

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = verified;
    next();
  } catch (err) {
    res.status(400).json({message: 'Token tidak valid'});
  }
};
