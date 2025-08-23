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
       <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; direction: rtl; text-align: right; background-color: #f9f9f9; padding: 30px; border-radius: 10px;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 20px 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
      <h2 style="color: #2c3e50;">🔐 منصة غُرباء |  تأكيد رمز التحقق</h2>
      <p style="font-size: 16px; color: #333;">لقد طلبت تسجيل الدخول إلى منصة غُرباء عبر البريد الإلكتروني التالي:</p>
      <p style="font-size: 16px; font-weight: bold; color: #2980b9;">${toEmail}</p>
      <p style="font-size: 16px; color: #333;">رمز التحقق الخاص بك هو:</p>
      <h1 style="background: #5B913B20; color: #2c3e50; padding: 14px 28px; display: inline-block; border-radius: 8px; font-size: 32px; letter-spacing: 4px; font-weight: bold;">
        ${otp}
      </h1>
      <p style="font-size: 14px; color: #7f8c8d; margin-top: 20px;">هذا الرمز صالح لمدة 10 دقائق فقط.</p>
      <p style="font-size: 14px; color: #7f8c8d;">إذا لم تطلب هذا الرمز، يمكنك تجاهل هذه الرسالة بكل أمان.</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 14px; color: #555;">مع تحيات فريق <strong style="color: #5B913B;">غرباء ❤️</strong></p>
    </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
