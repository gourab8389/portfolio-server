"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const auth_service_1 = require("../services/auth.service");
class AdminController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const isValid = await auth_service_1.AuthService.validateAdmin(email, password);
            if (!isValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }
            const token = auth_service_1.AuthService.generateToken({ email, role: 'admin' });
            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    token,
                    admin: { email },
                },
            });
        }
        catch (error) {
            console.error('Admin login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async validateToken(req, res) {
        res.json({
            success: true,
            message: 'Token is valid',
            data: { admin: req.body.admin },
        });
    }
}
exports.AdminController = AdminController;
