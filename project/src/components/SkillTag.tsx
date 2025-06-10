import React from 'react';

interface SkillTagProps {
  label: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ label }) => {
  return (
    <div 
      className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20
                text-white font-medium text-sm transition-all duration-300
                hover:bg-white/20 hover:scale-105"
    >
      {label}
    </div>
  );
};

export default SkillTag;