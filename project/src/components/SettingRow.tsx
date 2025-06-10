import React from "react";
import ToggleSwitch from "./ToggleSwitch";

interface SettingRowProps {
  setting: {
    type: "toggle" | "input" | "select";
    label: string;
    value: any;
    options?: string[];
  };
  value: any;
  onChange: (value: any) => void;
}

const SettingRow: React.FC<SettingRowProps> = ({ setting, value, onChange }) => {
  if (setting.type === "toggle") {
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-white/90 font-medium">{setting.label}</span>
        <ToggleSwitch isOn={value} onToggle={() => onChange(!value)} label={setting.label} />
      </div>
    );
  }
  if (setting.type === "input") {
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-white/90 font-medium">{setting.label}</span>
        <input
          type={setting.label.toLowerCase().includes("password") ? "password" : "text"}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="bg-transparent border-b border-white/20 text-white px-2 py-1 w-48 text-right focus:outline-none"
        />
      </div>
    );
  }
  if (setting.type === "select") {
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-white/90 font-medium">{setting.label}</span>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="bg-transparent border-b border-white/20 text-white px-2 py-1 w-48 text-right focus:outline-none"
        >
          {setting.options?.map(opt => (
            <option key={opt} value={opt} className="bg-gray-800 text-white">
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return null;
};

export default SettingRow;
