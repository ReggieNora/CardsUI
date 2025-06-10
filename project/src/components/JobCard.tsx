import React, { useState, useEffect } from 'react';
import { MapPin, Clock, DollarSign, ChevronRight, Users, Globe, Award, Heart } from 'lucide-react';
import VerifiedBadge from './VerifiedBadge';

interface CandidateExperience {
  title: string;
  company: string;
  duration: string;
  description: string;
}
interface CandidateEducation {
  degree: string;
  school: string;
  duration: string;
  honors?: string;
}
// Updated JobCardProps to allow nested resume for candidates
interface JobCardProps {
  job: {
    // Job fields
    company?: string;
    title?: string;
    location?: string;
    type?: string;
    salary?: string;
    posted?: string;
    logo?: string;
    requirements?: string[];
    description?: string;
    benefits?: string[];
    // Candidate fields
    avatarSrc?: string;
    name?: string;
    skills?: string[];
    experience?: string | CandidateExperience[];
    education?: CandidateEducation;
    // Resume (for candidates)
    resume?: {
      experience?: CandidateExperience[];
      education?: CandidateEducation;
    };
  };
  justCollapsed?: boolean;
  isCandidate?: boolean;
  forceCollapse?: boolean;
  setIsExpandedState?: (expanded: boolean) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, justCollapsed = false, isCandidate = false, forceCollapse = false, setIsExpandedState }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  // Notify parent of expanded state changes
  useEffect(() => {
    if (setIsExpandedState) setIsExpandedState(isExpanded);
  }, [isExpanded, setIsExpandedState]);

  // Collapse card if user clicks/taps outside when expanded
  React.useEffect(() => {
    if (!isExpanded) return;
    function handleOutside(e: MouseEvent | TouchEvent) {
      // Only collapse if click is outside this card
      if (!(e.target instanceof Node)) return;
      const card = document.getElementById(`job-card-root-${job.title || job.name}`);
      if (card && !card.contains(e.target)) {
        setIsExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleOutside as EventListener);
    document.addEventListener('touchstart', handleOutside as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleOutside as EventListener);
      document.removeEventListener('touchstart', handleOutside as EventListener);
    };
  }, [isExpanded, job.title, job.name]);

  useEffect(() => {
    if (justCollapsed) {
      setCooldown(true);
      setTimeout(() => setCooldown(false), 300);
    }
  }, [justCollapsed]);

  // Collapse immediately when forceCollapse is true
  useEffect(() => {
    if (forceCollapse) setIsExpanded(false);
  }, [forceCollapse]);

  // Prevent expansion if justCollapsed is true or cooldown is active
  const handleExpand = () => {
    if (justCollapsed || cooldown) return;
    setIsExpanded((prev) => !prev);
  };

  // For candidate rendering, adjust fields
  const displayName = isCandidate ? job.name : job.company;
  const displayTitle = isCandidate ? job.title : job.title;
  const displayAvatar = isCandidate ? job.avatarSrc : job.logo;
  const displayLocation = isCandidate ? job.location : job.location;
  const displayType = isCandidate ? job.experience : job.type;
  const displaySalary = job.salary;
  const displayPosted = job.posted;

  return (
    <div 
      id={`job-card-root-${job.title || job.name}`}
      className={`
        relative w-[350px] rounded-2xl overflow-hidden
        shadow-xl shadow-black/20
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'h-[600px]' : 'h-[480px]'}
      `}
      style={{
        // Randomize match value for demo (will persist per render)
        ...(function() {
          // Use a stable random value per card (based on title/name)
          let seed = 0;
          const str = job.title || job.name || '';
          for (let i = 0; i <str.length; i++) seed += str.charCodeAt(i);
          // Force Microsoft card to be a bad match
          let matchValue = job.company === 'Microsoft' ? 55 : 50 + Math.floor(50 * Math.abs(Math.sin(seed)));
          let matchColor = 'rgba(34,197,94,0.25)'; // green-500/25
          if (matchValue < 60) matchColor = 'rgba(239,68,68,0.25)'; // red-500/25
          else if (matchValue < 80) matchColor = 'rgba(250,204,21,0.25)'; // yellow-400/25
          return {
            background: `${matchColor}`,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.2)',
          };
        })()
      }}
    >
      {/* Company Logo */}
      <div className="absolute top-6 left-6 w-16 h-16 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden">
        <img 
          src={displayAvatar} 
          alt={`${displayName} logo`}
          className="w-full h-full object-contain p-2"
        />
      </div>

      {/* Match Indicator */}
      <div className="absolute top-6 right-6 flex flex-col items-end">
        {/* Dummy match value for now: 82% Good Match */}
        {/* In real use, replace matchValue and matchLabel with actual logic */}
        {(() => {
          // Use the same random match value as the card background
          let seed = 0;
          const str = job.title || job.name || '';
          for (let i = 0; i < str.length; i++) seed += str.charCodeAt(i);
          // Force Microsoft card to be a bad match
          let matchValue = job.company === 'Microsoft' ? 55 : 50 + Math.floor(50 * Math.abs(Math.sin(seed)));
          let matchColor = 'bg-green-500';
          let matchLabel = 'Good Match';
          if (matchValue < 60) {
            matchColor = 'bg-red-500';
            matchLabel = 'Bad Match';
          } else if (matchValue < 80) {
            matchColor = 'bg-yellow-400';
            matchLabel = 'Okay Match';
          }
          return (
            <div className="flex flex-col items-end">
              <div className={`w-8 h-8 rounded-full ${matchColor} flex items-center justify-center text-white font-bold text-sm mb-1`}>
                {matchValue}%
              </div>
              <span className="text-xs font-semibold text-white/80">{matchLabel}</span>
            </div>
          );
        })()}
      </div>

      {/* Main Content */}
      <div className={`
        absolute top-32 left-0 right-0 p-6
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'opacity-0 translate-y-[-20px]' : 'opacity-100 translate-y-0'}
      `}>
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          {displayTitle}
          {!isCandidate && <VerifiedBadge className="w-6 h-6 ml-2" />}
        </h2>
        <h3 className="text-xl text-white/80 mb-4 flex items-center">
          {displayName}
          {isCandidate && <VerifiedBadge className="w-6 h-6 ml-2" />}
        </h3>

        <div className="space-y-3">
          <div className="flex items-center text-white/60">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{displayLocation}</span>
          </div>
          <div className="flex items-center text-white/60">
            <Clock className="w-4 h-4 mr-2" />
            <span>{displayType}</span>
          </div>
          <div className="flex items-center text-white/60">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>{displaySalary}</span>
          </div>
        </div>
      </div>

      {/* Show More Button */}
      <div className="absolute bottom-6 left-0 right-0 px-6 z-10">
        <button 
          onClick={handleExpand}
          className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 
                   text-white/80 hover:text-white rounded-xl
                   transition-all duration-200 flex items-center justify-center"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
          <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Expanded Content */}
      <div className={`
        absolute top-0 left-0 right-0 p-6
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px] pointer-events-none'}
      `}>
        <div className="mt-32 h-[calc(600px-8rem)] overflow-y-auto scrollbar-hide">
          {isCandidate ? (
            // Candidate Resume Details
            <>
              <h2 className="text-2xl font-bold text-white mb-2">{job.name}</h2>
              <h3 className="text-xl text-white/80 mb-4">{job.title}</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-white/60">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{job.location}</span>
                </div>
                {/* Experience Section */}
                {(() => {
                  // Prefer resume.experience if present
                  const experienceArr = job.resume?.experience || job.experience;
                  if (Array.isArray(experienceArr) && experienceArr.length > 0) {
                    return (
                      <div className="mb-4">
                        <h4 className="text-white/80 font-medium mb-2">Experience</h4>
                        <div className="space-y-2">
                          {(experienceArr as CandidateExperience[]).map((exp: CandidateExperience, idx: number) => (
                            <div key={idx} className="bg-white/5 rounded-lg p-3">
                              <div className="font-semibold text-white">{exp.title}</div>
                              <div className="text-xs text-white/60 mb-1">{exp.company}</div>
                              <div className="text-xs text-white/60 mb-1">{exp.duration}</div>
                              <div className="text-xs text-white/80">{exp.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })()}
                {/* Education Section (if present) */}
                {(job.resume?.education || job.education) && (
                  <div className="mb-4">
                    <h4 className="text-white/80 font-medium mb-2">Education</h4>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="font-semibold text-white">{(job.resume?.education || job.education)?.degree ?? ''}</div>
                      <div className="text-xs text-white/60 mb-1">{(job.resume?.education || job.education)?.school ?? ''}</div>
                      <div className="text-xs text-white/60 mb-1">{(job.resume?.education || job.education)?.duration ?? ''}</div>
                      {(job.resume?.education || job.education)?.honors && <div className="text-xs text-white/80">{(job.resume?.education || job.education)?.honors}</div>}
                    </div>
                  </div>
                )}
                {/* Skills Section */}
                {job.skills && job.skills.length > 0 && (
                  <div className="flex items-center text-white/60 flex-wrap gap-2">
                    <span className="font-semibold mr-2">Skills:</span>
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className="bg-white/10 px-2 py-1 rounded text-xs text-white/80">{skill}</span>
                    ))}
                  </div>
                )}
                {/* Fallback if no resume details */}
                {(!Array.isArray(job.resume?.experience || job.experience) || (job.resume?.experience || job.experience)?.length === 0)
                  && !(job.resume?.education || job.education)
                  && (!job.skills || job.skills.length === 0) && (
                  <div className="text-white/60 text-sm">No resume details available.</div>
                )}
              </div>
            </>
          ) : (
            // Job Details
            <>
              <h2 className="text-2xl font-bold text-white mb-2">{job.title}</h2>
              <h3 className="text-xl text-white/80 mb-4">{job.company}</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-white/60">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-white/60">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center text-white/60">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>{job.salary}</span>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-white/80 font-medium mb-2">Requirements</h4>
                <ul className="text-white/60 text-sm space-y-1">
                  {(job.requirements || []).map((req, index) => (
                    <li key={index}>• {req}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="text-white/80 font-medium mb-2">About the Role</h4>
                <p className="text-white/60 text-sm">
                  {job.description}
                </p>
              </div>
              <div className="mb-4">
                <h4 className="text-white/80 font-medium mb-2">Benefits</h4>
                <ul className="text-white/60 text-sm space-y-1">
                  {(job.benefits || []).map((benefit, index) => (
                    <li key={index}>• {benefit}</li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-white/60">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">Team Size: 10-15</span>
                </div>
                <div className="flex items-center text-white/60">
                  <Globe className="w-4 h-4 mr-2" />
                  <span className="text-sm">Remote Friendly</span>
                </div>
                <div className="flex items-center text-white/60">
                  <Award className="w-4 h-4 mr-2" />
                  <span className="text-sm">Career Growth</span>
                </div>
                <div className="flex items-center text-white/60">
                  <Heart className="w-4 h-4 mr-2" />
                  <span className="text-sm">Great Culture</span>
                </div>
              </div>
              <div className="text-white/60 text-sm mb-6">
                <p>• Flexible working hours</p>
                <p>• Regular team events</p>
                <p>• Learning & development budget</p>
                <p>• Health & wellness programs</p>
              </div>
            </>
          )}
          {/* Extra padding at bottom for better scrolling */}
          <div className="h-24"></div>
        </div>
      </div>
    </div>
  );
};

export default JobCard; 