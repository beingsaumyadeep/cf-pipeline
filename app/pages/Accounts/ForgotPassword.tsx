import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/ForgotPassword";
import { AuthLayout } from "~/components/auth/AuthLayout";
import { AuthForm } from "~/components/auth/AuthForm";
import { Input } from "~/components/ui/Input";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Forgot Password - CF Pipeline" },
    { name: "description", content: "Reset your password" },
  ];
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    
    if (!email) {
      setError("Email is required");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Forgot password:", { email });
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <AuthLayout 
        title="Check Your Email" 
        subtitle="We've sent you a password reset link"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-gray-600">
            We've sent a password reset link to <strong>{email}</strong>. 
            Please check your inbox and follow the instructions.
          </p>
          <div className="pt-4">
            <Link to="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Back to Sign In
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Forgot Password" 
      subtitle="Enter your email to receive a reset link"
    >
      <AuthForm
        onSubmit={handleSubmit}
        submitText="Send Reset Link"
        isLoading={isLoading}
        footer={
          <div className="text-gray-600">
            Remember your password?{" "}
            <Link to="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </div>
        }
      >
        <Input
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          autoComplete="email"
          helperText="We'll send you a link to reset your password"
        />
      </AuthForm>
    </AuthLayout>
  );
}
