import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/Login";
import { AuthLayout } from "~/components/auth/AuthLayout";
import { AuthForm } from "~/components/auth/AuthForm";
import { Input } from "~/components/ui/Input";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - CF Pipeline" },
    { name: "description", content: "Login to your account" },
  ];
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    
    // Basic validation
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Login:", { email, password });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your account to continue"
    >
      <AuthForm
        onSubmit={handleSubmit}
        submitText="Sign In"
        isLoading={isLoading}
        footer={
          <div className="space-y-2">
            <div className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </div>
            <div>
              <Link to="/auth/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
                Forgot your password?
              </Link>
            </div>
          </div>
        }
      >
        <Input
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="current-password"
        />
      </AuthForm>
    </AuthLayout>
  );
}
