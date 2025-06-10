import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AuthForm from './AuthForm';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  onAuthSuccess: (userType: 'candidate' | 'employer') => void;
  onClose: () => void;
  initialAuthAction?: 'signin' | 'signup';
  onSignupSuccess?: (userType: 'candidate' | 'employer') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onAuthSuccess, onClose, initialAuthAction = 'signin', onSignupSuccess }) => {
  const [userType, setUserType] = useState<'candidate' | 'employer'>('candidate');
  const [authAction, setAuthAction] = useState<'signin' | 'signup'>(initialAuthAction);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  // Helper to handle navigation after auth
  const handleAuthSuccessAndRedirect = (type: 'candidate' | 'employer') => {
    if (onAuthSuccess) onAuthSuccess(type);
    navigate('/app/cards', { state: { userType: type } });
  };

  // Helper to handle navigation after signup
  const handleSignupSuccessAndRedirect = (type: 'candidate' | 'employer') => {
    if (onSignupSuccess) onSignupSuccess(type);
    navigate('/app/cards', { state: { userType: type } });
  };

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before calling onClose
    setTimeout(onClose, 400);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="relative w-full max-w-lg mx-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ 
            scale: isClosing ? 0.9 : 1,
            y: isClosing ? 20 : 0,
            opacity: isClosing ? 0 : 1
          }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/20 hover:backdrop-blur-none transition-all duration-300 text-white/80 hover:text-white backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <AuthForm
            onAuthSuccess={handleAuthSuccessAndRedirect}
            authAction={authAction}
            userType={userType}
            onUserTypeChange={setUserType}
            onToggleAuthAction={() =>
              setAuthAction((current) => (current === 'signin' ? 'signup' : 'signin'))
            }
            onSignupSuccess={handleSignupSuccessAndRedirect}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;