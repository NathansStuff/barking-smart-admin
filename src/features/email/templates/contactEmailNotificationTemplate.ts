import { PROJECT_NAME } from '@/constants';
import { ContactEmailRequest } from '@/features/contactForm/types/ContactEmailRequest';

import { EmailTemplate } from '../types/EmailTemplate';

const subject = 'New Contact Message';

const emailBody = `
  <html>
    <head>
      <style>
        // ... existing styles ...
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Message</h2>
        </div>
        <div class="content">
          <p><strong>Project:</strong> {{project}}</p>
          <p><strong>Name:</strong> {{name}}</p>
          <p><strong>Email:</strong> {{email}}</p>
          <p><strong>Subject:</strong> {{subject}}</p>
          <p><strong>Message:</strong></p>
          <p>{{message}}</p>
        </div>
        <div class="footer">
          <p>Received from your project's contact form</p>
        </div>
      </div>
    </body>
  </html>
`;

export const contactEmailNotification: EmailTemplate = {
  id: 'contact-email-notification',
  name: 'Contact Email Notification',
  subject,
  body: emailBody,
  variables: ['project', 'name', 'email', 'subject', 'message'],
};

export function contactEmailNotificationTemplate(request: ContactEmailRequest): {
  body: string;
  subject: string;
} {
  const { name, email, message, subject: messageSubject } = request;
  const project = PROJECT_NAME ?? 'Your Project';

  const body = emailBody
    .replace('{{project}}', project)
    .replace('{{name}}', name)
    .replace('{{email}}', email)
    .replace('{{subject}}', messageSubject)
    .replace('{{message}}', message);

  return { body, subject: `New Contact Message from ${project}` };
}
