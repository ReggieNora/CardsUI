import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import {
  IconUser,
  IconBriefcase,
  IconMessage,
  IconSettings,
  IconRobotFace,
  IconChartBar,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
const SwipeApp = React.lazy(() => import("./SwipeApp"));
const MessagesOverlay = React.lazy(() => import("./MessagesOverlay"));
const SettingsOverlay = React.lazy(() => import("./SettingsOverlay"));
const CoachOverlay = React.lazy(() => import("./CoachOverlay"));
const DashboardOverlay = React.lazy(() => import("./DashboardOverlay"));
import ProfileSection from "./ProfileSection";

interface BentoMainMenuProps {
  userType: 'candidate' | 'employer' | null;
  candidateProfiles?: any[];
  jobListings?: any[];
}

const SkeletonSwipe = ({ userType }: { userType: 'candidate' | 'employer' | null }) => (
  <motion.div className="relative flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] dark:bg-dot-white/[0.2] flex-col space-y-2 justify-center items-center">
    <div className="relative flex-1 flex items-center justify-center">
      <img 
        src="/assets/meeting.png" 
        alt={userType === 'employer' ? "Candidate Profiles" : "Job Opportunities"} 
        className="w-32 h-32 opacity-80"
      />
    </div>
  </motion.div>
);

const SkeletonMessages = () => (
  <motion.div className="relative flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] dark:bg-dot-white/[0.2] flex-col space-y-2 justify-center items-center">
    <div className="relative flex-1 flex items-center justify-center">
      <img 
        src="/assets/laptop.png" 
        alt="Messages" 
        className="w-32 h-32 opacity-80"
      />
      <span className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full text-white text-sm flex items-center justify-center font-bold animate-pulse shadow-lg border border-white/20">
        1
      </span>
    </div>
  </motion.div>
);

const SkeletonProfile = () => (
  <motion.div className="relative flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] dark:bg-dot-white/[0.2] flex-col space-y-2 justify-center items-center">
    <div className="relative flex-1 flex items-center justify-center">
      <img 
        src="/assets/image.png" 
        alt="Profile" 
        className="w-32 h-32 opacity-80"
      />
    </div>
  </motion.div>
);

const SkeletonSettings = () => (
  <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] dark:bg-dot-white/[0.2] flex-col space-y-2 justify-center items-center">
    <div className="relative flex-1 flex items-center justify-center">
      <img 
        src="/assets/setting.png" 
        alt="Settings" 
        className="w-32 h-32 opacity-80"
      />
    </div>
  </motion.div>
);

const SkeletonCoach = () => (
  <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] dark:bg-dot-white/[0.2] flex-col space-y-2 justify-center items-center">
     <div className="relative flex-1 flex items-center justify-center">
      <img 
        src="/assets/implant.png" 
        alt="Coach" 
        className="w-32 h-32 opacity-80"
      />
    </div>
  </motion.div>
);

const SkeletonDashboard = () => (
  <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-dot-black/[0.2] dark:bg-dot-white/[0.2] flex-col space-y-2 justify-center items-center">
     <div className="relative flex-1 flex items-center justify-center">
      <img 
        src="/assets/meeting.png" 
        alt="Dashboard" 
        className="w-32 h-32 opacity-80"
      />
    </div>
  </motion.div>
);

