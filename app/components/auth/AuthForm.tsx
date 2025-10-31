import { type FormEvent, type ReactNode } from "react";
import { Button } from "../ui/Button";

interface AuthFormProps {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitText: string;
  isLoading?: boolean;
  footer?: ReactNode;
}

export const AuthForm = ({ children, onSubmit, submitText, isLoading, footer }: AuthFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
      
      <Button 
        type="submit" 
        variant="primary" 
        className="w-full"
        isLoading={isLoading}
      >
        {submitText}
      </Button>
      
      {footer && (
        <div className="mt-4 text-center text-sm">
          {footer}
        </div>
      )}
    </form>
  );
};
