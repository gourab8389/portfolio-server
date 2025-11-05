"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const portfolio_controller_1 = require("../controllers/portfolio.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/portfolio', portfolio_controller_1.PortfolioController.getPortfolioData);
router.get('/profile', portfolio_controller_1.PortfolioController.getProfile);
router.get('/education', portfolio_controller_1.PortfolioController.getEducation);
router.get('/skills', portfolio_controller_1.PortfolioController.getSkills);
router.get('/experiences', portfolio_controller_1.PortfolioController.getExperiences);
router.get('/projects', portfolio_controller_1.PortfolioController.getProjects);
router.get('/projects/:id', portfolio_controller_1.PortfolioController.getProjectById);
router.post('/admin/profile', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.body)('email').isEmail().withMessage('Please provide a valid email'),
    (0, express_validator_1.body)('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
], portfolio_controller_1.PortfolioController.createProfile);
router.put('/admin/profile/:id', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.param)('id').isNumeric().withMessage('Invalid profile ID'),
], portfolio_controller_1.PortfolioController.updateProfile);
router.post('/admin/education', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.body)('name').isLength({ min: 2 }).withMessage('Institution name must be at least 2 characters'),
    (0, express_validator_1.body)('stream').isLength({ min: 2 }).withMessage('Stream must be at least 2 characters'),
    (0, express_validator_1.body)('grade').isLength({ min: 1 }).withMessage('Grade is required'),
    (0, express_validator_1.body)('degree').isLength({ min: 2 }).withMessage('Degree must be at least 2 characters'),
], portfolio_controller_1.PortfolioController.createEducation);
router.put('/admin/education/:id', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.param)('id').isNumeric().withMessage('Invalid education ID'),
], portfolio_controller_1.PortfolioController.updateEducation);
router.delete('/admin/education/:id', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.param)('id').isNumeric().withMessage('Invalid education ID'),
], portfolio_controller_1.PortfolioController.deleteEducation);
router.post('/admin/skills', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.body)('name').isLength({ min: 1 }).withMessage('Skill name is required'),
    (0, express_validator_1.body)('proficiency').isInt({ min: 1, max: 100 }).withMessage('Proficiency must be between 1-100'),
], portfolio_controller_1.PortfolioController.createSkill);
router.put('/admin/skills/:id', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.param)('id').isNumeric().withMessage('Invalid skill ID'),
], portfolio_controller_1.PortfolioController.updateSkill);
router.delete('/admin/skills/:id', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.param)('id').isNumeric().withMessage('Invalid skill ID'),
], portfolio_controller_1.PortfolioController.deleteSkill);
router.post('/admin/experiences', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.body)('organizationName'),
    (0, express_validator_1.body)('role'),
    (0, express_validator_1.body)('description'),
    (0, express_validator_1.body)('startDate'),
    (0, express_validator_1.body)('type').isIn(['organization', 'internship', 'college_event']).withMessage('Invalid experience type'),
], portfolio_controller_1.PortfolioController.createExperience);
router.put('/admin/experiences/:id', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.param)('id').isNumeric().withMessage('Invalid experience ID'),
], portfolio_controller_1.PortfolioController.updateExperience);
router.delete('/admin/experiences/:id', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.param)('id').isNumeric().withMessage('Invalid experience ID'),
], portfolio_controller_1.PortfolioController.deleteExperience);
router.post('/admin/projects', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.body)('name').isLength({ min: 2 }).withMessage('Project name must be at least 2 characters'),
    (0, express_validator_1.body)('type').isIn(['personal', 'client', 'academic', 'internship']).withMessage('Invalid project type'),
    (0, express_validator_1.body)('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    (0, express_validator_1.body)('githubLinks').isArray().withMessage('Github links must be an array'),
    (0, express_validator_1.body)('projectLinks').isArray().withMessage('Project links must be an array'),
], portfolio_controller_1.PortfolioController.createProject);
router.put('/admin/projects/:id', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.param)('id').isNumeric().withMessage('Invalid project ID'),
], portfolio_controller_1.PortfolioController.updateProject);
router.delete('/admin/projects/:id', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.param)('id').isNumeric().withMessage('Invalid project ID'),
], portfolio_controller_1.PortfolioController.deleteProject);
exports.default = router;
