import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { DraggableCardContainer, DraggableCardBody } from "./ui/draggable-card";
import { Heart, X, Star, RotateCcw } from "lucide-react";
import backArrow from '../assets/back-arrow.svg';
import JobCard from "./JobCard";
import { useNavigate } from 'react-router-dom';

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

// Generate 6 job listings (reduced from 10)
const generateJobListings = () => [
  {
    company: "Google",
    title: "Senior Frontend Developer",
    location: "Mountain View, CA (Remote)",
    type: "Full-time",
    salary: "$140k - $180k",
    posted: "2 days ago",
    logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    requirements: [
      "5+ years of React experience",
      "Strong TypeScript skills",
      "Experience with large-scale applications",
      "Bachelor's degree in CS or related field"
    ],
    description: "Join our team to build the next generation of web applications. You'll work with cutting-edge technologies and collaborate with world-class engineers to create products that impact millions of users.",
    benefits: [
      "Competitive salary and equity",
      "Comprehensive health coverage",
      "Flexible work arrangements",
      "Professional development budget"
    ]
  },
  {
    company: "Meta",
    title: "Full Stack Engineer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130k - $190k",
    posted: "1 day ago",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png",
    requirements: [
      "4+ years of full stack development",
      "Experience with React and Node.js",
      "Strong system design skills",
      "Bachelor's degree in CS or related field"
    ],
    description: "Build and scale the next generation of social media platforms. Work on challenging problems that impact billions of users worldwide.",
    benefits: [
      "Competitive compensation",
      "Health and wellness benefits",
      "Remote work options",
      "Learning and development"
    ]
  },
  {
    company: "Microsoft",
    title: "Software Engineer",
    location: "Seattle, WA (Hybrid)",
    type: "Full-time",
    salary: "$110k - $170k",
    posted: "3 days ago",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2560px-Microsoft_logo.svg.png",
    requirements: [
      "3+ years of software development",
      "Experience with C# and .NET",
      "Cloud platform knowledge",
      "Bachelor's degree in CS or related field"
    ],
    description: "Join our team to build enterprise solutions that help businesses transform and grow in the digital age.",
    benefits: [
      "Competitive salary",
      "Health insurance",
      "401(k) matching",
      "Professional development"
    ]
  },
  {
    company: "Apple",
    title: "iOS Developer",
    location: "Cupertino, CA",
    type: "Full-time",
    salary: "$150k - $200k",
    posted: "4 days ago",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    requirements: [
      "5+ years iOS development",
      "Expert in Swift and Objective-C",
      "App Store published apps",
      "Strong UI/UX design sense"
    ],
    description: "Create innovative iOS applications that delight millions of users worldwide. Work with the latest Apple technologies and frameworks.",
    benefits: [
      "Stock options",
      "Health and dental coverage",
      "Employee discounts",
      "Sabbatical program"
    ]
  },
  {
    company: "Amazon",
    title: "Cloud Solutions Architect",
    location: "Seattle, WA (Remote)",
    type: "Full-time",
    salary: "$135k - $185k",
    posted: "5 days ago",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    requirements: [
      "AWS certifications preferred",
      "5+ years cloud architecture",
      "Strong communication skills",
      "Experience with microservices"
    ],
    description: "Design and implement scalable cloud solutions for enterprise clients. Lead technical discussions and drive architectural decisions.",
    benefits: [
      "Competitive base salary",
      "Annual bonus potential",
      "Career development programs",
      "Flexible work arrangements"
    ]
  },
  {
    company: "Netflix",
    title: "Data Scientist",
    location: "Los Gatos, CA",
    type: "Full-time",
    salary: "$145k - $195k",
    posted: "1 week ago",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    requirements: [
      "PhD in Statistics, Math, or CS",
      "Machine learning expertise",
      "Python and R proficiency",
      "Experience with big data tools"
    ],
    description: "Use data science to improve content recommendations and user experience for 200+ million subscribers worldwide.",
    benefits: [
      "Unlimited vacation policy",
      "Top-tier health benefits",
      "Stock options",
      "Learning stipend"
    ]
  }
];

