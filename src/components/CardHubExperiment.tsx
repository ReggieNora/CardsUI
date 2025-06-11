import React, { useState, useRef, useEffect, Suspense, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingDock } from "./ui/FloatingDock";
import {
  IconBriefcase,
  IconMessageCircle,
  IconSettings,
  IconBrain,
  IconUser,
  IconChartBar,
  IconHome,
  IconBuilding,
  IconPlus,
  IconShield
} from "@tabler/icons-react";
import { DraggableCardContainer, DraggableCardBody } from "./ui/draggable-card";
import CoachOverlay from "./CoachOverlay";
import DashboardOverlay from "./DashboardOverlay";
import StackStyleProfileCard from "./StackStyleProfileCard";
import StackStyleSettingsCard from "./StackStyleSettingsCard";
import StackStyleVerifyCard from "./StackStyleVerifyCard";
import AddJobCard from "./AddJobCard";
import MessagesOverlay from "./MessagesOverlay";
import LandingPage from "./LandingPage";
import GradientBackground from "./GradientBackground";

// Menu item interface
interface MenuItem {
  key: string;
  label: string;
  description: string;
  flippable?: boolean;
  color: string;
  icon: string;
  userType?: 'candidate' | 'employer' | 'both';
}

// Card positioning configuration
const CARD_WIDTH = 320;
const CARD_HEIGHT = 400;
const STACK_OFFSET = 12;
const ROTATION_RANGE = 8;

function generateStackPositions(totalCards: number) {
  return Array.from({ length: totalCards }, (_, index) => ({
    rotate: (Math.random() - 0.5) * ROTATION_RANGE,
    x: index * STACK_OFFSET * 0.8,
    y: index * STACK_OFFSET * 0.6,
    scale: 1 - (index * 0.025),
    zIndex: totalCards - index
  }));
}

