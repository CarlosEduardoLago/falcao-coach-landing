import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient-primary' | 'gradient-secondary';
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const variantClasses = {
  default: 'bg-dark-gray',
  'gradient-primary': 'bg-gradient-primary',
  'gradient-secondary': 'bg-gradient-secondary',
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = false,
  onClick,
  style,
}) => {
  return (
    <div
      className={`
        ${variantClasses[variant]}
        ${className}
        rounded-xl p-6 shadow-lg
        ${hover ? 'transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer' : ''}
      `}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};
