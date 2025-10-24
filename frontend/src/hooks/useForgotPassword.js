import { useMutation } from "@tanstack/react-query";
import { forgotPassword, validateOTP, resetPassword } from "../lib/api";

export const useForgotPassword = () => {
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: forgotPassword,
  });

  return { 
    sendOTP: mutate, 
    isSending: isPending, 
    error, 
    data 
  };
};

export const useValidateOTP = () => {
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: ({ email, otp }) => validateOTP(email, otp),
  });

  return { 
    validateOTP: mutate, 
    isValidating: isPending, 
    error, 
    data 
  };
};

export const useResetPassword = () => {
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: ({ email, otp, newPassword }) => resetPassword(email, otp, newPassword),
  });

  return { 
    resetPassword: mutate, 
    isResetting: isPending, 
    error, 
    data 
  };
};