const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = async (to, subject, text) => {
  const mailOptions = {
    from: `"TrainTrack" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`E-mail enviado para: ${to}`);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw error;
  }
};
