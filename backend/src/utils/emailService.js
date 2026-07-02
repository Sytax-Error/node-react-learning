import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: false,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass,
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
    from: env.smtp.from,
    to,
    subject,
    text,
    html,
  });

  return nodemailer.getTestMessageUrl(info);
};
