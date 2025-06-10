import React from 'react';

interface GradientBackgroundProps {
  className?: string;
  animated?: boolean;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ 
  className = '', 
  animated = true 
}) => {
  return (
    <div 
      className={`fixed inset-0 -z-10 ${className}`}
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 58, 237, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(46, 16, 101, 0.2) 0%, transparent 50%),
          linear-gradient(135deg, 
            rgba(0, 0, 0, 1) 0%, 
            rgba(46, 16, 101, 0.8) 25%, 
            rgba(120, 58, 237, 0.6) 50%, 
            rgba(0, 0, 0, 0.9) 75%, 
            rgba(0, 0, 0, 1) 100%
          )
        `,
        backgroundSize: '400% 400%',
        animation: animated ? 'gradientShift 15s ease infinite' : 'none',
      }}
    >
      {/* Animated gradient overlay for extra depth */}
      {animated && (
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 60% 30%, rgba(147, 51, 234, 0.4) 0%, transparent 60%),
              radial-gradient(circle at 30% 70%, rgba(219, 39, 119, 0.3) 0%, transparent 60%)
            `,
            backgroundSize: '300% 300%',
            animation: 'gradientShift 20s ease infinite reverse',
          }}
        />
      )}
      
      {/* Subtle noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default GradientBackground;