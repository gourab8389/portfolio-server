"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../models/schema");
const drizzle_orm_1 = require("drizzle-orm");
const email_service_1 = require("../services/email.service");
class ContactController {
    static async createContact(req, res) {
        try {
            const contactData = req.body;
            const [newContact] = await database_1.db.insert(schema_1.contacts).values({
                ...contactData,
            }).returning();
            try {
                await email_service_1.EmailService.sendContactConfirmation(contactData.email, contactData.name);
            }
            catch (emailError) {
                console.error('Error sending confirmation email:', emailError);
            }
            try {
                await email_service_1.EmailService.sendContactNotification(contactData);
            }
            catch (emailError) {
                console.error('Error sending notification email:', emailError);
            }
            res.status(201).json({
                success: true,
                message: 'Thank you for your message! I will get back to you soon.',
                data: newContact,
            });
        }
        catch (error) {
            console.error('Create contact error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to send message. Please try again.',
            });
        }
    }
    static async getContacts(req, res) {
        try {
            const contactsList = await database_1.db.select().from(schema_1.contacts).orderBy(schema_1.contacts.createdAt);
            res.json({
                success: true,
                data: contactsList,
            });
        }
        catch (error) {
            console.error('Get contacts error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async markAsRead(req, res) {
        try {
            const { id } = req.params;
            const [updatedContact] = await database_1.db
                .update(schema_1.contacts)
                .set({ isRead: true })
                .where((0, drizzle_orm_1.eq)(schema_1.contacts.id, parseInt(id)))
                .returning();
            if (!updatedContact) {
                return res.status(404).json({
                    success: false,
                    message: 'Contact not found',
                });
            }
            res.json({
                success: true,
                message: 'Contact marked as read',
                data: updatedContact,
            });
        }
        catch (error) {
            console.error('Mark as read error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    static async deleteContact(req, res) {
        try {
            const { id } = req.params;
            const [deletedContact] = await database_1.db
                .delete(schema_1.contacts)
                .where((0, drizzle_orm_1.eq)(schema_1.contacts.id, parseInt(id)))
                .returning();
            if (!deletedContact) {
                return res.status(404).json({
                    success: false,
                    message: 'Contact not found',
                });
            }
            res.json({
                success: true,
                message: 'Contact deleted successfully',
            });
        }
        catch (error) {
            console.error('Delete contact error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
}
exports.ContactController = ContactController;
