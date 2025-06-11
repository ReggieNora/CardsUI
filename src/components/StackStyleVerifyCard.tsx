import React, { useState } from 'react';
import { AlgorandVerification } from './AlgorandVerification';

interface StackStyleVerifyCardProps {
  onClose: () => void;
}

const StackStyleVerifyCard: React.FC<StackStyleVerifyCardProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerification = () => {
    if (!email || !name) {
      setErrorMessage('Please enter both name and email');
      setVerificationStatus('error');
      return;
    }
    
    setVerificationStatus('loading');
    setErrorMessage('');
    
    // The AlgorandVerification component will handle the actual verification
    // We'll show it after basic validation passes
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

      {/* Verify Card - Matching Stack Card Style */}
      <div
        className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-2xl border border-white/20 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
        style={cardStyle}
      >
        {/* Glassmorphic overlay for depth */}
        <div className="absolute inset-0 bg-white/5 rounded-2xl" />
        
        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="text-4xl mb-3">✓</div>
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">Blockchain Verify</h2>
            <p className="text-white/80 text-sm mt-2">Secure verification with Algorand</p>
          </div>
          
          {verificationStatus === 'idle' || verificationStatus === 'error' ? (
            <div className="flex-1 space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 text-sm focus:outline-none focus:border-white/50"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 text-sm focus:outline-none focus:border-white/50"
                />
              </div>

              {/* Error Message */}
              {verificationStatus === 'error' && errorMessage && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-200 text-sm">{errorMessage}</p>
                </div>
              )}

              {/* Info Text */}
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/80 text-xs leading-relaxed">
                  Your information will be securely recorded on the Algorand blockchain for permanent verification.
                </p>
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerification}
                className="w-full py-3 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verify with Algorand
              </button>
            </div>
          ) : (
            <div className="flex-1">
              {/* Show the Algorand Verification Component */}
              <AlgorandVerification email={email} />
            </div>
          )}
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

export default StackStyleVerifyCard;