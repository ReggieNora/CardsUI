import React, { useState, useRef, useEffect, Suspense, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Users, MessageSquare, BarChart2, Settings, Briefcase, Building2 } from 'lucide-react';

import MessagesCard from "./components/MessagesCard";
import ProfileCardParent from "./components/ProfileCardParent";

import HamburgerMenu from './components/HamburgerMenu';
import SettingsCard from './components/SettingsCard';
import ActionButtons from './components/ActionButtons';
import Dashboard from './components/Dashboard';
import CoachCard from './components/CoachCard';
import SimpleCompanyProfileCard from './components/SimpleCompanyProfileCard';
import LandingPage from './components/LandingPage';
import JobCard from './components/JobCard';
import AboutPage from './components/AboutPage';

import GradientBackground from './components/GradientBackground';
import ErrorBoundary from './components/ErrorBoundary';
const CompleteProfileModal = React.lazy(() => import('./components/CompleteProfileModal')); // Lazy load for isolation
const WelcomeModal = React.lazy(() => import('./components/WelcomeModal')); // Lazy load for welcome

function App() {
  // --- First-time user modal state ---
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [signupUserType, setSignupUserType] = useState<'candidate' | 'employer' | null>(null);
  // Welcome modal state
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [welcomeName, setWelcomeName] = useState<string>('');

  // --- CompleteProfileModal handlers (must be defined at top level to avoid hook order bugs) ---
  const handleCompleteProfileModalComplete = useCallback(({ name, resumeFile }) => {
    localStorage.setItem('profileName', name);
    if (resumeFile) {
      localStorage.setItem('profileResume', resumeFile.name);
    }
    setShowCompleteProfile(false);
    setWelcomeName(name);
    setShowWelcomeModal(true);
  }, []);

  const handleCompleteProfileModalClose = useCallback(() => setShowCompleteProfile(false), []);


  // Move ALL hooks to the top (including overlay/modal states and lazy imports)
  const [selectedRole, setSelectedRole] = useState<'candidate' | 'employer' | null>(null);
  const [userType, setUserType] = useState<'candidate' | 'employer' | null>(() => {
  const storedType = localStorage.getItem('userType');
  return storedType === 'candidate' || storedType === 'employer' ? storedType : null;
});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<typeof candidateProfiles>([]);
  const [interestedCandidates, setInterestedCandidates] = useState<typeof candidateProfiles>([]);
  const [savedJobs, setSavedJobs] = useState<typeof jobListings>([]);
  const [appliedJobs, setAppliedJobs] = useState<typeof jobListings>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
  return localStorage.getItem('isAuthenticated') === 'true';
});

  const [swipeOpen, setSwipeOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [coachOpen, setCoachOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  // Function to close all overlays
  const closeAllOverlays = () => {
    setSwipeOpen(false);
    setMessagesOpen(false);
    setProfileOpen(false);
    setSettingsOpen(false);
    setCoachOpen(false);
    setDashboardOpen(false);
  };
  // Lazy load overlays
  const SwipeApp = React.lazy(() => import('./components/SwipeApp'));
  const MessagesOverlay = React.lazy(() => import('./components/MessagesOverlay'));
  const SettingsOverlay = React.lazy(() => import('./components/SettingsOverlay'));
  const CoachOverlay = React.lazy(() => import('./components/CoachOverlay'));
  const DashboardOverlay = React.lazy(() => import('./components/DashboardOverlay'));
  const overlayFallback = <div className="w-full h-full flex items-center justify-center text-white text-lg">Loading...</div>;

  // Job listings data for candidates
  const jobListings = [

    {
      company: "Google",
      title: "Senior Frontend Developer",
      location: "Mountain View, CA (Remote)",
      type: "Full-time",
      salary: "$120k - $180k",
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
    }
  ];

  // Candidate profiles data for employers
  const candidateProfiles = [
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
    }
  ];

  // Sample messages data
  const messagesData = [
    {
      id: '1',
      avatarSrc: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Sarah Miller",
      preview: "Hey, I checked out your latest design...",
      timestamp: "2m ago"
    },
    {
      id: '2',
      avatarSrc: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "David Chen",
      preview: "The project looks great! When can we...",
      timestamp: "1h ago"
    },
    {
      id: '3',
      avatarSrc: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Emma Wilson",
      preview: "Thanks for the feedback on the...",
      timestamp: "3h ago"
    },
    {
      id: '4',
      avatarSrc: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Michael Brown",
      preview: "Let's schedule a call to discuss...",
      timestamp: "5h ago"
    }
  ];

  const handleSwipeStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleSwipeMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    
    if (Math.abs(diff) > 50) {
      setSwipeDirection(diff > 0 ? 'right' : 'left');
    }
  };

  const handleSwipeEnd = () => {
    if (swipeDirection === 'left') {
      handleNext();
    } else if (swipeDirection === 'right') {
      handlePrevious();
    }
    setSwipeDirection(null);
    touchStartX.current = null;
  };

  const handleNextCandidate = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentCandidateIndex((prev) => 
        prev === candidateProfiles.length - 1 ? 0 : prev + 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const handleCandidateAction = (action: 'pass' | 'save' | 'like') => {
    const currentCandidate = candidateProfiles[currentCandidateIndex];
    
    if (action === 'save') {
      setSavedCandidates(prev => [...prev, currentCandidate]);
    } else if (action === 'like') {
      setInterestedCandidates(prev => [...prev, currentCandidate]);
    }
    
    handleNextCandidate();
  };

  const handleJobAction = (action: 'pass' | 'save' | 'like') => {
    const currentJob = jobListings[currentJobIndex];
    
    if (action === 'like') {
      setAppliedJobs(prev => [...prev, currentJob]);
    } else if (action === 'save') {
      setSavedJobs(prev => [...prev, currentJob]);
    }
    
    // Move to next job
    setCurrentJobIndex(prev => 
      prev === jobListings.length - 1 ? 0 : prev + 1
    );
  };

  const menuItems = selectedRole === 'employer' ? [
    { icon: <Users className="w-5 h-5" />, label: 'Candidates', index: 0, overlay: 'candidates' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages', index: 1, overlay: 'messages' },
    { icon: <BarChart2 className="w-5 h-5" />, label: 'Dashboard', index: 2, overlay: 'dashboard' },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Coach', index: 3, overlay: 'coach' },
    { icon: <Building2 className="w-5 h-5" />, label: 'Profile', index: 4, overlay: 'profile' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', index: 5, overlay: 'settings' },
  ] : [
    { icon: <Briefcase className="w-5 h-5" />, label: 'Jobs', index: 0 },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages', index: 1 },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Coach', index: 2 },
    { icon: <Building2 className="w-5 h-5" />, label: 'Profile', index: 3 },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', index: 4 },
  ];

  const cards = [
    {
      type: 'candidates',
      component: (
        <ProfileCardParent
          type="employer"
          name="Hirly, Inc."
          handle="hirlyinc"
          avatarUrl="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
          location="San Francisco, CA"
          about="Revolutionizing the hiring process with AI-powered recruitment solutions."
          employees={120}
          contactText="More"
          showUserInfo={true}
          enableTilt={true}
          onContactClick={() => console.log('Contact employer')}
        />
      )
    },
    {
      type: 'messages',
      component: (
        <MessagesCard 
          onViewProfile={() => console.log("View profile clicked")}
        />
      )
    },
    {
      type: 'coach',
      component: <CoachCard onStartSession={() => console.log("Start session clicked")} />
    },
    {
      type: 'company',
      component: <SimpleCompanyProfileCard 
        companyName="Hirly, Inc."
        industry="Technology"
        logoUrl="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
        description="Revolutionizing the hiring process with AI-powered recruitment solutions."
        specialties={["AI Recruitment", "Talent Matching", "HR Technology"]}
      />
    },
    {
      type: 'settings',
      component: <SettingsCard />
    }
  ];

  const handlePrevious = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleViewProfile = () => {
    console.log('View Profile clicked');
  };

  const handleAction = (action: 'star' | 'heart') => {
    console.log(`${action} action clicked`);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuSelect = (index: number) => {
    setCurrentCardIndex(index);
    setIsMenuOpen(false);
  };

  const handleAuthSuccess = (type: string) => {
    setUserType(type);
    setSelectedRole(type);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userType', type);
  };

  if (!isAuthenticated) {
    return <LandingPage 
      onAuthSuccess={handleAuthSuccess}
      onSignupSuccess={(userType) => {
        setSignupUserType(userType);
        setShowCompleteProfile(true);
      }}
    />;
  }

  if (swipeOpen) {
    return (
      <React.Suspense fallback={overlayFallback}>
        <SwipeApp 
          onCollapse={() => setSwipeOpen(false)} 
          userType={userType}
          candidateProfiles={candidateProfiles}
          jobListings={jobListings}
        />
      </React.Suspense>
    );
  }
  if (messagesOpen) {
    return (
      <React.Suspense fallback={overlayFallback}>
        <MessagesOverlay onCollapse={() => setMessagesOpen(false)} />
      </React.Suspense>
    );
  }
  if (settingsOpen) {
    return (
      <React.Suspense fallback={overlayFallback}>
        <SettingsOverlay onCollapse={() => setSettingsOpen(false)} />
      </React.Suspense>
    );
  }
  if (coachOpen) {
    return (
      <React.Suspense fallback={overlayFallback}>
        <CoachOverlay onCollapse={() => setCoachOpen(false)} />
      </React.Suspense>
    );
  }
  if (dashboardOpen) {
    return (
      <React.Suspense fallback={overlayFallback}>
        <DashboardOverlay onCollapse={() => setDashboardOpen(false)} />
      </React.Suspense>
    );
  }
  // If not authenticated, show the landing/login page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 relative">
        <GradientBackground animated={true} />
        <LandingPage onAuthSuccess={() => {
          setIsAuthenticated(true);
          setUserType('candidate'); // Default to candidate after login; adjust as needed
        }} />
      </div>
    );
  }

  const placeholderCandidate = {
    name: 'Jane Doe',
    title: 'Frontend Developer',
    handle: 'janedoe',
    status: 'Open to Work',
    avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    about: 'Experienced frontend developer passionate about building beautiful and performant web apps.',
    location: 'Seattle, WA',
    skills: ['React', 'TypeScript', 'CSS', 'UI/UX'],
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    setIsAuthenticated(false);
    setUserType(null);
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative">
      <GradientBackground animated={true} />
      {/* Always-visible Hamburger Menu */}
      <HamburgerMenu userName={"John Doe"} userRole={userType === 'employer' ? 'Employer' : 'Candidate'} onLogout={handleLogout} onCloseOverlay={closeAllOverlays} />
      {/* Complete Profile Modal for new users */}
      {showCompleteProfile && (
        <>
          <div style={{zIndex: 9999, position: 'fixed', top: 20, left: 20, color: 'red', background: 'white', padding: 8}}>DEBUG: About to render ErrorBoundary/Suspense/Modal</div>
          <ErrorBoundary>
            <Suspense fallback={<div className="fixed inset-0 z-50 flex items-center justify-center bg-red-900 text-white text-2xl font-bold">DEBUG: Suspense fallback - Modal Loading</div>}>
              <>
                <div style={{zIndex: 9999, position: 'fixed', top: 60, left: 20, color: 'blue', background: 'white', padding: 8}}>DEBUG: Inside Suspense, about to render Modal</div>
                <CompleteProfileModal
                  onComplete={handleCompleteProfileModalComplete}
                  onClose={handleCompleteProfileModalClose}
                />
              </>
            </Suspense>
          </ErrorBoundary>
        </>
      )}
      {showWelcomeModal && (
        <Suspense fallback={null}>
          <WelcomeModal name={welcomeName} onClose={() => setShowWelcomeModal(false)} />
        </Suspense>
      )}


      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          {userType === 'employer' ? (
            <ProfileCardParent
              type="employer"
              name="Hirly, Inc."
              handle="hirlyinc"
              avatarUrl="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
              location="San Francisco, CA"
              about="Revolutionizing the hiring process with AI-powered recruitment solutions."
              employees={120}
              contactText="More"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() => setProfileOpen(false)}
            />
          ) : (
            <ProfileCardParent
              type="candidate"
              name={placeholderCandidate.name}
              title={placeholderCandidate.title}
              handle={placeholderCandidate.handle}
              status={placeholderCandidate.status}
              avatarUrl={placeholderCandidate.avatarUrl}
              contactText="More"
              showUserInfo={true}
              enableTilt={true}
              about={placeholderCandidate.about}
              location={placeholderCandidate.location}
              skills={placeholderCandidate.skills}
              onContactClick={() => setProfileOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;