import React from 'react';
import GradientText from './GradientText';
import { ArrowLeft } from 'lucide-react';

const zenLines = [
  'Clarity over clutter.',
  'A candidate should be understood at a glance, not deciphered.',
  '',
  'Design respects time.',
  'Decisions happen in moments. Our UI honors that.',
  '',
  'Cards, not chaos.',
  'One profile, one thought, one chance to connect.',
  '',
  'No feed. No noise.',
  'Focused navigation keeps your mind on the match.',
  '',
  'Swipe with purpose.',
  'Every action — pass, save, or like — means something.',
  '',
  "Beauty isn't extra.",
  'It builds trust and helps people feel seen.',
  '',
  'Uniformity is comfort.',
  'Every card is equal. Every profile is centered.',
  '',
  'Profiles are people.',
  'We frame the human behind the headline.',
  '',
  "Hirly isn't fast.",
  "It's intentional. That's the difference."
];

const AboutPage: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Optionally, reuse Waves or a similar background here if desired */}
      </div>
      <div className="w-full max-w-2xl mx-auto mt-16 relative z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-8 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition shadow-lg backdrop-blur-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <div className="relative bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/30 shadow-2xl p-12 flex flex-col items-center overflow-hidden" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 8px 0 rgba(255,255,255,0.10) inset'}}>
          {/* Frosted glass gradient overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{background: 'linear-gradient(120deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)', zIndex: 1, boxShadow: '0 0 0 2px rgba(255,255,255,0.18)'}} />
          <GradientText
            colors={["#6a11cb", "#2575fc", "#3a1859", "#6a11cb", "#1e215d"]}
            animationSpeed={8}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-center mb-8 relative z-10"
          >
            <span role="img" aria-label="zen" className="mr-2">🧘‍♂️</span> The Zen of Hirly
          </GradientText>
          <div className="space-y-4 text-lg md:text-xl text-white/90 text-center font-medium max-w-xl relative z-10">
            {zenLines.map((line, i) =>
              line ? <div key={i}>{line}</div> : <div key={i} className="h-2" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 