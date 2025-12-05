import { ButtonHTMLAttributes, ReactNode } from 'react';

type SmoothButtonVariant = 'blue' | 'red' | 'gray';

interface SmoothButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: SmoothButtonVariant;
  fullWidth?: boolean;
}

const variantStyles: Record<
  SmoothButtonVariant,
  { bg: string; text: string; hover: string }
> = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-100',
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    hover: 'hover:bg-red-100',
  },
  gray: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    hover: 'hover:bg-gray-200',
  },
};

export default function SmoothButton({
  children,
  variant = 'blue',
  fullWidth = true,
  className = '',
  ...props
}: SmoothButtonProps) {
  const styles = variantStyles[variant];

  return (
    <button
      className={`${fullWidth ? 'flex-1' : ''} px-4 py-3 ${styles.bg} ${styles.text} rounded-lg font-medium ${styles.hover} transition-colors duration-200 text-sm cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
