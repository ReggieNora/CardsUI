import React from "react";

import "./FlowingMenu.css";
import { LampBackground } from "./ui/LampBackground";

import type { FlowingMenuItem } from './FlowingMenuItems';

interface MenuItemProps extends FlowingMenuItem {}

interface FlowingMenuProps {
  items?: FlowingMenuItem[];
  onItemClick?: (item: FlowingMenuItem) => void;
  userName?: string;
  userRole?: 'Candidate' | 'Employer';
}


const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [], onItemClick, userName = 'John Doe', userRole = 'Candidate' }) => {
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  const [arrowNavActive, setArrowNavActive] = React.useState(false);

  // --- Tutorial Overlay State ---
  const [tutorialActive, setTutorialActive] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('email');
      const tutorialKey = email ? `mainMenuTutorialSeen_${email}` : 'mainMenuTutorialSeen';
      const value = localStorage.getItem(tutorialKey);
      console.log('[TutorialOverlay] email:', email, 'tutorialKey:', tutorialKey, 'localStorage value:', value);
      if (!value) {
        setTutorialActive(true);
        console.log('[TutorialOverlay] Tutorial set to active');
      }
    }
  }, []);
  const dismissTutorial = React.useCallback(() => {
    setTutorialActive(false);
    const email = localStorage.getItem('email');
    const tutorialKey = email ? `mainMenuTutorialSeen_${email}` : 'mainMenuTutorialSeen';
    localStorage.setItem(tutorialKey, 'true');
    console.log('[TutorialOverlay] Tutorial dismissed for', tutorialKey);
  }, []);

  const handleItemClick = (item: FlowingMenuItem) => {
    onItemClick?.(item);
  };


  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!items.length) return;
      if (!arrowNavActive) {
        if (["ArrowDown","ArrowUp","ArrowLeft","ArrowRight"].includes(e.key)) {
          setArrowNavActive(true);
          e.preventDefault();
        }
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setSelectedIdx(idx => (idx + 1) % items.length);
        e.preventDefault();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setSelectedIdx(idx => (idx - 1 + items.length) % items.length);
        e.preventDefault();
      } else if ((e.key === 'Enter' || e.key === ' ') && items[selectedIdx]) {
        onItemClick?.(items[selectedIdx]);
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIdx, onItemClick, arrowNavActive]);

  return (
    <div style={{position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden'}}>
      <LampBackground />
      {/* Tutorial Overlay */}
      {tutorialActive && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm" style={{pointerEvents: 'auto'}}>
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 max-w-md w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Welcome to Hirly!</h2>
            <p className="text-gray-700 mb-6 text-center">
              Explore the menu to navigate through jobs, candidates, messages, and more. Use your keyboard or mouse to get started. This quick guide appears only once.
            </p>
            <button
              className="mt-2 px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition"
              onClick={dismissTutorial}
              autoFocus
            >
              Got it!
            </button>
          </div>
        </div>
      )}
      {/* Brand background text */}
      <h1
        className="fixed top-1/2 left-1/2 -translate-x-[48%] -translate-y-1/2 text-[8rem] md:text-[12rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/30 opacity-20 pointer-events-none select-none z-10 font-[Clash Display,sans-serif]"
        style={{ fontFamily: 'Clash Display, sans-serif', userSelect: 'none', pointerEvents: 'none' }}
      >
        Hirly
      </h1>
      <div className="menu-wrap glass" style={{position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <nav className="menu">
          {items.map((item, idx) => (
            <MenuItem
              key={idx}
              {...item}
              onClick={() => handleItemClick(item)}
              selected={idx === selectedIdx}
            />
          ))}
        </nav>
      </div>
      {/* Footer */}
      <footer style={{position: 'fixed', bottom: 0, left: 0, width: '100vw', zIndex: 20}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2.5rem', width: '100%', color: 'rgba(255,255,255,0.72)', fontSize: '1.1rem', fontFamily: 'Clash Display, sans-serif', background: 'rgba(20,16,36,0.12)', backdropFilter: 'blur(6px)'}}>
          <span>Hirly, Inc. 2025</span>
          <a href="mailto:support@hirly.com" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none', fontWeight: 500}}>
            <LifeBuoy size={22} style={{marginRight: 4}} />
            Support
          </a>
        </div>
      </footer>


    </div>
  );
};

import { User, Briefcase, MessageSquare, Settings, BarChart2, Brain, LifeBuoy } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  'Candidates': <Briefcase size={36} />,
  'Jobs': <Briefcase size={36} />,
  'Messages': <MessageSquare size={36} />,
  'Settings': <Settings size={36} />,
  'Dashboard': <BarChart2 size={36} />,
  'Profile': <User size={36} />,
  'Coach': <Brain size={36} />,
};

const MenuItem = React.memo(
  ({ link, text, onClick, selected, onMouseEnter }: MenuItemProps & { onClick?: () => void; selected?: boolean; onMouseEnter?: () => void }) => {
    return (
      <div className={"menu__item" + (selected ? " menu__item--selected" : "")}
        onMouseEnter={onMouseEnter}
      >
        <a
          className={"menu__item-link" + (selected ? " menu__item-link--selected" : "")}
          href={link}
          tabIndex={selected ? 0 : -1}
          aria-selected={selected}
          onClick={e => {
            e.preventDefault();
            onClick?.();
          }}
        >
          <span className="menu__item-icon" style={{marginRight: '1.5vw', display: 'flex', alignItems: 'center'}}>
            {ICON_MAP[text] || <User size={36} />}
          </span>
          <span>{text}</span>
        </a>
      </div>
    );
  },
  (prev, next) => prev.selected === next.selected && prev.link === next.link && prev.text === next.text
);


export default FlowingMenu;
