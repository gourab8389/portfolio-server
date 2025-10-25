// import { transporter, emailConfig } from '../config/email';

// export class EmailService {
//   static async sendContactConfirmation(to: string, name: string): Promise<void> {
//     const mailOptions = {
//       from: emailConfig.from,
//       to,
//       subject: 'Thank you for contacting me!',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #333; text-align: center;">Thank You for Reaching Out!</h2>
//           <p>Hi ${name},</p>
//           <p>Thank you for contacting me through my portfolio website. I appreciate you taking the time to reach out.</p>
//           <p>I have received your message and will get back to you as soon as possible, usually within 24-48 hours.</p>
//           <p>In the meantime, feel free to explore my portfolio and check out my recent projects.</p>
//           <br>
//           <p>Best regards,</p>
//           <p><strong>${emailConfig.from.name}</strong></p>
//           <hr style="border: 1px solid #eee; margin: 20px 0;">
//           <p style="color: #666; font-size: 12px; text-align: center;">
//             This is an automated message. Please do not reply to this email.
//           </p>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//   }

//   static async sendContactNotification(contact: { name: string; email: string; message?: string }): Promise<void> {
//     const mailOptions = {
//       from: emailConfig.from,
//       to: process.env.FROM_EMAIL,
//       subject: `New Contact Form Submission from ${contact.name}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #333;">New Contact Form Submission</h2>
//           <p><strong>Name:</strong> ${contact.name}</p>
//           <p><strong>Email:</strong> ${contact.email}</p>
//           <p><strong>Message:</strong></p>
//           <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
//             ${contact.message || 'No message provided'}
//           </div>
//           <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//   }
// }




import { resend, emailConfig } from "../config/email";

export class EmailService {
  // 1️⃣ Confirmation email to user
  static async sendContactConfirmation(
    to: string,
    name: string
  ): Promise<void> {
    try {
      await resend.emails.send({
        from: `${emailConfig.from.name} <onboarding@resend.dev>`,
        to,
        replyTo: "deyg6988@gmail.com",
        subject: "Thank you for contacting me!",
        html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; text-align: center;">Thank You for Reaching Out!</h2>
      <p>Hi ${name},</p>
      <p>Thank you for contacting me through my portfolio website. I appreciate you taking the time to reach out.</p>
      <p>I have received your message and will get back to you as soon as possible, usually within 24–48 hours.</p>
      <p>In the meantime, feel free to explore my portfolio and check out my recent projects.</p>
      <br>
      <p>Best regards,</p>
      <p><strong>${emailConfig.from.name}</strong></p>
      <hr style="border: 1px solid #eee; margin: 20px 0;">
      <p style="color: #666; font-size: 12px; text-align: center;">
        This is an automated message. Please do not reply to this email.
      </p>
    </div>
  `,
        text: `Hi ${name},\n\nThank you for contacting me through my portfolio website. I’ll get back to you soon!\n\n– ${emailConfig.from.name}`,
      });
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      throw error;
    }
  }

  // 2️⃣ Notification email to admin
  static async sendContactNotification(contact: {
    name: string;
    email: string;
    message?: string;
  }): Promise<void> {
    try {
      await resend.emails.send({
        from: `${emailConfig.from.name} <onboarding@resend.dev>`,
        to: process.env.FROM_EMAIL || "deyg6988@gmail.com", // admin email
        subject: `New Contact Form Submission from ${contact.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
              ${contact.message || "No message provided"}
            </div>
            <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("Error sending notification email:", error);
      throw error;
    }
  }
}
