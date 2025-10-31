import { type ReactNode } from "react";
import { Card, CardContent, CardHeader } from "../ui/Card";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">CF Pipeline</h1>
          <p className="text-gray-600">Secure Authentication</p>
        </div>
        
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </CardHeader>
          <CardContent className="pt-6">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
