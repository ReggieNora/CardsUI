import React from 'react';
import ActionButton from './ActionButton';
import { X, Star, Heart } from 'lucide-react';

interface ActionButtonsProps {
  onDismiss?: () => void;
  onFavorite?: () => void;
  onLike?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onDismiss,
  onFavorite,
  onLike
}) => {
  return (
    <div className="flex justify-center gap-6 mt-8">
      <ActionButton 
        icon={X} 
        color="text-red-300" 
        onClick={onDismiss} 
      />
      <ActionButton 
        icon={Star} 
        color="text-yellow-300" 
        onClick={onFavorite} 
      />
      <ActionButton 
        icon={Heart} 
        color="text-green-300" 
        onClick={onLike} 
      />
    </div>
  );
};

export default ActionButtons;