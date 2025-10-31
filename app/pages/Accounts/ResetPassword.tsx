import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router";
import type { Route } from "./+types/ResetPassword";
import { AuthLayout } from "~/components/auth/AuthLayout";
import { AuthForm } from "~/components/auth/AuthForm";
import { Input } from "~/components/ui/Input";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reset Password - CF Pipeline" },
    { name: "description", content: "Set a new password" },
  ];
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Reset password:", { token, password: formData.password });
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (!token) {
    return (
      <AuthLayout 
        title="Invalid Link" 
        subtitle="This password reset link is invalid"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-gray-600">
            The password reset link is invalid or has expired. Please request a new one.
          </p>
          <div className="pt-4">
            <Link to="/auth/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
              Request New Link
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (isSuccess) {
    return (
      <AuthLayout 
        title="Password Reset Successful" 
        subtitle="Your password has been updated"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-gray-600">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
          <div className="pt-4">
            <Link to="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Go to Sign In
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your new password"
    >
      <AuthForm
        onSubmit={handleSubmit}
        submitText="Reset Password"
        isLoading={isLoading}
        footer={
          <div className="text-gray-600">
            <Link to="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Back to Sign In
            </Link>
          </div>
        }
      >
        <Input
          type="password"
          label="New Password"
          placeholder="At least 8 characters"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={errors.password}
          autoComplete="new-password"
          helperText="Must be at least 8 characters long"
        />
        
        <Input
          type="password"
          label="Confirm New Password"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />
      </AuthForm>
    </AuthLayout>
  );
}
