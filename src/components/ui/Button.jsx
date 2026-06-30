import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 border text-lg font-medium rounded-[16px] shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 min-h-[52px]";
  
  const variants = {
    primary: "border-transparent text-white bg-primary-500 hover:bg-primary-600 focus:ring-primary-500 hover:brightness-105",
    secondary: "border-primary-500 text-primary-500 bg-white hover:bg-primary-500 hover:text-white focus:ring-primary-500",
    danger: "border-transparent text-white bg-red-500 hover:bg-red-600 focus:ring-red-500"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
