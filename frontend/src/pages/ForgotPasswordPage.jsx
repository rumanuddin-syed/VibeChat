import { useState } from "react";
import { ShipWheelIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { sendOTP, isSending, error, data } = useForgotPassword();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendOTP(email);
  };

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
            <Link to="/login" className="btn btn-ghost btn-sm mb-4">
              <ArrowLeft className="size-4" />
              Back to Login
            </Link>
            <div className="flex items-center justify-start gap-2">
              <ShipWheelIcon className="size-9 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Streamify
              </span>
            </div>
          </div>

          {/* SUCCESS MESSAGE */}
          {data && (
            <div className="alert alert-success mb-4">
              <span>Password reset OTP has been sent to your email!</span>
            </div>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response?.data?.message || "Something went wrong"}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Reset Your Password</h2>
                  <p className="text-sm opacity-70">
                    Enter your email address and we'll send you an OTP to reset your password
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input input-bordered w-full"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-full" 
                    disabled={isSending}
                  >
                    {isSending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Sending OTP...
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </button>

                  {data && (
                    <div className="text-center mt-4">
                      <Link 
                        to="/validate-otp" 
                        state={{ email }}
                        className="btn btn-success w-full"
                      >
                        Continue to Verify OTP
                      </Link>
                    </div>
                  )}
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
                src="/forgot-password.png" 
                alt="Password reset illustration" 
                className="w-full h-full" 
              />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Forgot your password?</h2>
              <p className="opacity-70">
                No worries! We'll help you get back into your account in no time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;