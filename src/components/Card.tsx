import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl p-8 space-y-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
