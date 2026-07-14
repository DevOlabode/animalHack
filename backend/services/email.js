const { BrevoClient } = require('@getbrevo/brevo');

const brevoApiKey = process.env.BREVO_API_KEY;
const emailFrom = process.env.EMAIL_FROM;
const emailFromName = process.env.EMAIL_FROM_NAME || 'Vethra';

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
  const subject = 'Reset your Vethra password';
  const greeting = name ? `Hi ${name},` : 'Hi,';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0f172a;">
      <h2 style="color: #0f766e; margin-bottom: 8px;">Vethra</h2>
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

We received a request to reset your Vethra password.

Reset your password: ${resetUrl}

This link expires in 1 hour. If you did not request this, you can ignore this email.`;

  return sendEmail({ to, subject, html, text });
};

const emailWrapper = (subject, body) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0f172a;">
      <h2 style="color: #0f766e;">Vethra</h2>
      ${body}
    </div>`;
  const text = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return { subject, html, text };
};

const sendAppointmentBookedEmail = async ({ to, ownerName, petName, clinicName, date, time }) => {
  const { subject, html, text } = emailWrapper(
    'Appointment request submitted',
    `<p>Hi ${ownerName},</p>
     <p>Your appointment request for <strong>${petName}</strong> at <strong>${clinicName}</strong> has been submitted.</p>
     <p><strong>Date:</strong> ${date}<br/><strong>Time:</strong> ${time}</p>
     <p>You'll receive another email once the clinic confirms.</p>`
  );
  return sendEmail({ to, subject, html, text });
};

const sendAppointmentConfirmedEmail = async ({ to, ownerName, petName, clinicName, date, time }) => {
  const { subject, html, text } = emailWrapper(
    'Appointment confirmed',
    `<p>Hi ${ownerName},</p>
     <p>Your appointment for <strong>${petName}</strong> at <strong>${clinicName}</strong> has been confirmed.</p>
     <p><strong>Date:</strong> ${date}<br/><strong>Time:</strong> ${time}</p>`
  );
  return sendEmail({ to, subject, html, text });
};

const sendAppointmentCancelledEmail = async ({ to, ownerName, petName, clinicName, date, time }) => {
  const { subject, html, text } = emailWrapper(
    'Appointment cancelled',
    `<p>Hi ${ownerName},</p>
     <p>Your appointment for <strong>${petName}</strong> at <strong>${clinicName}</strong> on ${date} at ${time} has been cancelled.</p>`
  );
  return sendEmail({ to, subject, html, text });
};

const sendReminderEmail = async ({ to, ownerName, petName, title, message, dueDate }) => {
  const { subject, html, text } = emailWrapper(
    `Reminder: ${title}`,
    `<p>Hi ${ownerName},</p>
     <p>Reminder for <strong>${petName}</strong>: ${title}</p>
     <p>${message || ''}</p>
     <p><strong>Due:</strong> ${new Date(dueDate).toLocaleString()}</p>`
  );
  return sendEmail({ to, subject, html, text });
};

const sendMedicationReminderEmail = async (params) => sendReminderEmail(params);

module.exports = {
  isEmailConfigured,
  sendEmail,
  sendPasswordResetEmail,
  sendAppointmentBookedEmail,
  sendAppointmentConfirmedEmail,
  sendAppointmentCancelledEmail,
  sendReminderEmail,
  sendMedicationReminderEmail,
};
