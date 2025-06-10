import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DraggableCardBody } from './ui/draggable-card';

interface LandingPageCardProps {
  id: string;
  icon: string;
  title: string;
  text: string;
  onDismiss: (id: string, direction: 'left' | 'right') => void;
  layout: {
    rotate: number;
    x: number;
    y: number;
  };
}

const LandingPageCard: React.FC<LandingPageCardProps> = ({
  id,
  icon,
  title,
  text,
  onDismiss,
  layout,
}) => {
  return (
    <AnimatePresence>
      <DraggableCardBody
        key={id}
        className="absolute left-1/2 top-1/2"
        onDismiss={(direction) => onDismiss(id, direction)}
      >
        <motion.div
          style={{
            width: 340,
            height: 400,
            transform: `translate(-50%, -50%) translate(${layout.x}px, ${layout.y}px) rotate(${layout.rotate}deg)`,
          }}
          className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl flex flex-col items-center justify-between overflow-hidden"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ 
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.3 }
          }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full p-6">
            <span className="text-5xl mb-4 select-none" aria-hidden>{icon}</span>
            <h2 className="text-2xl font-bold text-white mb-3 text-center">{title}</h2>
            {text && (
              <p className="text-white/90 text-center whitespace-pre-line text-lg">{text}</p>
            )}
          </div>
        </motion.div>
      </DraggableCardBody>
    </AnimatePresence>
  );
};

export default LandingPageCard;