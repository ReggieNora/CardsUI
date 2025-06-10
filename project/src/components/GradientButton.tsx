import React from 'react';

interface GradientButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
  onClick, 
  className = '',
  children 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-3 rounded-xl
        bg-gradient-to-r from-purple-600 to-red-600
        text-white font-semibold
        transition-all duration-300
        hover:from-purple-500 hover:to-red-500
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-purple-500/50
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default GradientButton;