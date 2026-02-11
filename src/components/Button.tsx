import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'px-8 py-4 transition-all duration-200 inline-flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md',
    secondary: 'bg-orange-500 text-white hover:bg-orange-600 shadow-sm hover:shadow-md',
    ghost: 'text-teal-600 hover:text-teal-700 underline underline-offset-4 decoration-2',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={{ fontWeight: 600 }}
      {...props}
    >
      {children}
    </button>
  );
}