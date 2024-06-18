import nodemailer from "nodemailer";
import configuration from "../config/configuration.js";

const { NODEMAILER_PORT, NODEMAILER_EMAIL, NODEMAILER_PASS } =
  configuration.nodemailer;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: NODEMAILER_PORT,
  secure: NODEMAILER_PORT === 465,
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASS,
  },
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
    console.log(error);

    return false;
  }
};
