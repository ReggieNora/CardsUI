import React from 'react';
import { Sling as Hamburger } from 'hamburger-react';
import { AnimatePresence, motion } from 'framer-motion';

interface HamburgerMenuProps {
  userName?: string;
  userRole?: 'Candidate' | 'Employer';
  onLogout?: () => void;
  onCloseOverlay?: () => void;
}

import { useNavigate } from 'react-router-dom';

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ userName = 'John Doe', userRole = 'Candidate', onLogout, onCloseOverlay }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  // Placeholder navigation handlers
  const handleNavigate = (path: string) => {
    if (path.startsWith('http') || path.startsWith('/')) {
      window.location.href = path;
    } else {
      window.location.hash = path;
    }
    setMenuOpen(false);
  };
  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    } else {
      alert('Logout clicked! (Replace with actual logout logic)');
    }
    setMenuOpen(false);
  };

  // Accessibility: close menu with Escape
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <div className="fixed top-6 right-8 z-[999]">
      <button
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        className="focus:outline-none"
        tabIndex={0}
        style={{ background: 'none', border: 'none', boxShadow: 'none', padding: 0 }}
      >
        <Hamburger toggled={menuOpen} toggle={(val) => { console.log('Hamburger toggled', val); setMenuOpen(val); }} size={28} color="#fff" rounded label="Show menu" />
      </button>
      {/* Dropdown Menu with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-64 bg-white/20 border border-white/30 rounded-2xl shadow-xl backdrop-blur-xl z-50 glassy-dropdown"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
            }}
            role="menu"
            aria-label="User menu"
          >
            <div className="flex flex-col items-start p-5 gap-4">
              <div className="flex flex-col gap-0.5 w-full mb-2">
                <span className="text-lg font-semibold text-white truncate">{userName}</span>
                <span className="text-sm text-white/70">{userRole}</span>
              </div>
              <button
                className="w-full text-left px-2 py-2 rounded-lg hover:bg-white/10 text-white transition"
                onClick={() => {
                  if (onCloseOverlay) onCloseOverlay();
                  setMenuOpen(false);
                }}
                role="menuitem"
              >
                &#8592; Back
              </button>
              <button
                className="w-full text-left px-2 py-2 rounded-lg hover:bg-white/10 text-white transition"
                onClick={() => handleNavigate('/')} 
                role="menuitem"
              >
                Landing Page
              </button>
              <button
                className="w-full text-left px-2 py-2 rounded-lg hover:bg-white/10 text-white transition"
                onClick={() => handleNavigate('/feedback')} 
                role="menuitem"
              >
                Feedback
              </button>
              <button
                className="w-full text-left px-2 py-2 rounded-lg hover:bg-red-500/20 text-red-400 font-semibold transition mt-2"
                onClick={handleLogout}
                role="menuitem"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;