export default function CardHubExperiment() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  // User type state - get from navigation state, localStorage, or default to candidate
  const [userType, setUserType] = useState<'candidate' | 'employer'>(() => {
    const navState = location.state as { userType?: 'candidate' | 'employer' } | null;
    if (navState?.userType) {
      return navState.userType;
    }
    const storedType = localStorage.getItem('userType');
    if (storedType === 'candidate' || storedType === 'employer') {
      return storedType;
    }
    return 'candidate';
  });

  // Chevron animation state - moved to top level
  const [animateChevron, setAnimateChevron] = useState(true);

  // Keep userType in sync with navigation state changes
  useEffect(() => {
    const navState = location.state as { userType?: 'candidate' | 'employer' } | null;
    if (navState?.userType && navState.userType !== userType) {
      setUserType(navState.userType);
      localStorage.setItem('userType', navState.userType);
    }
  }, [location.state, userType]);

  // Chevron animation effect - moved to top level
  useEffect(() => {
    const timeout = setTimeout(() => setAnimateChevron(false), 3200);
    return () => clearTimeout(timeout);
  }, []);

  // Build menu items based on user type
  const buildMenuItems = useCallback((): MenuItem[] => {
    if (userType === 'employer') {
      return [
        {
          key: "candidates",
          label: "Candidates",
          description: "Browse candidate profiles and find talent",
          flippable: false,
          color: "from-green-500 to-emerald-500",
          icon: "🧑‍💼",
          userType: 'employer'
        },
        {
          key: "messages",
          label: "Messages",
          description: "Chat with candidates and team",
          flippable: false,
          color: "from-indigo-500 to-purple-500",
          icon: "💬",
          userType: 'both'
        },
        {
          key: "dashboard",
          label: "Dashboard",
          description: "View analytics and hiring metrics",
          flippable: false,
          color: "from-blue-500 to-cyan-500",
          icon: "📊",
          userType: 'employer'
        },
        {
          key: "upload-jobs",
          label: "Upload Jobs",
          description: "Add new job postings",
          flippable: false,
          color: "from-yellow-500 to-orange-500",
          icon: "➕",
          userType: 'employer'
        },
        {
          key: "verify",
          label: "Verify",
          description: "Blockchain verification with Algorand",
          flippable: false,
          color: "from-emerald-500 to-teal-500",
          icon: "✓",
          userType: 'both'
        },
        {
          key: "company",
          label: "Company",
          description: "View and edit company profile",
          flippable: true,
          color: "from-purple-500 to-pink-500",
          icon: "🏢",
          userType: 'employer'
        },
        {
          key: "settings",
          label: "Settings",
          description: "Adjust your preferences",
          flippable: true,
          color: "from-orange-500 to-red-500",
          icon: "⚙️",
          userType: 'both'
        }
      ];
    } else {
      return [
        {
          key: "jobs",
          label: "Jobs",
          description: "Browse job opportunities",
          flippable: false,
          color: "from-green-500 to-emerald-500",
          icon: "💼",
          userType: 'candidate'
        },
        {
          key: "messages",
          label: "Messages",
          description: "Chat with recruiters",
          flippable: false,
          color: "from-indigo-500 to-purple-500",
          icon: "💬",
          userType: 'both'
        },
        {
          key: "verify",
          label: "Verify",
          description: "Blockchain verification with Algorand",
          flippable: false,
          color: "from-emerald-500 to-teal-500",
          icon: "✓",
          userType: 'both'
        },
        {
          key: "profile",
          label: "Profile",
          description: "View and edit your profile",
          flippable: true,
          color: "from-purple-500 to-pink-500",
          icon: "👤",
          userType: 'candidate'
        },
        {
          key: "settings",
          label: "Settings",
          description: "Adjust your preferences",
          flippable: true,
          color: "from-orange-500 to-red-500",
          icon: "⚙️",
          userType: 'both'
        },
        {
          key: "coach",
          label: "Coach",
          description: "AI-powered career coaching",
          flippable: false,
          color: "from-blue-500 to-cyan-500",
          icon: "🤖",
          userType: 'both'
        }
      ];
    }
  }, [userType]);

  // Initialize menu items and positions
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => buildMenuItems());
  const [stackPositions, setStackPositions] = useState(() => generateStackPositions(menuItems.length));
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Update menu items when user type changes
  useEffect(() => {
    const newMenuItems = buildMenuItems();
    setMenuItems(newMenuItems);
    setStackPositions(generateStackPositions(newMenuItems.length));
    setAnimationKey(prev => prev + 1);
  }, [buildMenuItems]);

  // Modal states
  const [showCoach, setShowCoach] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showAddJob, setShowAddJob] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Authentication handlers
  const handleAuthSuccess = (type: 'candidate' | 'employer') => {
    setUserType(type);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userType', type);
  };

  const handleSignupSuccess = (type: 'candidate' | 'employer') => {
    setUserType(type);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userType', type);
  };

  // Handle card dismissal with infinite cycling - FIXED
  const handleCardDismiss = useCallback((direction: 'left' | 'right') => {
    if (isAnimating || menuItems.length === 0) return;
    
    setIsAnimating(true);
    
    // Use a shorter timeout to make animations feel more responsive
    setTimeout(() => {
      setMenuItems(prevItems => {
        if (prevItems.length <= 1) return prevItems;
        
        // Move the top card to the back for infinite cycling
        const [topCard, ...restCards] = prevItems;
        const newOrder = [...restCards, topCard];
        
        return newOrder;
      });
      
      // Update stack positions for the new order
      setStackPositions(generateStackPositions(menuItems.length));
      
      // Force re-render with new animation key
      setAnimationKey(prev => prev + 1);
      
      // Re-enable animations after a brief delay
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
      
    }, 200); // Reduced from 300ms to 200ms for snappier feel
  }, [isAnimating, menuItems.length]);

  // Handle card interactions
  const handleCardAction = useCallback((item: MenuItem) => {
    switch (item.key) {
      case 'candidates':
        navigate('/app/candidates');
        break;
      case 'jobs':
        navigate('/app/jobs');
        break;
      case 'coach':
        setShowCoach(true);
        break;
      case 'messages':
        setShowMessages(true);
        break;
      case 'dashboard':
        if (userType === 'employer') {
          setShowDashboard(true);
        }
        break;
      case 'verify':
        setShowVerify(true);
        break;
      case 'settings':
      case 'profile':
      case 'company':
        setExpandedCard(item.key);
        break;
      case 'upload-jobs':
        setShowAddJob(true);
        break;
      default:
        console.log(`${item.label} clicked`);
    }
  }, [navigate, userType]);

  // Handle add job submission
  const handleAddJobSubmit = (jobData: any) => {
    console.log('Job submitted:', jobData);
    // Here you would typically send the data to your backend
    alert('Job posted successfully!');
  };

  // Close expanded card
  const closeExpandedCard = () => {
    setExpandedCard(null);
  };

  // Logout logic
  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserType('candidate');
    navigate('/');
  };

  // Show landing page if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center relative">
        <GradientBackground animated={true} />
        <LandingPage 
          onAuthSuccess={handleAuthSuccess}
          onSignupSuccess={handleSignupSuccess}
        />
      </div>
    );
  }

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
          {/* User type indicator */}
          <motion.div
            className="mt-2 px-4 py-1 bg-white/10 rounded-full text-white/80 text-sm font-medium border border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {userType === 'employer' ? '🏢 Employer Mode' : '👤 Candidate Mode'}
          </motion.div>
          {/* Animated chevron and tooltip */}
          <div className="relative flex flex-col items-center mt-1">
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
            <span className="absolute top-7 left-1/2 -translate-x-1/2 text-xs text-white bg-black/70 px-3 py-1 rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 select-none" style={{whiteSpace:'nowrap'}}>
              Open menu
            </span>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <>
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
                      icon: getIconForMenuItem(item.key),
                      href: "#",
                      onClick: () => {
                        setMenuOpen(false);
                        handleCardAction(item);
                      }
                    })),
                    {
                      title: "Home",
                      icon: <IconHome className="w-9 h-9 text-purple-300 drop-shadow-lg" />,
                      href: "#",
                      onClick: () => {
                        setMenuOpen(false);
                        window.location.href = '/';
                      }
                    },
                    ...menuItems.slice(Math.floor(menuItems.length / 2)).map(item => ({
                      title: item.label,
                      icon: getIconForMenuItem(item.key),
                      href: "#",
                      onClick: () => {
                        setMenuOpen(false);
                        handleCardAction(item);
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

      {/* Card Stack Container - IMPROVED */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <DraggableCardContainer key={`container-${animationKey}`} className="relative">
          <AnimatePresence mode="popLayout">
            {menuItems.map((item, index) => {
              const position = stackPositions[index] || stackPositions[0];
              const isTopCard = index === 0;
              
              return (
                <motion.div
                  key={`${item.key}-${animationKey}-${index}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    zIndex: position.zIndex,
                  }}
                  initial={{
                    x: '-50%',
                    y: '-50%',
                    scale: position.scale,
                    rotate: position.rotate,
                    translateX: position.x,
                    translateY: position.y,
                    opacity: 1,
                  }}
                  animate={{
                    x: '-50%',
                    y: '-50%',
                    scale: position.scale,
                    rotate: position.rotate,
                    translateX: position.x,
                    translateY: position.y,
                    opacity: 1,
                  }}
                  exit={{
                    x: '-50%',
                    y: '-50%',
                    scale: 0.7,
                    rotate: (Math.random() - 0.5) * 40,
                    translateX: (Math.random() - 0.5) * 800,
                    translateY: -400,
                    opacity: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.4
                  }}
                >
                  <DraggableCardBody
                    onDismiss={isTopCard && !isAnimating ? handleCardDismiss : undefined}
                    dragDisabled={!isTopCard || isAnimating}
                    onTap={isTopCard && !isAnimating ? () => handleCardAction(item) : undefined}
                  >
                    <motion.div
                      className={`
                        rounded-2xl bg-gradient-to-br ${item.color}
                        shadow-2xl border border-white/20 backdrop-blur-xl
                        flex flex-col items-center justify-center p-8 text-center
                        ${isTopCard && !isAnimating ? 'cursor-pointer' : 'cursor-default'}
                      `}
                      style={{
                        width: CARD_WIDTH,
                        height: CARD_HEIGHT,
                      }}
                      whileHover={isTopCard && !isAnimating ? { scale: 1.02 } : {}}
                      whileTap={isTopCard && !isAnimating ? { scale: 0.98 } : {}}
                    >
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

      {/* Instructions - UPDATED */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-white/80 text-sm text-center">
            Swipe or tap the top card to navigate • <span className="text-purple-300">Infinite cycling enabled</span> • Mode: {userType === 'employer' ? 'Employer' : 'Candidate'}
          </p>
        </motion.div>
      </div>

      {/* Logout button */}
      <div className="absolute top-8 right-8 z-30">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Messages Overlay Modal */}
      {showMessages && (
        <MessagesOverlay onCollapse={() => setShowMessages(false)} />
      )}

      {/* Coach Overlay Modal */}
      {showCoach && (
        <CoachOverlay onCollapse={() => setShowCoach(false)} />
      )}

      {/* Dashboard Overlay Modal - Only for employers */}
      {showDashboard && userType === 'employer' && (
        <DashboardOverlay onCollapse={() => setShowDashboard(false)} />
      )}

      {/* Add Job Card - Only for employers */}
      {showAddJob && userType === 'employer' && (
        <AddJobCard
          onClose={() => setShowAddJob(false)}
          onSubmit={handleAddJobSubmit}
        />
      )}

      {/* Verify Card - For both user types */}
      {showVerify && (
        <StackStyleVerifyCard onClose={() => setShowVerify(false)} />
      )}

      {/* Stack Style Settings Card */}
      {expandedCard === 'settings' && (
        <StackStyleSettingsCard onClose={closeExpandedCard} />
      )}

      {/* Stack Style Profile Card - For candidates */}
      {expandedCard === 'profile' && userType === 'candidate' && (
        <StackStyleProfileCard
          userType="candidate"
          onClose={closeExpandedCard}
          onEdit={() => alert('Edit profile (to be implemented)')}
          name="Javi A. Torres"
          title="Software Engineer"
          imageUrl="https://randomuser.me/api/portraits/men/32.jpg"
          description="Passionate about building delightful UIs and robust web apps."
          skills={["React", "TypeScript", "Node.js"]}
          experience="5+ years"
          location="San Francisco, CA"
        />
      )}

      {/* Stack Style Company Card - For employers */}
      {expandedCard === 'company' && userType === 'employer' && (
        <StackStyleProfileCard
          userType="employer"
          onClose={closeExpandedCard}
          onEdit={() => alert('Edit company profile (to be implemented)')}
          companyName="Acme Corp"
          industry="Software"
          logoUrl="https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png"
          description="Building next-gen hiring experiences for teams."
          specialties={["AI Hiring", "Remote", "Tech"]}
          employees={120}
        />
      )}
    </div>
  );
}

// Helper function to get appropriate icons for menu items
function getIconForMenuItem(key: string): React.ReactNode {
  switch (key) {
    case 'candidates':
      return <IconUser className="w-6 h-6" />;
    case 'jobs':
      return <IconBriefcase className="w-6 h-6" />;
    case 'messages':
      return <IconMessageCircle className="w-6 h-6" />;
    case 'dashboard':
      return <IconChartBar className="w-6 h-6" />;
    case 'upload-jobs':
      return <IconPlus className="w-6 h-6" />;
    case 'verify':
      return <IconShield className="w-6 h-6" />;
    case 'company':
      return <IconBuilding className="w-6 h-6" />;
    case 'profile':
      return <IconUser className="w-6 h-6" />;
    case 'settings':
      return <IconSettings className="w-6 h-6" />;
    case 'coach':
      return <IconBrain className="w-6 h-6" />;
    default:
      return <IconUser className="w-6 h-6" />;
  }
}