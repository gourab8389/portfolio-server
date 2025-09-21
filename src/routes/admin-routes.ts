import { Router } from 'express';
import { body } from 'express-validator';
import { AdminController } from '../controllers/admin.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

// Admin login
router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], AdminController.login);

// Validate token
router.get('/validate', authenticateAdmin, AdminController.validateToken);

export default router;