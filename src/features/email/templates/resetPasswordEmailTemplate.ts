import { TOKEN_EXPIRY_TIME } from '@/constants';

import { EmailTemplate } from '../types/EmailTemplate';

const expiryTimeInHours = TOKEN_EXPIRY_TIME / 3600000;
const subject = 'Reset Your Password';

const emailBody = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding: 20px 0;
        }
        .header img {
          width: 100px;
        }
        .content {
          padding: 20px;
          text-align: center;
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          color: #ffffff;
          background-color: #007bff;
          border-radius: 5px;
          text-decoration: none;
          margin-top: 20px;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 12px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Password Reset Request</h2>
        </div>
        <div class="content">
          <p>Hi {{firstName}},</p>
          <p>You recently requested to reset your password for your account. Click the button below to reset it:</p>
          <a href="{{resetPasswordLink}}" class="btn">Reset Your Password</a>
          <p>If you did not request a password reset, please ignore this email or reply to let us know.</p>
          <p>This password reset link is only valid for the next ${expiryTimeInHours} hour${expiryTimeInHours > 1 ? 's' : ''}.</p>
        </div>
        <div class="footer">
          <p>Thanks,<br>The Team</p>
        </div>
      </div>
    </body>
  </html>
  `;

export const resetPasswordEmail: EmailTemplate = {
  id: 'reset-password',
  name: 'Reset Password',
  subject,
  body: emailBody,
  variables: ['firstName', 'resetPasswordLink']
};

export function resetPasswordEmailTemplate(
  firstName: string,
  resetPasswordLink: string
): { body: string; subject: string } {
  const body = emailBody.replace('{{firstName}}', firstName).replace('{{resetPasswordLink}}', resetPasswordLink);
  return { body, subject };
}
