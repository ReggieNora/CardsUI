import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingDock } from "./ui/FloatingDock";
import {
  IconBriefcase,
  IconMessageCircle,
  IconSettings,
  IconBrain,
  IconUser,
  IconChartBar,
  IconHome
} from "@tabler/icons-react";
import { DraggableCardContainer, DraggableCardBody } from "./ui/draggable-card";
import logo from "../assets/hirly-logo.png";
import SettingsCard from "./SettingsCard";
import CoachOverlay from "./CoachOverlay";
import DashboardOverlay from "./DashboardOverlay";
import SimpleProfileCard from "./SimpleProfileCard";
import MessagesOverlay from "./MessagesOverlay";

// Menu item interface
interface MenuItem {
  key: string;
  label: string;
  description: string;
  flippable?: boolean;
  color: string;
  icon: string;
}

// Initial menu items data
const initialMenuItems: MenuItem[] = [
  {
    key: "jobs",
    label: "Jobs",
    description: "Browse job opportunities",
    flippable: false,
    color: "from-green-500 to-emerald-500",
    icon: "💼"
  },
  {
    key: "messages",
    label: "Messages",
    description: "Chat with recruiters",
    flippable: false,
    color: "from-indigo-500 to-purple-500",
    icon: "💬"
  },
  {
    key: "settings",
    label: "Settings",
    description: "Adjust your preferences",
    flippable: true,
    color: "from-orange-500 to-red-500",
    icon: "⚙️"
  },
  {
    key: "coach",
    label: "Coach",
    description: "AI-powered career coaching",
    flippable: false,
    color: "from-blue-500 to-cyan-500",
    icon: "🤖"
  },
  // Remaining cards
  {
    key: "profile",
    label: "Profile",
    description: "View and edit your profile",
    flippable: true,
    color: "from-purple-500 to-pink-500",
    icon: "👤"
  },
  {
    key: "analytics",
    label: "Analytics",
    description: "View your job search stats",
    flippable: false,
    color: "from-teal-500 to-blue-500",
    icon: "📊"
  }
];

// Card positioning configuration
const CARD_WIDTH = 320;
const CARD_HEIGHT = 400;
const STACK_OFFSET = 8; // Offset between stacked cards
const ROTATION_RANGE = 6; // Max rotation in degrees

// Generate stacked positions for cards
function generateStackPositions(totalCards: number) {
  return Array.from({ length: totalCards }, (_, index) => ({
    x: index * STACK_OFFSET,
    y: index * STACK_OFFSET,
    rotate: (Math.random() - 0.5) * ROTATION_RANGE,
    scale: 1 - (index * 0.02), // Slightly scale down cards behind
    zIndex: totalCards - index
  }));
}

import SimpleCompanyProfileCard from "./SimpleCompanyProfileCard";