// Generate 6 candidate profiles (reduced from 10)
const generateCandidateProfiles = () => [
  {
    avatarSrc: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Alex Johnson",
    title: "Senior Frontend Developer",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    experience: "8+ years",
    location: "San Francisco, CA",
    salary: "$150k - $180k",
    description: "Passionate software engineer with 8+ years of experience building scalable web applications. Expert in React ecosystem and modern JavaScript development.",
    resume: {
      experience: [
        {
          title: "Senior Frontend Developer",
          company: "TechCorp",
          duration: "2020 - Present",
          description: "Led development of core UI features, mentored junior developers, and improved application performance by 40%."
        },
        {
          title: "Frontend Developer",
          company: "StartupXYZ",
          duration: "2018 - 2020",
          description: "Built and maintained React components, implemented new features, and collaborated with design team."
        }
      ],
      education: {
        degree: "B.S. Computer Science",
        school: "Stanford University",
        duration: "2014 - 2018",
        honors: "Graduated with honors. Focus on Software Engineering and AI."
      }
    }
  },
  {
    avatarSrc: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Jordan Rivers",
    title: "Product Designer",
    skills: ["UX", "Sketch", "Figma", "Adobe XD"],
    experience: "6+ years",
    location: "New York, NY",
    salary: "$120k - $150k",
    description: "Creative product designer with a passion for user-centered design and innovative digital experiences.",
    resume: {
      experience: [
        {
          title: "Senior Product Designer",
          company: "DesignStudio",
          duration: "2019 - Present",
          description: "Led design for multiple product launches, conducted user research, and established design systems."
        },
        {
          title: "UX Designer",
          company: "CreativeAgency",
          duration: "2017 - 2019",
          description: "Designed user interfaces for web and mobile applications, created wireframes and prototypes."
        }
      ],
      education: {
        degree: "B.A. Graphic Design",
        school: "Art Institute",
        duration: "2013 - 2017",
        honors: "Magna Cum Laude. Focus on Digital Design and User Experience."
      }
    }
  },
  {
    avatarSrc: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Sam Chen",
    title: "Backend Engineer",
    skills: ["Node.js", "Python", "AWS", "MongoDB"],
    experience: "7+ years",
    location: "Austin, TX",
    salary: "$140k - $170k",
    description: "Experienced backend engineer specializing in scalable microservices and cloud architecture.",
    resume: {
      experience: [
        {
          title: "Senior Backend Engineer",
          company: "CloudTech",
          duration: "2018 - Present",
          description: "Architected and implemented microservices handling millions of requests daily."
        },
        {
          title: "Software Engineer",
          company: "DataCorp",
          duration: "2016 - 2018",
          description: "Developed APIs and database systems, optimized query performance."
        }
      ],
      education: {
        degree: "M.S. Computer Science",
        school: "University of Texas",
        duration: "2014 - 2016",
        honors: "Thesis on Distributed Systems. GPA: 3.9/4.0"
      }
    }
  },
  {
    avatarSrc: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Maya Patel",
    title: "Full Stack Developer",
    skills: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    experience: "5+ years",
    location: "Seattle, WA",
    salary: "$130k - $160k",
    description: "Versatile full-stack developer with expertise in modern web technologies and agile development practices.",
    resume: {
      experience: [
        {
          title: "Full Stack Developer",
          company: "WebSolutions",
          duration: "2019 - Present",
          description: "Built end-to-end web applications, managed database design, and implemented CI/CD pipelines."
        },
        {
          title: "Junior Developer",
          company: "TechStart",
          duration: "2018 - 2019",
          description: "Contributed to frontend and backend development, learned modern development practices."
        }
      ],
      education: {
        degree: "B.S. Software Engineering",
        school: "University of Washington",
        duration: "2014 - 2018",
        honors: "Dean's List. Capstone project on real-time collaboration tools."
      }
    }
  },
  {
    avatarSrc: "https://images.pexels.com/photos/2406949/pexels-photo-2406949.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Chris Taylor",
    title: "DevOps Engineer",
    skills: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
    experience: "6+ years",
    location: "Denver, CO",
    salary: "$135k - $165k",
    description: "DevOps specialist focused on automation, infrastructure as code, and reliable deployment pipelines.",
    resume: {
      experience: [
        {
          title: "Senior DevOps Engineer",
          company: "CloudOps",
          duration: "2020 - Present",
          description: "Managed Kubernetes clusters, implemented monitoring solutions, and reduced deployment time by 60%."
        },
        {
          title: "Systems Engineer",
          company: "InfraTech",
          duration: "2018 - 2020",
          description: "Automated infrastructure provisioning, maintained CI/CD pipelines, and improved system reliability."
        }
      ],
      education: {
        degree: "B.S. Information Technology",
        school: "Colorado State University",
        duration: "2014 - 2018",
        honors: "Summa Cum Laude. Focus on Systems Administration and Network Security."
      }
    }
  },
  {
    avatarSrc: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "Elena Rodriguez",
    title: "Data Scientist",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
    experience: "4+ years",
    location: "Boston, MA",
    salary: "$125k - $155k",
    description: "Data scientist passionate about extracting insights from complex datasets and building predictive models.",
    resume: {
      experience: [
        {
          title: "Data Scientist",
          company: "DataInsights",
          duration: "2020 - Present",
          description: "Developed machine learning models for customer segmentation and churn prediction."
        },
        {
          title: "Junior Data Analyst",
          company: "Analytics Pro",
          duration: "2019 - 2020",
          description: "Analyzed business metrics, created dashboards, and supported data-driven decision making."
        }
      ],
      education: {
        degree: "M.S. Data Science",
        school: "MIT",
        duration: "2017 - 2019",
        honors: "Thesis on Deep Learning Applications in Healthcare."
      }
    }
  }
];

export default function SwipeApp({ onCollapse, userType, candidateProfiles = [], jobListings = [] }: SwipeAppProps) {
  const navigate = useNavigate();
  
  // Track if the visually top card is expanded for drag lock
  const [isTopCardExpanded, setIsTopCardExpanded] = React.useState(false);

  // Use the appropriate data based on user type, fallback to generated data if props are empty
  let actualUserType = userType;
  if (!actualUserType) actualUserType = 'candidate'; // fallback if null
  
  const data = actualUserType === 'employer' 
    ? (candidateProfiles.length > 0 ? candidateProfiles : generateCandidateProfiles())
    : (jobListings.length > 0 ? jobListings : generateJobListings());

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
    setTimeout(() => {
      // Try to navigate back to cards first, fallback to calling onCollapse
      try {
        navigate('/app/cards');
      } catch (error) {
        // If navigation fails, use the onCollapse callback
        onCollapse();
      }
    }, 400);
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