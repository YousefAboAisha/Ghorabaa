import nodemailer from "nodemailer";

export const sendEmailOTP = async (toEmail: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // use 587 instead of 465
    secure: false, // true for port 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Ghorabaa" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "رمز التحقق لتسجيل الدخول - غرباء",
    html: `
      <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
        <h2>رمز التحقق الخاص بك</h2>
        <p>لقد طلبت تسجيل الدخول إلى حسابك باستخدام البريد الإلكتروني:</p>
        <p><strong>${toEmail}</strong></p>
        <p>رمز التحقق الخاص بك هو:</p>
        <h1 style="background:#f1f1f1; padding:10px 20px; display:inline-block; border-radius:5px;">
          ${otp}
        </h1>
        <p>الرمز صالح لمدة 10 دقائق.</p>
        <p>إذا لم تطلب هذا الرمز، يمكنك تجاهل هذه الرسالة.</p>
        <br/>
        <p>مع تحيات فريق غرباء ❤️</p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("OTP Email sent:", info.messageId);
};
