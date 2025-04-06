import { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export const Label = ({ children, className = '', ...props }: LabelProps) => {
  return (
    <label
      {...props}
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
    >
      {children}
    </label>
  );
};