export default function CardHubExperiment() {
    // Set userType from router state if present
  const location = useLocation();
  const [userType, setUserType] = useState<'candidate' | 'employer'>(() => {
    // Try to get userType from navigation state
    const navState = location.state as { userType?: 'candidate' | 'employer' } | null;
    if (navState && navState.userType && (navState.userType === 'candidate' || navState.userType === 'employer')) {
      return navState.userType;
    }
    // Fallback to candidate
    return 'candidate';
  });

  // Keep userType in sync if navigation state changes (e.g. after login)
  useEffect(() => {
    const navState = location.state as { userType?: 'candidate' | 'employer' } | null;
    if (navState && navState.userType && navState.userType !== userType) {
      setUserType(navState.userType);
    }
    // eslint-disable-next-line
  }, [location.state]);

  // Card definitions for each user type
  function buildEmployerMenuItems() {
    return [
      {
        key: "candidates",
        label: "Candidates",
        description: "Browse candidate profiles",
        flippable: false,
        color: "from-green-500 to-emerald-500",
        icon: "🧑‍💼"
      },
      ...initialMenuItems.filter(item => item.key !== "jobs")
        .map(item => item.key === "profile"
          ? { ...item, key: "company", label: "Company", description: "View and edit your company profile", icon: "🏢" }
          : item)
    ];
  }

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => userType === 'employer' ? buildEmployerMenuItems() : initialMenuItems);

  // State for card stack management
  // const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [isAnimating, setIsAnimating] = useState(false);
  const [stackPositions] = useState(() => generateStackPositions(menuItems.length));
  
  // Modal states
  const [showCoach, setShowCoach] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Animation key for forcing re-renders
  const [animationKey, setAnimationKey] = useState(0);

  // Handle card dismissal and recycling
  const handleCardDismiss = (direction: 'left' | 'right') => {
  if (isAnimating) return;
  setIsAnimating(true);
  // Remove the top card from the stack
  setTimeout(() => {
    setMenuItems(prevItems => prevItems.slice(1));
    setAnimationKey(prev => prev + 1);
    setIsAnimating(false);
  }, 300); // Match the exit animation duration
};

  // Handle card interactions
  const handleCardAction = (item: MenuItem) => {
    if (userType === 'employer' && item.key === 'candidates') {
      // Navigate to candidates (swipe)
      window.location.href = '/app/candidates';
      return;
    }
    if (userType === 'employer' && item.key === 'company') {
      setExpandedCard('company');
      return;
    }

    switch (item.key) {
      case 'coach':
        setShowCoach(true);
        break;
      case 'settings':
      case 'profile':
        setExpandedCard(item.key);
        break;
      case 'company':
        setExpandedCard('company');
        break;
      case 'jobs':
        // Navigate to jobs
        window.location.href = '/app/jobs';
        break;
      case 'messages':
        setShowMessages(true);
        break;
      case 'analytics':
        setShowDashboard(true);
        break;
      default:
        console.log(`${item.label} clicked`);
    }
  };

  // Close expanded card
  const closeExpandedCard = () => {
    setExpandedCard(null);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18122B] via-[#251E40] to-[#1A1A2E] overflow-hidden">
      
      {/* Hirly Branded Header */}
      <div className="absolute top-0 left-0 w-full flex flex-col items-center z-30 pt-10 pointer-events-auto select-none">
        <div className="group flex flex-col items-center">
          <motion.h1
            onClick={() => setMenuOpen(open => !open)}
            tabIndex={0}
            role="button"
            aria-label="Open menu"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setMenuOpen(open => !open); }}
            className="cursor-pointer text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/30 drop-shadow-lg outline-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Hirly
          </motion.h1>
          {/* Animated chevron and tooltip */}
          <div className="relative flex flex-col items-center mt-1">
            {/* Chevron with limited animation */}
            {(() => {
              const [animateChevron, setAnimateChevron] = React.useState(true);
              React.useEffect(() => {
                const timeout = setTimeout(() => setAnimateChevron(false), 3200); // ~2.5-3 bounces
                return () => clearTimeout(timeout);
              }, []);
              return (
                <motion.div
                  initial={{ y: 0 }}
                  animate={animateChevron ? { y: [0, 6, 0] } : { y: 0 }}
                  transition={animateChevron ? { duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' } : { duration: 0.3 }}
                  className="text-white/80"
                  aria-hidden="true"
                >
                  <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L14 14L24 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              );
            })()}
            {/* Tooltip */}
            <span className="absolute top-7 left-1/2 -translate-x-1/2 text-xs text-white bg-black/70 px-3 py-1 rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 select-none" style={{whiteSpace:'nowrap'}}>
              Open menu
            </span>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Overlay for outside click */}
              <motion.div
                key="dock-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.25 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-20 bg-black cursor-pointer"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              />
              {/* Animated FloatingDock */}
              <motion.div
                key="dock-menu"
                initial={{ opacity: 0, y: -32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ type: "spring", stiffness: 340, damping: 32, duration: 0.32 }}
                className="mt-4 z-30"
              >
                <FloatingDock
                  items={[
                    ...menuItems.slice(0, Math.floor(menuItems.length / 2)).map(item => ({
                      title: item.label,
                      icon:
                        item.key === "jobs" ? <IconBriefcase className="w-6 h-6" /> :
                        item.key === "messages" ? <IconMessageCircle className="w-6 h-6" /> :
                        item.key === "settings" ? <IconSettings className="w-6 h-6" /> :
                        item.key === "coach" ? <IconBrain className="w-6 h-6" /> :
                        item.key === "profile" ? <IconUser className="w-6 h-6" /> :
                        item.key === "analytics" ? <IconChartBar className="w-6 h-6" /> : null,
                      href: "#",
                      onClick: () => {
                        setMenuOpen(false);
                        if (item.key === "coach") setShowCoach(true);
                        else if (item.key === "settings" || item.key === "profile") setExpandedCard(item.key);
                        else if (item.key === "jobs") window.location.href = "/app/jobs";
                        // Add additional logic for other cards if needed
                      }
                    })),
                    // Home button in the middle
                    {
                      title: "Home",
                      icon: <IconHome className="w-9 h-9 text-purple-300 drop-shadow-lg" />, // bigger and colored
                      href: "#",
                      onClick: () => {
                        setMenuOpen(false);
                        window.location.href = '/';
                      }
                    },
                    ...menuItems.slice(Math.floor(menuItems.length / 2)).map(item => ({
                      title: item.label,
                      icon:
                        item.key === "jobs" ? <IconBriefcase className="w-6 h-6" /> :
                        item.key === "messages" ? <IconMessageCircle className="w-6 h-6" /> :
                        item.key === "settings" ? <IconSettings className="w-6 h-6" /> :
                        item.key === "coach" ? <IconBrain className="w-6 h-6" /> :
                        item.key === "profile" ? <IconUser className="w-6 h-6" /> :
                        item.key === "analytics" ? <IconChartBar className="w-6 h-6" /> : null,
                      href: "#",
                      onClick: () => {
                        setMenuOpen(false);
                        if (item.key === "coach") setShowCoach(true);
                        else if (item.key === "settings" || item.key === "profile") setExpandedCard(item.key);
                        else if (item.key === "jobs") window.location.href = "/app/jobs";
                        // Add additional logic for other cards if needed
                      }
                    })),
                  ]}
                  desktopClassName="mt-2"
                  mobileClassName="mt-2"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Card Stack Container */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <DraggableCardContainer key={animationKey} className="relative">
          <AnimatePresence mode="popLayout">
            {menuItems.map((item, index) => {
              const position = stackPositions[index] || stackPositions[0];
              const isTopCard = index === 0;
              
              return (
                <motion.div
                  key={`${item.key}-${animationKey}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    zIndex: position.zIndex
                  }}
                  initial={{
                    x: '-50%',
                    y: '-50%',
                    scale: position.scale,
                    rotate: position.rotate,
                    translateX: position.x,
                    translateY: position.y,
                  }}
                  animate={{
                    x: '-50%',
                    y: '-50%',
                    scale: position.scale,
                    rotate: position.rotate,
                    translateX: position.x,
                    translateY: position.y,
                  }}
                  exit={{
                    x: '-50%',
                    y: '-50%',
                    scale: 0.8,
                    rotate: (Math.random() - 0.5) * 30,
                    translateX: (Math.random() - 0.5) * 1000,
                    translateY: -500,
                    opacity: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    duration: 0.3
                  }}
                >
                  <DraggableCardBody
                    onDismiss={isTopCard ? handleCardDismiss : undefined}
                    dragDisabled={!isTopCard}
                    onTap={isTopCard ? () => handleCardAction(item) : undefined}
                  >
                    <motion.div
                      className={`
                        w-[${CARD_WIDTH}px] h-[${CARD_HEIGHT}px] 
                        rounded-2xl bg-gradient-to-br ${item.color}
                        shadow-2xl border border-white/20 backdrop-blur-xl
                        flex flex-col items-center justify-center p-8 text-center
                        ${isTopCard ? 'cursor-pointer' : 'cursor-default'}
                      `}
                      style={{
                        width: CARD_WIDTH,
                        height: CARD_HEIGHT,
                      }}
                      whileHover={isTopCard ? { scale: 1.02 } : {}}
                      whileTap={isTopCard ? { scale: 0.98 } : {}}
                    >
                      {/* Card Content */}
                      <div className="text-6xl mb-6 select-none">
                        {item.icon}
                      </div>
                      
                      <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                        {item.label}
                      </h2>
                      
                      <p className="text-white/90 text-lg leading-relaxed max-w-xs">
                        {item.description}
                      </p>

                      {/* Top card indicator */}
                      {isTopCard && (
                        <motion.div
                          className="absolute top-4 right-4 w-3 h-3 bg-white/80 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}

                      {/* Stack indicator for non-top cards */}
                      {!isTopCard && (
                        <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none" />
                      )}
                    </motion.div>
                  </DraggableCardBody>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </DraggableCardContainer>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-white/80 text-sm text-center">
            Swipe or tap the top card to navigate • Cards cycle infinitely
          </p>
        </motion.div>
      </div>

      {/* Messages Overlay Modal */}
      {showMessages && (
        <MessagesOverlay onCollapse={() => setShowMessages(false)} />
      )}

      {/* Coach Overlay Modal */}
      {showCoach && (
        <CoachOverlay onCollapse={() => setShowCoach(false)} />
      )}

      {/* Dashboard Overlay Modal */}
      {showDashboard && (
        <DashboardOverlay onCollapse={() => setShowDashboard(false)} />
      )}

      {/* Expanded Settings Card */}
      {expandedCard === 'settings' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg">
          <div className="relative">
            <button
              onClick={closeExpandedCard}
              className="absolute top-4 right-4 z-20 w-12 h-12 p-0 rounded-full bg-white shadow-lg border border-white/30 hover:bg-pink-100 transition-colors flex items-center justify-center"
              style={{ boxShadow: '0 2px 8px 0 rgba(168, 85, 247, 0.18)' }}
            >
              <span className="text-pink-500 text-2xl font-extrabold leading-none">×</span>
            </button>
            <SettingsCard forceExpanded={true} />
          </div>
        </div>
      )}

      {/* Expanded Profile/Company Card */}
      {expandedCard === 'profile' && userType === 'candidate' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg">
          <div className="relative">
            <button
              onClick={closeExpandedCard}
              className="absolute top-4 right-4 z-20 w-12 h-12 p-0 rounded-full bg-white shadow-lg border border-white/30 hover:bg-pink-100 transition-colors flex items-center justify-center"
              style={{ boxShadow: '0 2px 8px 0 rgba(168, 85, 247, 0.18)' }}
            >
              <span className="text-pink-500 text-2xl font-extrabold leading-none">×</span>
            </button>
            {/* Edit Button */}
            <button
              onClick={() => alert('Edit profile (to be implemented)')}
              className="absolute top-1/2 right-[-120px] z-10 px-5 py-2 rounded-xl bg-gradient-to-br from-purple-500 via-purple-400 to-pink-400 text-white font-bold shadow-lg border border-white/20 hover:scale-105 hover:bg-pink-500 transition-all"
              style={{ transform: 'translateY(-50%)' }}
            >
              Edit
            </button>
            <motion.div
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0.8, 0.2, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <SimpleProfileCard
                name="Javi A. Torres"
                title="Software Engineer"
                imageUrl="https://randomuser.me/api/portraits/men/32.jpg"
                description="Passionate about building delightful UIs and robust web apps."
                meta1="React, TypeScript, Node.js"
                meta2="Acme Corp"
                meta3="MIT Alum"
              />
            </motion.div>
          </div>
        </div>
      )}
      {expandedCard === 'company' && userType === 'employer' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg">
          <div className="relative">
            <button
              onClick={closeExpandedCard}
              className="absolute top-4 right-4 z-20 w-12 h-12 p-0 rounded-full bg-white shadow-lg border border-white/30 hover:bg-pink-100 transition-colors flex items-center justify-center"
              style={{ boxShadow: '0 2px 8px 0 rgba(168, 85, 247, 0.18)' }}
            >
              <span className="text-pink-500 text-2xl font-extrabold leading-none">×</span>
            </button>
            {/* Edit Button */}
            <button
              onClick={() => alert('Edit company profile (to be implemented)')}
              className="absolute top-1/2 right-[-120px] z-10 px-5 py-2 rounded-xl bg-gradient-to-br from-purple-500 via-purple-400 to-pink-400 text-white font-bold shadow-lg border border-white/20 hover:scale-105 hover:bg-pink-500 transition-all"
              style={{ transform: 'translateY(-50%)' }}
            >
              Edit
            </button>
            <motion.div
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0.8, 0.2, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <SimpleCompanyProfileCard
                companyName="Acme Corp"
                industry="Software"
                logoUrl="https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png"
                description="Building next-gen hiring experiences for teams."
                specialties={["AI Hiring", "Remote", "Tech"]}
              />
            </motion.div>
          </div>
        </div>
      )}

      {/* Logout Button */}
      <motion.button
        onClick={() => {/* TODO: implement actual logout logic */ window.location.href = '/logout'; }}
        className="fixed top-8 left-8 z-50 flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl text-red-500 font-semibold shadow-2xl transition-all duration-300 hover:scale-105"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-lg">⎋</span>
        <span>Logout</span>
      </motion.button>
    </div>
  );
}