"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const contact_controller_1 = require("../controllers/contact.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const contactRateLimit = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: {
        success: false,
        message: 'Too many contact requests from this IP, please try again later.',
    },
});
const router = (0, express_1.Router)();
router.post('/contact', contactRateLimit, [
    (0, express_validator_1.body)('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Please provide a valid email'),
    (0, express_validator_1.body)('message').optional().isLength({ max: 1000 }).withMessage('Message must not exceed 1000 characters'),
], contact_controller_1.ContactController.createContact);
router.get('/admin/contacts', auth_middleware_1.authenticateAdmin, contact_controller_1.ContactController.getContacts);
router.put('/admin/contacts/:id/read', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.param)('id').isNumeric().withMessage('Invalid contact ID'),
], contact_controller_1.ContactController.markAsRead);
router.delete('/admin/contacts/:id', auth_middleware_1.authenticateAdmin, [
    (0, express_validator_1.param)('id').isNumeric().withMessage('Invalid contact ID'),
], contact_controller_1.ContactController.deleteContact);
exports.default = router;
