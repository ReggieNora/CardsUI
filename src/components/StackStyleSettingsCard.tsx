import React, { useState } from 'react';

interface StackStyleSettingsCardProps {
  onClose: () => void;
}

const StackStyleSettingsCard: React.FC<StackStyleSettingsCardProps> = ({ onClose }) => {
  const [settings, setSettings] = useState({
    darkMode: true,
    pushNotifications: true,
    locationAccess: false,
    emailNotifications: false,
    profileVisibility: 'public' as 'public' | 'private' | 'connections',
    autoRenew: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const handleSelectChange = (key: keyof typeof settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Use the exact same dimensions and styling as the stack cards
  const cardStyle = {
    width: '320px',
    height: '400px',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg">
      {/* Close Button - Positioned to the side and moved up */}
      <button
        onClick={onClose}
        className="absolute left-1/2 top-1/2 transform -translate-y-1/2 translate-x-[200px] translate-y-[-90px] z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md flex items-center justify-center transition-all duration-300"
      >
        <span className="text-white text-2xl font-bold leading-none">×</span>
      </button>

      {/* Settings Card - Matching Stack Card Style */}
      <div
        className="rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-2xl border border-white/20 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
        style={cardStyle}
      >
        {/* Glassmorphic overlay for depth */}
        <div className="absolute inset-0 bg-white/5 rounded-2xl" />
        
        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">⚙️</div>
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">Settings</h2>
          </div>
          
          {/* Settings List - Scrollable */}
          <div className="flex-1 space-y-3 overflow-y-auto scrollbar-hide">
            {/* Dark Mode */}
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl border border-white/20">
              <span className="text-white/90 text-sm font-medium">Dark Mode</span>
              <button
                onClick={() => handleToggle('darkMode')}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  settings.darkMode ? 'bg-purple-500' : 'bg-white/20'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${
                    settings.darkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl border border-white/20">
              <span className="text-white/90 text-sm font-medium">Push Notifications</span>
              <button
                onClick={() => handleToggle('pushNotifications')}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  settings.pushNotifications ? 'bg-purple-500' : 'bg-white/20'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${
                    settings.pushNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Location Access */}
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl border border-white/20">
              <span className="text-white/90 text-sm font-medium">Location Access</span>
              <button
                onClick={() => handleToggle('locationAccess')}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  settings.locationAccess ? 'bg-purple-500' : 'bg-white/20'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${
                    settings.locationAccess ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Email Notifications */}
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl border border-white/20">
              <span className="text-white/90 text-sm font-medium">Email Notifications</span>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  settings.emailNotifications ? 'bg-purple-500' : 'bg-white/20'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Profile Visibility */}
            <div className="p-3 bg-white/10 rounded-xl border border-white/20">
              <label className="block text-white/90 text-sm font-medium mb-2">Profile Visibility</label>
              <select
                value={settings.profileVisibility}
                onChange={(e) => handleSelectChange('profileVisibility', e.target.value)}
                className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/50"
              >
                <option value="public" className="bg-gray-800 text-white">Public</option>
                <option value="private" className="bg-gray-800 text-white">Private</option>
                <option value="connections" className="bg-gray-800 text-white">Connections Only</option>
              </select>
            </div>

            {/* Auto Renew */}
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl border border-white/20">
              <span className="text-white/90 text-sm font-medium">Auto Renew</span>
              <button
                onClick={() => handleToggle('autoRenew')}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  settings.autoRenew ? 'bg-purple-500' : 'bg-white/20'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${
                    settings.autoRenew ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-4">
            <button
              onClick={() => {
                // Save settings logic here
                alert('Settings saved!');
              }}
              className="w-full py-3 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold transition-all duration-300"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Card indicator (matches stack cards) */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-white/60 rounded-full" />
        
        {/* Hide scrollbar */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default StackStyleSettingsCard;