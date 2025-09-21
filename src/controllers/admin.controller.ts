import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AdminLoginRequest } from '../types';

export class AdminController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password }: AdminLoginRequest = req.body;

      const isValid = await AuthService.validateAdmin(email, password);

      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      const token = AuthService.generateToken({ email, role: 'admin' });

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          admin: { email },
        },
      });
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async validateToken(req: Request, res: Response) {
    res.json({
      success: true,
      message: 'Token is valid',
      data: { admin: req.body.admin },
    });
  }
}