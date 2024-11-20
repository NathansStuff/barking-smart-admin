import nodemailer from 'nodemailer';

import { env } from '@/constants';

import { Email } from '../types/Email';
import { EmailService } from '../types/EmailService';

const nodemailerService: EmailService = {
  sendEmail: async (email: Email): Promise<void> => {
    console.log('nodemailerService: Starting to send email');
    const { to, subject, body } = email;

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: env.GMAIL_EMAIL,
          pass: env.GMAIL_PASS,
        },
      });

      console.log('nodemailerService: Configured transporter');

      await transporter.sendMail({
        from: env.GMAIL_EMAIL,
        to,
        subject,
        html: body,
      });

      console.log('nodemailerService: Email sent successfully');
    } catch (error) {
      console.error('nodemailerService: Error sending email:', error);
      throw error;
    }
  },
};

export default nodemailerService;
