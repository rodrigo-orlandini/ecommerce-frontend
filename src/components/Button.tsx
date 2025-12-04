import { ButtonHTMLAttributes, ReactNode } from 'react';
import Spinner from '@/icons/Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

export default function Button({
  children,
  isLoading = false,
  loadingText = 'Carregando...',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <Spinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
