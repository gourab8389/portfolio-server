import { Router } from 'express';
import { body, param } from 'express-validator';
import { ContactController } from '../controllers/contact.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';
import rateLimit from 'express-rate-limit';

const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: 'Too many contact requests from this IP, please try again later.',
  },
});

const router = Router();

// Public route with rate limiting
router.post('/contact', contactRateLimit, [
  body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('message').optional().isLength({ max: 1000 }).withMessage('Message must not exceed 1000 characters'),
], ContactController.createContact);

// Private admin routes
router.get('/admin/contacts', authenticateAdmin, ContactController.getContacts);

router.put('/admin/contacts/:id/read', authenticateAdmin, [
  param('id').isNumeric().withMessage('Invalid contact ID'),
], ContactController.markAsRead);

router.delete('/admin/contacts/:id', authenticateAdmin, [
  param('id').isNumeric().withMessage('Invalid contact ID'),
], ContactController.deleteContact);

export default router;