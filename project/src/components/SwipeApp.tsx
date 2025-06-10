import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { DraggableCardContainer, DraggableCardBody } from "./ui/draggable-card";
import { Heart, X, Star, RotateCcw } from "lucide-react";
import backArrow from '../assets/back-arrow.svg';
import JobCard from "./JobCard";

interface SwipeAppProps {
  onCollapse: () => void;
  userType: 'candidate' | 'employer' | null;
  candidateProfiles?: any[];
  jobListings?: any[];
}

const CARD_WIDTH = 340;
const CARD_HEIGHT = 400;

function getRandomLayout(num: number) {
  const baseAngles = [-10, -5, 0, 5, 10, 15, -15];
  const baseXs = [-80, -40, 0, 40, 80, 120, -120];
  const baseYs = [30, 10, 0, 10, 30, 50, 50];
  return Array.from({ length: num }).map((_, i) => ({
    rotate: baseAngles[i % baseAngles.length] + (Math.random() - 0.5) * 8,
    x: baseXs[i % baseXs.length] + (Math.random() - 0.5) * 30,
    y: baseYs[i % baseYs.length] + (Math.random() - 0.5) * 20,
  }));
}


import { useNavigate } from 'react-router-dom';

export default function SwipeApp({ onCollapse, userType, candidateProfiles = [], jobListings = [] }: SwipeAppProps) {
  // Track if the visually top card is expanded for drag lock
  const [isTopCardExpanded, setIsTopCardExpanded] = React.useState(false);
  const navigate = useNavigate();

  // Use the appropriate data based on user type
  let actualUserType = userType;
  if (!actualUserType) actualUserType = 'candidate'; // fallback if null
  const data = actualUserType === 'employer' ? candidateProfiles : jobListings;

  const [stack, setStack] = useState(data);
  const [cardLayout, setCardLayout] = useState(() => getRandomLayout(data.length));
  const [expanded, setExpanded] = useState(true);
  const [justCollapsed, setJustCollapsed] = useState(false);
  const [forceCollapseIdx, setForceCollapseIdx] = useState<number|null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [interested, setInterested] = useState<typeof data>([]);
  const [rejected, setRejected] = useState<typeof data>([]);
  
  const [lastDismissed, setLastDismissed] = useState<{ item: typeof data[0], direction: 'left' | 'right' } | null>(null);
  
  // Create motion values for drag position
  const dragX = useMotionValue(0);
  
  // Transform the drag position into icon animations
  const leftIconScale = useTransform(dragX, [-150, 0], [1.5, 1]);
  const rightIconScale = useTransform(dragX, [0, 150], [1, 1.5]);
  const leftIconOpacity = useTransform(dragX, [-150, 0], [1, 0.3]);
  const rightIconOpacity = useTransform(dragX, [0, 150], [0.3, 1]);

  // Update stack when data changes (guard against unnecessary updates)
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setStack(data);
      setCardLayout(getRandomLayout(data.length));
      setInterested([]);
      setRejected([]);
      setResetKey(k => k + 1);
    }
  }, [JSON.stringify(data), actualUserType]);

  const handleDismiss = (idx: number, direction: 'left' | 'right') => {
    setForceCollapseIdx(idx);
    setTimeout(() => {
      setForceCollapseIdx(null);
      const item = stack[idx];
      setLastDismissed({ item, direction });
      if (direction === 'right') setInterested((prev) => [...prev, item]);
      if (direction === 'left') setRejected((prev) => [...prev, item]);
      setStack((prev) => prev.filter((_, i) => i !== idx));
      setCardLayout((prev) => prev.filter((_, i) => i !== idx));
      // Reset drag position
      dragX.set(0);
    }, 10); // Give JobCard a tick to collapse before removal
  };

  const handleRewind = () => {
    if (!lastDismissed) return;
    
    // Remove from the appropriate list
    if (lastDismissed.direction === 'right') {
      setInterested(prev => prev.filter(item => item !== lastDismissed.item));
    } else {
      setRejected(prev => prev.filter(item => item !== lastDismissed.item));
    }
    
    // Add back to the stack
    setStack(prev => [lastDismissed.item, ...prev]);
    setCardLayout(prev => [{ rotate: 0, x: 0, y: 0 }, ...prev]);
    setLastDismissed(null);
  };

  // Reset drag position when stack changes
  useEffect(() => {
    dragX.set(0);
  }, [stack]);

  const handleCollapse = () => {
    setExpanded(false);
    setJustCollapsed(true);
    setTimeout(() => setJustCollapsed(false), 300);
    setTimeout(onCollapse, 400);
  };

  const handleReset = () => {
    setStack(data);
    setCardLayout(getRandomLayout(data.length));
    setInterested([]);
    setRejected([]);
    setResetKey((k) => k + 1);
  };

  const renderJobCard = (job: any, idx: number, setIsExpandedState?: (expanded: boolean) => void) => (
    <JobCard job={job} justCollapsed={justCollapsed} forceCollapse={forceCollapseIdx === idx} setIsExpandedState={setIsExpandedState} />
  );

  const renderCandidateCard = (candidate: any, idx: number, setIsExpandedState?: (expanded: boolean) => void) => (
    <JobCard job={candidate} justCollapsed={justCollapsed} isCandidate forceCollapse={forceCollapseIdx === idx} setIsExpandedState={setIsExpandedState} />
  );

  return (
    <AnimatePresence>
      {expanded && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
        >
          

          {/* Detail Modal */}
          

          <div className="absolute top-8 right-8 flex gap-2">
            {lastDismissed && (
              <motion.button
                onClick={handleRewind}
                className="px-4 py-2 rounded-xl bg-white/20 text-white font-semibold shadow hover:bg-white/30 transition flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-5 h-5" />
                Rewind
              </motion.button>
            )}
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-white/20 text-white font-semibold shadow hover:bg-white/30 transition"
            >
              Reset
            </button>
            <button
               onClick={handleCollapse}
               className="p-2 rounded-full bg-white/20 shadow-lg hover:bg-white/30 transition border border-white/30 backdrop-blur-md flex items-center justify-center"
               aria-label="Back"
             >
               <img src={backArrow} alt="Back" className="w-7 h-7" />
             </button>
          </div>
          <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center">
            {/* Animated Swipe Direction Indicators */}
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="text-red-500"
                style={{
                  scale: leftIconScale,
                  opacity: leftIconOpacity,
                }}
              >
                <X className="w-12 h-12" />
              </motion.div>
              <motion.span
                className="text-sm font-medium text-white"
                style={{ opacity: leftIconOpacity }}
              >
                {userType === 'employer' ? 'Pass' : 'Not Interested'}
              </motion.span>
            </motion.div>

            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="text-green-500"
                style={{
                  scale: rightIconScale,
                  opacity: rightIconOpacity,
                }}
              >
                <Heart className="w-12 h-12" />
              </motion.div>
              <motion.span
                className="text-sm font-medium text-white"
                style={{ opacity: rightIconOpacity }}
              >
                {userType === 'employer' ? 'Interested' : 'Interested'}
              </motion.span>
            </motion.div>

            {stack.length > 0 ? (
              <DraggableCardContainer key={resetKey} className="relative w-[340px] h-[400px]">
                <AnimatePresence>
                  {(() => {
                    const reversedStack = [...stack].reverse();
                    const topIdx = reversedStack.length - 1;
                    return reversedStack.map((item, index) => {
                      const layout = index === stack.length - 1
                        ? { rotate: 0, x: 0, y: 0 }
                        : cardLayout[index] || { rotate: 0, x: 0, y: 0 };
                      const realIdx = stack.length - 1 - index;
                      const isTop = index === topIdx;
                      return (
                        <DraggableCardBody
                          key={(item.company || item.name) + index}
                          className="absolute left-1/2 top-1/2"
                          onDismiss={(direction) => handleDismiss(realIdx, direction)}
                          onDrag={(x) => dragX.set(x)}
                          dragDisabled={isTop ? isTopCardExpanded : false}
                        >
                          <div
                            style={{
                              width: CARD_WIDTH,
                              height: CARD_HEIGHT,
                              transform: `translate(-50%, -50%) translate(${layout.x}px, ${layout.y}px) rotate(${layout.rotate}deg)`
                            }}
                          >
                            {userType === 'employer' ? renderCandidateCard(item, realIdx, isTop ? setIsTopCardExpanded : undefined) : renderJobCard(item, realIdx, isTop ? setIsTopCardExpanded : undefined)}
                          </div>
                        </DraggableCardBody>
                      );
                    });
                  })()}

                </AnimatePresence>
              </DraggableCardContainer>
            ) : (
              <motion.div
                className="bg-white/90 rounded-2xl shadow-xl p-10 flex flex-col items-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {userType === 'employer' ? 'No more candidates' : 'No more matches'}
                </h2>
                <p className="text-gray-600">Check back later for new opportunities!</p>
                <button
                  onClick={() => navigate('/app/cards')}
                  className="mt-6 px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow hover:from-pink-600 hover:to-purple-600 transition"
                >
                  Back to Menu
                </button>
                <div className="mt-6 text-center">
                  <div className="text-green-600 font-semibold">Interested: {interested.length}</div>
                  <div className="text-red-600 font-semibold">
                    {userType === 'employer' ? 'Passed: ' : 'Rejected: '}{rejected.length}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}