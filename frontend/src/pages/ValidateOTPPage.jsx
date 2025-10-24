import { useState, useRef, useEffect } from "react";
import { ShipWheelIcon, ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useValidateOTP } from "../hooks/useForgotPassword";

const ValidateOTPPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const { validateOTP, isValidating, error, data } = useValidateOTP();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length === 6) {
      validateOTP({ email, otp: otpString });
    }
  };

  // Navigate to reset password on successful OTP validation
  useEffect(() => {
    if (data) {
      navigate("/reset-password", { 
        state: { email, otp: otp.join("") } 
      });
    }
  }, [data, email, otp, navigate]);

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* BACK BUTTON AND LOGO */}
          <div className="mb-6">
            <Link to="/forgot-password" className="btn btn-ghost btn-sm mb-4">
              <ArrowLeft className="size-4" />
              Back
            </Link>
            <div className="flex items-center justify-start gap-2">
              <div className="mb-4 flex items-center justify-start gap-2">
                <img 
                  src="/vibechat.png" 
                  alt="VibeChat Logo" 
                  className="size-9" 
                />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wider">
                  vibechat
                </span>
              </div>
            </div>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response?.data?.message || "Invalid OTP"}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Enter Verification Code</h2>
                  <p className="text-sm opacity-70">
                    We sent a 6-digit code to <strong>{email}</strong>
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Verification Code</span>
                    </label>
                    <div className="flex gap-2 justify-center">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          maxLength="1"
                          className="input input-bordered w-12 h-12 text-center text-lg"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          required
                        />
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-full" 
                    disabled={isValidating || otp.join("").length !== 6}
                  >
                    {isValidating ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Verifying...
                      </>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Didn't receive the code?{" "}
                      <Link to="/forgot-password" className="text-primary hover:underline">
                        Resend OTP
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img 
                src="/i.png" 
                alt="OTP verification illustration" 
                className="w-full h-full" 
              />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Check your email</h2>
              <p className="opacity-70">
                Enter the 6-digit verification code we sent to your email address
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidateOTPPage;