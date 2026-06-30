import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmail } from "../utils/emailService.js";
import { sendResponse } from "../utils/sendResponse.js";

export const sendTestEmailController = asyncHandler(async (req, res) => {
  const previewUrl = await sendEmail({
    to: "user@example.com",
    subject: "Test Email from Node.js",
    text: "Hello, this is a test email from Node.js using Nodemailer and Ethereal.",
    html: "<h2>Hello</h2><p>This is a test email from Node.js using Nodemailer and Ethereal.</p>",
  });

  sendResponse(res, 200, "Test email sent successfully", {
    previewUrl,
  });
});
