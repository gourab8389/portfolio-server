import { Request, Response } from 'express';
import { db } from '../config/database';
import { contacts } from '../models/schema';
import { eq } from 'drizzle-orm';
import { EmailService } from '../services/email.service';
import { ContactRequest } from '../types';

export class ContactController {
  static async createContact(req: Request, res: Response) {
    try {
      const contactData: ContactRequest = req.body;
      
      // Insert contact into database
      const [newContact] = await db.insert(contacts).values({
        ...contactData,
      }).returning();

      // Send confirmation email to user
      try {
        await EmailService.sendContactConfirmation(contactData.email, contactData.name);
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
      }

      // Send notification email to admin
      try {
        await EmailService.sendContactNotification(contactData);
      } catch (emailError) {
        console.error('Error sending notification email:', emailError);
      }

      res.status(201).json({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.',
        data: newContact,
      });
    } catch (error) {
      console.error('Create contact error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again.',
      });
    }
  }

  static async getContacts(req: Request, res: Response) {
    try {
      const contactsList = await db.select().from(contacts).orderBy(contacts.createdAt);

      res.json({
        success: true,
        data: contactsList,
      });
    } catch (error) {
      console.error('Get contacts error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async markAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const [updatedContact] = await db
        .update(contacts)
        .set({ isRead: true })
        .where(eq(contacts.id, parseInt(id)))
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
    } catch (error) {
      console.error('Mark as read error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async deleteContact(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const [deletedContact] = await db
        .delete(contacts)
        .where(eq(contacts.id, parseInt(id)))
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
    } catch (error) {
      console.error('Delete contact error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}