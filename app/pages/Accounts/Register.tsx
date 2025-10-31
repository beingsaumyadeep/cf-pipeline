import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/Register";
import { AuthLayout } from "~/components/auth/AuthLayout";
import { AuthForm } from "~/components/auth/AuthForm";
import { Input } from "~/components/ui/Input";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register - CF Pipeline" },
    { name: "description", content: "Create a new account" },
  ];
}

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) {
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
      console.log("Register:", formData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Sign up to get started"
    >
      <AuthForm
        onSubmit={handleSubmit}
        submitText="Create Account"
        isLoading={isLoading}
        footer={
          <div className="text-gray-600">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </div>
        }
      >
        <Input
          type="text"
          label="Full Name"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          error={errors.name}
          autoComplete="name"
        />
        
        <Input
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        
        <Input
          type="password"
          label="Password"
          placeholder="At least 8 characters"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={errors.password}
          autoComplete="new-password"
          helperText="Must be at least 8 characters long"
        />
        
        <Input
          type="password"
          label="Confirm Password"
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