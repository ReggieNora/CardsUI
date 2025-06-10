import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './Dashboard';
import { X } from 'lucide-react';

interface DashboardOverlayProps {
  onCollapse: () => void;
}

export default function DashboardOverlay({ onCollapse }: DashboardOverlayProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
      >
        <div className="fixed top-8 right-8 z-[9999]">
          <button
            onClick={onCollapse}
            className="px-4 py-2 rounded-xl bg-white/20 text-white font-semibold shadow hover:bg-white/30 transition flex items-center gap-2"
            style={{ zIndex: 99999 }}
          >
            <X className="w-5 h-5" />
            Close
          </button>
        </div>
        
        <div className="w-full max-w-4xl mx-auto">
          <Dashboard />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}