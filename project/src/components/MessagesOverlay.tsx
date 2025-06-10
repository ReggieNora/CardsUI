import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessagesCard from './MessagesCard';
import backArrow from '../assets/back-arrow.svg';

interface MessagesOverlayProps {
  onCollapse: () => void;
}

export default function MessagesOverlay({ onCollapse }: MessagesOverlayProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Back Button always on top */}
        <div className="absolute top-8 right-8 z-60" style={{ zIndex: 60 }}>
          <button
            onClick={onCollapse}
            className="p-2 rounded-full bg-white/20 shadow-lg hover:bg-white/30 transition border border-white/30 backdrop-blur-md flex items-center justify-center"
            aria-label="Back"
          >
            <img src={backArrow} alt="Back" className="w-7 h-7" />
          </button>
        </div>
        {/* Glass/modal content */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-lg z-50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full max-w-4xl mx-auto">
            <MessagesCard onViewProfile={() => console.log('View profile clicked')} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}