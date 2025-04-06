import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};
