import React, { useState, useRef, useEffect } from 'react';
import GradientButton from './GradientButton';
import SettingRow from './SettingRow';
import { AlgorandVerification } from './AlgorandVerification';

interface SettingSection {
  title: string;
  settings: {
    type: 'toggle' | 'input' | 'select';
    label: string;
    value: any;
    options?: string[];
  }[];
}

interface SettingsCardProps {
  forceExpanded?: boolean;
}

// Simple useMediaQuery hook
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  return matches;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ forceExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(forceExpanded);
  const isMobile = useMediaQuery('(max-width: 640px)'); // Tailwind's sm breakpoint

  const [openSection, setOpenSection] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    darkMode: true,
    pushNotifications: true,
    locationAccess: false,
    email: 'user@example.com',
    password: '********',
    twoFactorAuth: false,
    subscription: 'pro',
    autoRenew: true,
    profileVisibility: 'public',
    dataCollection: true,
    marketingEmails: false,
  });
  const [pendingSettings, setPendingSettings] = useState(settings);

  // Refs for each section
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Map setting label to correct key
  const labelToKey: Record<string, keyof typeof settings> = {
    'darkmode': 'darkMode',
    'pushnotifications': 'pushNotifications',
    'locationaccess': 'locationAccess',
    'email': 'email',
    'password': 'password',
    'two-factorauthentication': 'twoFactorAuth',
    'plan': 'subscription',
    'autorenew': 'autoRenew',
    'profilevisibility': 'profileVisibility',
    'datacollection': 'dataCollection',
    'emailnotifications': 'marketingEmails',
  };


  React.useEffect(() => {
    if (forceExpanded) {
      setIsExpanded(true);
    }
  }, [forceExpanded]);

  // Handler for generic setting change
  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    setPendingSettings(prev => ({ ...prev, [key]: value }));
  };

  // Helper to get the correct key from label
  const getKey = (label: string) => labelToKey[label.toLowerCase().replace(/\s+/g, '')] as keyof typeof settings;

  const handleSave = () => {
    setSettings(pendingSettings);
    // TODO: Add API call or persistence logic here
  };

  const settingSections: SettingSection[] = [
    {
      title: 'Account',

      settings: [
        { type: 'input', label: 'Email', value: settings.email },
        { type: 'input', label: 'Password', value: settings.password },
        { type: 'toggle', label: 'Two-Factor Authentication', value: settings.twoFactorAuth },
      ]
    },
    {
      title: 'Subscription',

      settings: [
        { 
          type: 'select', 
          label: 'Plan', 
          value: settings.subscription,
          options: ['free', 'pro', 'enterprise']
        },
        { type: 'toggle', label: 'Auto-Renew', value: settings.autoRenew },
      ]
    },
    {
      title: 'Notifications',

      settings: [
        { type: 'toggle', label: 'Push Notifications', value: settings.pushNotifications },
        { type: 'toggle', label: 'Email Notifications', value: settings.marketingEmails },
      ]
    },
    {
      title: 'Privacy',

      settings: [
        { 
          type: 'select', 
          label: 'Profile Visibility', 
          value: settings.profileVisibility,
          options: ['public', 'private', 'connections']
        },
        { type: 'toggle', label: 'Data Collection', value: settings.dataCollection },
      ]
    },
    {
      title: 'Preferences',

      settings: [
        { type: 'toggle', label: 'Dark Mode', value: settings.darkMode },
        { type: 'toggle', label: 'Location Access', value: settings.locationAccess },
      ]
    },
    {
      title: 'Verification',
      settings: [] // We'll render AlgorandVerification directly
    }
  ];

  // Compact card for mobile or if not expanded
  if ((!isExpanded && !forceExpanded) || (isMobile && !forceExpanded)) {
    return (
      <div className="relative w-[320px]">
        <div className="flex flex-col h-[350px] p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl shadow-black/20">
          <h2 className="text-2xl font-bold text-white tracking-wide mb-6 text-center">Settings</h2>
          <div className="flex-1 space-y-4">
            <SettingRow setting={{ type: 'toggle', label: 'Dark Mode', value: settings.darkMode }} value={settings.darkMode} onChange={v => handleSettingChange('darkMode', v)} />
            <SettingRow setting={{ type: 'toggle', label: 'Push Notifications', value: settings.pushNotifications }} value={settings.pushNotifications} onChange={v => handleSettingChange('pushNotifications', v)} />
            <SettingRow setting={{ type: 'toggle', label: 'Location Access', value: settings.locationAccess }} value={settings.locationAccess} onChange={v => handleSettingChange('locationAccess', v)} />
          </div>
          <div className="mt-auto flex flex-col items-center space-y-4">
            <GradientButton onClick={() => setIsExpanded(true)}>More Settings</GradientButton>
            <GradientButton onClick={() => console.log('Log out clicked')}>Log Out</GradientButton>
          </div>
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] h-4 bg-black/20 blur-md rounded-full"></div>
      </div>
    );
  }

  // Expanded card for desktop/fullscreen
  return (
    <div className="relative w-full max-w-[900px]">
      <div
        className="flex flex-col h-[80vh] min-h-[600px] p-10 rounded-2xl shadow-xl shadow-black/20 border bg-white/10 backdrop-blur-2xl border-white/20"
        style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white tracking-wide drop-shadow-lg" style={{letterSpacing: '0.04em'}}>Settings</h2>
          {!forceExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors duration-200 shadow border border-white/20"
              aria-label="Collapse"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-hide">
          {settingSections.map((section) => (
            <div
              key={section.title}
              className="mb-2 rounded-xl bg-white/5"
              ref={el => (sectionRefs.current[section.title] = el)}
            >
              <button
                className="flex items-center justify-between w-full px-4 py-3 text-lg font-semibold text-white focus:outline-none"
                onClick={() => {
                  setOpenSection(openSection === section.title ? null : section.title);
                }}
                aria-expanded={openSection === section.title}
              >
                <span>{section.title}</span>
                <span className="ml-2">{openSection === section.title ? '▲' : '▼'}</span>
              </button>
              {openSection === section.title && (
                <div className="px-4 pb-4 space-y-2">
                  {section.settings.map(setting => {
                    const key = getKey(setting.label);
                    return (
                      <SettingRow
                        key={setting.label}
                        setting={setting}
                        value={pendingSettings[key]}
                        onChange={v => handleSettingChange(key, v)}
                      />
                    );
                  })}
                  {section.title === 'Verification' && (
                    <AlgorandVerification email={pendingSettings.email} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        <div className="mt-8 flex gap-6 justify-end">
          <GradientButton className="rounded-2xl px-6 py-2 shadow-lg border border-white/25" onClick={handleSave}>
            Save Changes
          </GradientButton>
          <GradientButton className="rounded-2xl px-6 py-2 shadow-lg border border-white/25" onClick={() => console.log('Log out clicked')}>
            Log Out
          </GradientButton>
        </div>
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] h-4 bg-black/20 blur-md rounded-full"></div>
    </div>
  );
};

export default SettingsCard;