import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LampBackground } from './ui/LampBackground';
import { motion, AnimatePresence } from 'framer-motion';
import BlurText from './BlurText';
import StarBorder from './StarBorder';
import AuthModal from './AuthModal';

interface LandingPageProps {
  onAuthSuccess: (userType: 'candidate' | 'employer') => void;
  onSignupSuccess?: (userType: 'candidate' | 'employer') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAuthSuccess, onSignupSuccess }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className={showAuthModal ? 'filter blur-sm pointer-events-none' : ''}>
        <LampBackground />
        
        {/* Always Visible Navbar */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
          className="fixed top-0 left-0 right-0 z-40"
        >
          <div className="flex justify-center items-center px-12 py-6">
            <motion.div 
              className="flex items-center gap-8 bg-black/50 backdrop-blur-xl px-8 py-3 rounded-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link 
                to="/about" 
                className="text-white/70 hover:text-white transition-colors duration-300 font-medium"
              >
                About
              </Link>
              <Link 
                to="/pricing" 
                className="text-white/70 hover:text-white transition-colors duration-300 font-medium"
              >
                Pricing
              </Link>
              <motion.button 
                onClick={() => { setAuthAction('signin'); setShowAuthModal(true); }}
                className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </motion.div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-[8rem] md:text-[12rem] font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/30 mt-24"
            >
              Hirly
            </motion.h1>
            <BlurText
              text="Hiring, redefined."
              animateBy="words"
              direction="top"
              className="text-xl text-white/50 text-center mt-8"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-12"
            >
              <StarBorder
                as="button"
                color="rgb(147, 51, 234)"
                speed="5s"
                onClick={() => { setAuthAction('signup'); setShowAuthModal(true); }}
              >
                Get Started
              </StarBorder>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onAuthSuccess={onAuthSuccess}
          onClose={() => setShowAuthModal(false)}
          initialAuthAction={authAction}
          onSignupSuccess={onSignupSuccess}
        />
      )}
    </div>
  );
};

export default LandingPage;