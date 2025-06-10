// Utility to generate FlowingMenu items and click handlers based on userType and overlay triggers
import { User, Briefcase, MessageSquare, Settings, BarChart2, Brain } from 'lucide-react';

export interface FlowingMenuItem {
  link: string;
  text: string;
  image: string;
  overlay: 'swipe' | 'messages' | 'profile' | 'settings' | 'coach' | 'dashboard';
}

export function getFlowingMenuItems(userType: 'candidate' | 'employer' | null): FlowingMenuItem[] {
  if (userType === 'employer') {
    return [
      {
        link: '#candidates',
        text: 'Candidates',
        image: '/assets/meeting.png',
        overlay: 'swipe',
      },
      {
        link: '#messages',
        text: 'Messages',
        image: '/assets/laptop.png',
        overlay: 'messages',
      },
      {
        link: '#dashboard',
        text: 'Dashboard',
        image: '/assets/meeting.png',
        overlay: 'dashboard',
      },
      {
        link: '#profile',
        text: 'Profile',
        image: '/assets/image.png',
        overlay: 'profile',
      },
      {
        link: '#settings',
        text: 'Settings',
        image: '/assets/setting.png',
        overlay: 'settings',
      },
      {
        link: '#coach',
        text: 'Coach',
        image: '/assets/implant.png',
        overlay: 'coach',
      },
    ];
  }
  // Default to candidate
  return [
    {
      link: '#jobs',
      text: 'Jobs',
      image: '/assets/meeting.png',
      overlay: 'swipe',
    },
    {
      link: '#messages',
      text: 'Messages',
      image: '/assets/laptop.png',
      overlay: 'messages',
    },
    {
      link: '#profile',
      text: 'Profile',
      image: '/assets/image.png',
      overlay: 'profile',
    },
    {
      link: '#settings',
      text: 'Settings',
      image: '/assets/setting.png',
      overlay: 'settings',
    },
    {
      link: '#coach',
      text: 'Coach',
      image: '/assets/implant.png',
      overlay: 'coach',
    },
  ];
}
