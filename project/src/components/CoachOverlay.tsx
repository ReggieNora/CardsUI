import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AIPrompt from './AIPrompt';
import backArrow from '../assets/back-arrow.svg';
import Orb from './Orb';

interface CoachOverlayProps {
  onCollapse: () => void;
}

export default function CoachOverlay({ onCollapse }: CoachOverlayProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
      >
        {/* Orb Background - Full Screen */}
        <div className="absolute inset-0 z-0">
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
        </div>

        {/* Close Button */}
        <div className="absolute top-2 right-2 md:top-8 md:right-8 z-20">
          <button
            onClick={onCollapse}
            className="p-2 rounded-full bg-black/30 border border-white/30 shadow flex items-center justify-center hover:bg-white/20 transition"
            aria-label="Back"
          >
            <img src={backArrow} alt="Back" className="w-5 h-5" />
          </button>
        </div>
        
        {/* Scrollable Container */}
        <div className="w-full h-full flex items-center justify-center relative z-10 p-4 md:p-8">
          <div 
            className="w-full max-w-full h-auto max-h-full flex items-center justify-center overflow-y-auto"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* Internet Explorer 10+ */
            }}
          >
            {/* Hide scrollbar for WebKit browsers */}
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {/* Coach Card Content */}
            <div className="w-full max-w-[95vw] md:max-w-2xl max-h-[90vh] flex items-center justify-center">
              <div className="w-full">
                <AIPrompt />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}