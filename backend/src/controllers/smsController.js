import { asyncHandler } from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/sendResponse.js";
import { sendSms } from "../utils/smsService.js";

export const sendTestSms = asyncHandler(async (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    res.status(400);
    throw new Error("Mobile number is required");
  }

  const sms = await sendSms({
    to: mobile,
    message: "Hello from Node Learning App",
  });

  sendResponse(res, 200, "SMS sent successfully", {
    sid: sms.sid,
    status: sms.status,
  });
});
