import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-14 h-14 rounded-full flex items-center justify-center
                bg-white/10 backdrop-blur-md border border-white/10
                transition-all duration-300
                hover:bg-white/20 hover:scale-105 hover:shadow-lg
                active:scale-95 focus:outline-none`}
    >
      <Icon className={`${color} w-6 h-6`} />
    </button>
  );
};

export default ActionButton;