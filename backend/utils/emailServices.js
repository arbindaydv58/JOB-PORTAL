const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD, // Gmail app password
    },
    tls: { rejectUnauthorized: true }, // enforce secure TLS
  });
};

const sendVerificationEmail = async (email, token, name) => {
  const transporter = createTransporter();
  const url = `http://localhost:5000/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: { name: "HireHub", address: process.env.SMTP_USER },
    to: email,
    subject: "Verify Your Email - HireHub",
    html: `<p>Hello ${name},</p><p>Please verify your email:</p><a href="${url}">${url}</a>`,
  };

  return transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (email, token, name) => {
  const transporter = createTransporter();
  const url = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: { name: "HireHub Security", address: process.env.SMTP_USER },
    to: email,
    subject: "Password Reset Request - HireHub",
    html: `<p>Hi ${name},</p><p>Reset your password here:</p><a href="${url}">${url}</a>`,
  };

  return transporter.sendMail(mailOptions);
};

const sendWelcomeEmail = async (email, name) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: { name: "HireHub Team", address: process.env.SMTP_USER },
    to: email,
    subject: "Welcome to HireHub!",
    html: `<p>Welcome ${name}!</p><p>Your account has been activated successfully 🎉</p>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail };
