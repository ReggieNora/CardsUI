import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SettingsCard from './SettingsCard';
import backArrow from '../assets/back-arrow.svg';

interface SettingsOverlayProps {
  onCollapse: () => void;
}

export default function SettingsOverlay({ onCollapse }: SettingsOverlayProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute top-8 right-8 z-10">
          <button
            onClick={onCollapse}
            className="p-2 rounded-full bg-black/30 border border-white/30 shadow flex items-center justify-center hover:bg-white/20 transition"
            aria-label="Back"
          >
            <img src={backArrow} alt="Back" className="w-5 h-5" />
          </button>
        </div>
        
        <div className="w-full max-w-4xl mx-auto flex items-center justify-center">
          <SettingsCard forceExpanded={true} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}