export default function BentoMainMenu({ userType, candidateProfiles = [], jobListings = [] }: BentoMainMenuProps) {
  // --- Tutorial Overlay State ---
  const [tutorialActive, setTutorialActive] = React.useState(false);

  // Use email as unique identifier for tutorial overlay key
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('email');
      const tutorialKey = email ? `mainMenuTutorialSeen_${email}` : 'mainMenuTutorialSeen';
      if (!localStorage.getItem(tutorialKey)) {
        setTutorialActive(true);
      }
    }
  }, []);

  const dismissTutorial = React.useCallback(() => {
    setTutorialActive(false);
    const email = localStorage.getItem('email');
    const tutorialKey = email ? `mainMenuTutorialSeen_${email}` : 'mainMenuTutorialSeen';
    localStorage.setItem(tutorialKey, 'true');
  }, []);


  const [swipeOpen, setSwipeOpen] = React.useState(false);
  const [messagesOpen, setMessagesOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [coachOpen, setCoachOpen] = React.useState(false);
  const [dashboardOpen, setDashboardOpen] = React.useState(false);

  const handleGoHome = React.useCallback(() => {
    // Reload the page to go back to landing page
    window.location.reload();
  }, []);

  const handleSwipeOpen = React.useCallback(() => setSwipeOpen(true), []);
  const handleMessagesOpen = React.useCallback(() => setMessagesOpen(true), []);
  const handleProfileOpen = React.useCallback(() => setProfileOpen(true), []);
  const handleSettingsOpen = React.useCallback(() => setSettingsOpen(true), []);
  const handleCoachOpen = React.useCallback(() => setCoachOpen(true), []);
  const handleDashboardOpen = React.useCallback(() => setDashboardOpen(true), []);

  const candidateItems = React.useMemo(() => [
    {
      title: "Jobs",
      description: <span className="text-sm">Swipe through job opportunities tailored for you.</span>,
      header: <SkeletonSwipe userType={userType} />,
      className: "md:col-span-1",
      icon: <IconBriefcase className="h-5 w-5 text-neutral-500" />,
      action: handleSwipeOpen
    },
    {
      title: "Messages",
      description: <span className="text-sm">Chat with recruiters and hiring managers.</span>,
      header: <SkeletonMessages />,
      className: "md:col-span-1",
      icon: <IconMessage className="h-5 w-5 text-neutral-500" />,
      action: handleMessagesOpen
    },
    {
      title: "Profile",
      description: <span className="text-sm">Manage your professional profile and resume.</span>,
      header: <SkeletonProfile />,
      className: "md:col-span-1",
      icon: <IconUser className="h-5 w-5 text-neutral-500" />,
      action: handleProfileOpen
    },
    {
      title: "Settings",
      description: <span className="text-sm">Customize your job search preferences.</span>,
      header: <SkeletonSettings />,
      className: "md:col-span-1",
      icon: <IconSettings className="h-5 w-5 text-neutral-500" />,
      action: handleSettingsOpen
    },
    {
      title: "AI Interview Coach",
      description: <span className="text-sm">Practice interviews with AI-powered feedback.</span>,
      header: <SkeletonCoach />,
      className: "md:col-span-2",
      icon: <IconRobotFace className="h-5 w-5 text-neutral-500" />,
      action: handleCoachOpen
    },
  ], [userType, handleSwipeOpen, handleMessagesOpen, handleProfileOpen, handleSettingsOpen, handleCoachOpen]);

  const employerItems = React.useMemo(() => [
    {
      title: "Candidates",
      description: <span className="text-sm">Swipe through qualified candidate profiles.</span>,
      header: <SkeletonSwipe userType={userType} />,
      className: "md:col-span-1",
      icon: <IconUser className="h-5 w-5 text-neutral-500" />,
      action: handleSwipeOpen
    },
    {
      title: "Messages",
      description: <span className="text-sm">Chat with potential candidates.</span>,
      header: <SkeletonMessages />,
      className: "md:col-span-1",
      icon: <IconMessage className="h-5 w-5 text-neutral-500" />,
      action: handleMessagesOpen
    },
    {
      title: "Dashboard",
      description: <span className="text-sm">View hiring analytics and performance metrics.</span>,
      header: <SkeletonDashboard />,
      className: "md:col-span-1",
      icon: <IconChartBar className="h-5 w-5 text-neutral-500" />,
      action: handleDashboardOpen
    },
    {
      title: "Settings",
      description: <span className="text-sm">Manage your company settings and preferences.</span>,
      header: <SkeletonSettings />,
      className: "md:col-span-1",
      icon: <IconSettings className="h-5 w-5 text-neutral-500" />,
      action: handleSettingsOpen
    },
    {
      title: "AI Interview Coach",
      description: <span className="text-sm">Prepare better interview questions and techniques.</span>,
      header: <SkeletonCoach />,
      className: "md:col-span-2",
      icon: <IconRobotFace className="h-5 w-5 text-neutral-500" />,
      action: handleCoachOpen
    },
  ], [userType, handleSwipeOpen, handleMessagesOpen, handleDashboardOpen, handleSettingsOpen, handleCoachOpen]);

  const items = React.useMemo(() => userType === 'employer' ? employerItems : candidateItems, [userType, employerItems, candidateItems]);

  // --- Tutorial Tooltip Render Helper ---
  const renderTutorialTooltip = (idx: number) => {
    if (!tutorialActive || tutorialStep !== idx) return null;
    return (
      <motion.div
        className="absolute -top-20 left-1/2 z-50 flex flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl -translate-x-1/2"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.8 }}
      >
        <div className="relative z-30 text-base font-bold text-white">
          {tutorialSteps[idx]?.title}
        </div>
        <div className="text-xs text-white mb-2">{tutorialSteps[idx]?.description}</div>
        <button
          onClick={skipTutorial}
          className="text-xs text-emerald-400 underline underline-offset-2 mt-1"
        >
          Skip
        </button>
      </motion.div>
    );
  };


  const overlayFallback = <div className="w-full h-full flex items-center justify-center text-white text-lg">Loading...</div>;

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

  if (profileOpen) {
    // Example candidate data, replace with real user data if available
    const exampleCandidate = {
      name: "Alex Johnson",
      title: "Senior Frontend Developer",
      handle: "alexjohnson",
      status: "Online",
      avatarUrl: "/assets/avatar.png",
      about: "Passionate software engineer with 8+ years of experience building scalable web applications. Expert in React ecosystem and modern JavaScript development.",
      location: "San Francisco, CA",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      description: "Passionate software engineer with 8+ years of experience building scalable web applications. Expert in React ecosystem and modern JavaScript development.",
      resume: {
        experience: [
          {
            title: "Senior Frontend Developer",
            company: "Google",
            duration: "2020 - Present",
            description: "Led development of core UI features, mentored junior devs, and improved app performance by 40%."
          },
          {
            title: "Frontend Developer",
            company: "Facebook",
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
    };
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ProfileSection candidate={exampleCandidate} />
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
        {items.map((item, idx) => (
          <div className="relative" key={item.title}>
            <BentoGridItem
              className={item.className}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              onClick={item.action}
            />
          </div>
        ))}
      </BentoGrid>
      {/* Tutorial Overlay Modal */}
      {tutorialActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <motion.div
            className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-emerald-600">Welcome to the Main Menu!</h2>
            <p className="mb-4 text-gray-700 text-center">
              Here you can access all the core features of the app: swiping for jobs or candidates, chatting, updating your profile, and more. Click any menu card to get started.
            </p>
            <button
              onClick={dismissTutorial}
              className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
            >
              Got it!
            </button>
          </motion.div>
        </div>
      )}
      {/* Home Button */}
      <motion.button
        onClick={handleGoHome}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl text-white font-semibold shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img 
          src="/assets/house.png" 
          alt="Home" 
          className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        />
        <span className="text-lg">Home</span>
      </motion.button>
    </div>
  );