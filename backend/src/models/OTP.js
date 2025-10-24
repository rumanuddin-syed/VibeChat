import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // TTL index to auto-delete expired documents
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create index for faster queries
otpSchema.index({ email: 1, used: 1 });

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;