import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  //   const info = await transporter.sendMail({
  //     from: '"Node Learning App" <test@example.com>',
  //     to: "user@example.com",
  //     subject: "Test Email from Node.js",
  //     text: "Hello, this is a test email from Node.js using Nodemailer and Ethereal.",
  //     html: "<h2>Hello</h2><p>This is a test email from Node.js using Nodemailer and Ethereal.</p>",
  //   });
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    text,
    html,
  });

  return nodemailer.getTestMessageUrl(info);
};
