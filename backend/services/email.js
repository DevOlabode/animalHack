const { BrevoClient } = require('@getbrevo/brevo');

const brevoApiKey = process.env.BREVO_API_KEY;
const emailFrom = process.env.EMAIL_FROM;
const emailFromName = process.env.EMAIL_FROM_NAME || 'PetCare';

let brevoClient = null;

if (brevoApiKey && emailFrom) {
  brevoClient = new BrevoClient({ apiKey: brevoApiKey });
}

const isEmailConfigured = () => Boolean(brevoClient);

const sendEmail = async ({ to, subject, html, text }) => {
  if (!brevoClient) {
    console.warn('[EMAIL] BREVO_API_KEY or EMAIL_FROM not set — email not sent.');
    console.warn(`[EMAIL] Would send to ${to}: ${subject}`);
    return { id: null, skipped: true };
  }

  const result = await brevoClient.transactionalEmails.sendTransacEmail({
    subject,
    htmlContent: html,
    textContent: text,
    sender: {
      name: emailFromName,
      email: emailFrom,
    },
    to: [{ email: to }],
  });

  return result;
};

const sendPasswordResetEmail = async ({ to, name, resetUrl }) => {
  const subject = 'Reset your PetCare password';
  const greeting = name ? `Hi ${name},` : 'Hi,';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0f172a;">
      <h2 style="color: #0f766e; margin-bottom: 8px;">PetCare Platform</h2>
      <p>${greeting}</p>
      <p>We received a request to reset your password. Click the button below to choose a new one. This link expires in 1 hour.</p>
      <p style="margin: 28px 0;">
        <a href="${resetUrl}" style="background: #0f766e; color: #ffffff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Reset password
        </a>
      </p>
      <p style="color: #64748b; font-size: 14px;">
        If you did not request this, you can safely ignore this email.
      </p>
      <p style="color: #64748b; font-size: 14px; word-break: break-all;">
        Or copy this link: ${resetUrl}
      </p>
    </div>
  `;

  const text = `${greeting}

We received a request to reset your PetCare password.

Reset your password: ${resetUrl}

This link expires in 1 hour. If you did not request this, you can ignore this email.`;

  return sendEmail({ to, subject, html, text });
};

module.exports = {
  isEmailConfigured,
  sendEmail,
  sendPasswordResetEmail,
};
