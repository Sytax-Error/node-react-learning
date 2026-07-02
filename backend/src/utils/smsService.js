import twilio from "twilio";
import { env } from "../config/env.js";

const client = twilio(env.twilio.accountSid, env.twilio.authToken);

export const sendSms = async ({ to, message }) => {
  //sends SMS using Twilio.
  const sms = await client.messages.create({
    body: message,
    from: env.twilio.phoneNumber,
    to,
  });

  return sms;
};
