import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

interface AuthenticatedRequest extends Request {
  admin?: any;
}

export const authenticateAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      });
    }

    const decoded = AuthService.verifyToken(token);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token.',
    });
  }
};