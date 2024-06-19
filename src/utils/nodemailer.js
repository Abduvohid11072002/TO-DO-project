import nodemailer from "nodemailer";
import configuration from "../config/configuration.js";

const { NODEMAILER_PORT, NODEMAILER_EMAIL, NODEMAILER_PASS } =
  configuration.nodemailer;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: NODEMAILER_PORT,
  secure: NODEMAILER_PORT === 465, // true bo'lsa 465, false bo'lsa 587
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
  connectionTimeout: 2 * 60 * 1000, // 2 minutes
  greetingTimeout: 2 * 60 * 1000, // 2 minutes
  socketTimeout: 2 * 60 * 1000, // 2 minutes
});

export async function sendEmail(email, otp) {
  try {
    const info = await transporter.sendMail({
      from: NODEMAILER_EMAIL,
      to: email,
      subject: "Verification",
      text: "",
      html: `<h1>Your One Time Password <br> ${otp}</h1>`,
    });
    return true;
  } catch (error) {
    console.error(error); 
    return false;
  }
};


