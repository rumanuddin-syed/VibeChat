import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP - Streamify",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">Streamify</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Language Learning Community</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
            <p style="color: #666; line-height: 1.6;">
              You requested to reset your password for your Streamify account. 
              Use the OTP below to verify your identity and set a new password.
            </p>
            
            <div style="background: white; border-radius: 10px; padding: 25px; text-align: center; margin: 25px 0; border: 2px dashed #667eea;">
              <h3 style="color: #333; margin-bottom: 15px;">Your Verification Code</h3>
              <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #667eea; background: #f8f9fa; padding: 15px; border-radius: 8px;">
                ${otp}
              </div>
            </div>
            
            <p style="color: #666; line-height: 1.6; font-size: 14px;">
              <strong>Important:</strong> This OTP will expire in 10 minutes. 
              If you didn't request this reset, please ignore this email.
            </p>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">&copy; 2024 Streamify. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};