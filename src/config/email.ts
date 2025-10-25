import nodemailer from 'nodemailer';
import { Resend } from "resend";
import * as dotenv from 'dotenv';

dotenv.config();

export const resend = new Resend(process.env.RESEND_API_KEY);


export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const emailConfig = {
  from: {
    name: process.env.FROM_NAME || 'Gourab Dey',
    address: process.env.FROM_EMAIL || '',
  },
};