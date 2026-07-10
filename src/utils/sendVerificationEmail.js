import { sendEmail } from '../services/email.js';

export const sendVerificationEmail = async ({
  email,
  token,
}) => {
  const verifyLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  await sendEmail({
    to: email,
    subject: 'Підтвердження зміни email',
    html: `
      <h2>Підтвердження зміни email</h2>
      <p>Для підтвердження нового email перейдіть за посиланням:</p>
      <a href="${verifyLink}">
        Підтвердити email
      </a>
    `,
  });
};