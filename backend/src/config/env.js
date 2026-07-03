import "dotenv/config";

const requiredEnv = (key) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  port: process.env.PORT || 5000,
  apiPrefix: process.env.API_PREFIX || "/api/v1",
  mongoUri: requiredEnv("MONGO_URI"),

  jwt: {
    accessSecret: requiredEnv("JWT_ACCESS_SECRET"),
    refreshSecret: requiredEnv("JWT_REFRESH_SECRET"),
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  smtp: {
    host: requiredEnv("SMTP_HOST"),
    port: process.env.SMTP_PORT || 587,
    user: requiredEnv("SMTP_USER"),
    pass: requiredEnv("SMTP_PASS"),
    from: requiredEnv("SMTP_FROM"),
  },

  cloudinary: {
    cloudName: requiredEnv("CLOUDINARY_CLOUD_NAME"),
    apiKey: requiredEnv("CLOUDINARY_API_KEY"),
    apiSecret: requiredEnv("CLOUDINARY_API_SECRET"),
  },

  twilio: {
    accountSid: requiredEnv("TWILIO_ACCOUNT_SID"),
    authToken: requiredEnv("TWILIO_AUTH_TOKEN"),
    phoneNumber: requiredEnv("TWILIO_PHONE_NUMBER"),
  },
};
