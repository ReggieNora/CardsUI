import React from 'react';

interface AvatarProps {
  src: string;
  size?: 'sm' | 'md' | 'lg' | 'large';
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, size = 'md', alt = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    large: 'w-20 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-white/20`}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Avatar;