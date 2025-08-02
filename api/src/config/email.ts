import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const emailConfig = {
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
};

// creating transporter with email config
export const transporter = nodemailer.createTransport(emailConfig);

// configuring handlebars options
const handlebarsOptions = {
  viewEngine: {
    extname: ".hbs",
    partialsDir: path.resolve(__dirname, "../modules/email/partials"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "../modules/email/templates"),
  extName: ".hbs",
} as any;

// using handlebars with nodemailer
transporter.use("compile", hbs(handlebarsOptions));

// to see if i wrote everything right (connection check)
transporter.verify(function (error: any, success: any) {
  if (error) {
    console.error("Email configuration error:", error);
  } else {
    console.log("Email server is ready to take our messages");
  }
});
