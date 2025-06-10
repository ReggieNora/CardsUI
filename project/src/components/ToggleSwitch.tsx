import React from 'react';

interface ToggleSwitchProps {
  label: string;
  isOn: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, isOn, onToggle }) => {
  return (
    <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10
                    transition-all duration-300 hover:bg-white/10
                    flex items-center justify-between">
      <span className="text-white font-medium">{label}</span>
      <button
        onClick={onToggle}
        className={`relative w-14 h-7 rounded-full transition-colors duration-300
                   ${isOn ? 'bg-purple-500' : 'bg-white/20'}
                   backdrop-blur-sm border border-white/20`}
      >
        <span
          className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-lg
                     transform transition-transform duration-300
                     ${isOn ? 'translate-x-7' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;