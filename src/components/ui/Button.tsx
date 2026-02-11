import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantClasses = {
  primary: 'bg-gradient-primary text-white hover:opacity-90',
  secondary: 'bg-gradient-secondary text-white hover:opacity-90',
  outline: 'border-2 border-white text-white hover:bg-white hover:text-dark',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
        rounded-lg font-semibold transition-all duration-200
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};
