import { Router } from 'express';
import { body, param } from 'express-validator';
import { PortfolioController } from '../controllers/portfolio.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/portfolio', PortfolioController.getPortfolioData);
router.get('/profile', PortfolioController.getProfile);
router.get('/education', PortfolioController.getEducation);
router.get('/skills', PortfolioController.getSkills);
router.get('/experiences', PortfolioController.getExperiences);
router.get('/projects', PortfolioController.getProjects);
router.get('/projects/:id', PortfolioController.getProjectById);

// Private admin routes
// Profile
router.post('/admin/profile', authenticateAdmin, [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
], PortfolioController.createProfile);

router.put('/admin/profile/:id', authenticateAdmin, [
  param('id').isNumeric().withMessage('Invalid profile ID'),
], PortfolioController.updateProfile);

// Education
router.post('/admin/education', authenticateAdmin, [
  body('name').isLength({ min: 2 }).withMessage('Institution name must be at least 2 characters'),
  body('stream').isLength({ min: 2 }).withMessage('Stream must be at least 2 characters'),
  body('grade').isLength({ min: 1 }).withMessage('Grade is required'),
  body('degree').isLength({ min: 2 }).withMessage('Degree must be at least 2 characters'),
], PortfolioController.createEducation);

router.put('/admin/education/:id', authenticateAdmin, [
  param('id').isNumeric().withMessage('Invalid education ID'),
], PortfolioController.updateEducation);

router.delete('/admin/education/:id', authenticateAdmin, [
  param('id').isNumeric().withMessage('Invalid education ID'),
], PortfolioController.deleteEducation);

// Skills
router.post('/admin/skills', authenticateAdmin, [
  body('name').isLength({ min: 1 }).withMessage('Skill name is required'),
  body('proficiency').isInt({ min: 1, max: 100 }).withMessage('Proficiency must be between 1-100'),
], PortfolioController.createSkill);

router.put('/admin/skills/:id', authenticateAdmin, [
  param('id').isNumeric().withMessage('Invalid skill ID'),
], PortfolioController.updateSkill);

router.delete('/admin/skills/:id', authenticateAdmin, [
  param('id').isNumeric().withMessage('Invalid skill ID'),
], PortfolioController.deleteSkill);

// Experiences
router.post('/admin/experiences', authenticateAdmin, [
  body('organizationName'),
  body('role'),
  body('description'),
  body('startDate'),
  body('type').isIn(['organization', 'internship', 'college_event']).withMessage('Invalid experience type'),
], PortfolioController.createExperience);

router.put('/admin/experiences/:id', authenticateAdmin, [
  param('id').isNumeric().withMessage('Invalid experience ID'),
], PortfolioController.updateExperience);

router.delete('/admin/experiences/:id', authenticateAdmin, [
  param('id').isNumeric().withMessage('Invalid experience ID'),
], PortfolioController.deleteExperience);

// Projects
router.post('/admin/projects', authenticateAdmin, [
  body('name').isLength({ min: 2 }).withMessage('Project name must be at least 2 characters'),
  body('type').isIn(['personal', 'client', 'academic', 'internship']).withMessage('Invalid project type'),
  body('description').isLength({ min: 1 }).withMessage('Description must be at least 1 character'),
], PortfolioController.createProject);

router.put('/admin/projects/:id', authenticateAdmin, [
  param('id').isNumeric().withMessage('Invalid project ID'),
], PortfolioController.updateProject);

router.delete('/admin/projects/:id', authenticateAdmin, [
  param('id').isNumeric().withMessage('Invalid project ID'),
], PortfolioController.deleteProject);

export default router;