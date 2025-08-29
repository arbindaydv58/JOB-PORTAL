require("dotenv").config();
const nodemailer = require("nodemailer");
app.get("/test-email", async (req, res) => {
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: "learn.subedibhuwan2000@gmail.com",
      to: "learn.subedibhuwan2000@gmail.com", // Send to yourself
      subject: "Test Email",
      html: "<h2>Email service is working! 🎉</h2>",
    });
    res.json({ success: true, message: "Test email sent!" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});