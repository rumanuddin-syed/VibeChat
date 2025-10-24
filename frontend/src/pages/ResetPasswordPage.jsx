import { useState, useEffect } from "react";
import { ShipWheelIcon, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useResetPassword } from "../hooks/useForgotPassword";
import { toast } from "react-hot-toast";

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { resetPassword, isResetting, error, data } = useResetPassword();

  const { email, otp } = location.state || {};

  useEffect(() => {
    if (!email || !otp) {
      navigate("/forgot-password");
    }
  }, [email, otp, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    resetPassword({ 
      email, 
      otp, 
      newPassword: formData.newPassword 
    });
  };

  useEffect(() => {
    if (data) {
      toast.success("Password reset successfully! You can now login with your new password.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [data, navigate]);

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
            <Link to="/validate-otp" className="btn btn-ghost btn-sm mb-4">
              <ArrowLeft className="size-4" />
              Back
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
              <span>Password reset successfully! Redirecting to login...</span>
            </div>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response?.data?.message || "Failed to reset password"}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Set New Password</h2>
                  <p className="text-sm opacity-70">
                    Create a new password for your account
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">New Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="input input-bordered w-full pr-10"
                        value={formData.newPassword}
                        onChange={(e) => 
                          setFormData({ ...formData, newPassword: e.target.value })
                        }
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-4 opacity-70" />
                        ) : (
                          <Eye className="size-4 opacity-70" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Confirm Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="input input-bordered w-full pr-10"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="size-4 opacity-70" />
                        ) : (
                          <Eye className="size-4 opacity-70" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-full" 
                    disabled={isResetting}
                  >
                    {isResetting ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Resetting Password...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Remember your password?{" "}
                      <Link to="/login" className="text-primary hover:underline">
                        Back to Login
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
                src="/reset-password.png" 
                alt="Reset password illustration" 
                className="w-full h-full" 
              />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Create a strong password</h2>
              <p className="opacity-70">
                Make sure your new password is secure and different from previous ones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;