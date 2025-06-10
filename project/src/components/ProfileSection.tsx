
import React, { useState } from 'react';

// Example candidate data (replace with real data as needed)
const exampleCandidate = {
  name: 'Jane Doe',
  title: 'Senior Frontend Developer',
  handle: 'janedoe',
  status: 'Online',
  avatarUrl: '/avatars/jane.jpg',
  about: 'Passionate frontend developer with a knack for building delightful user interfaces and scalable web apps.',
  location: 'San Francisco, CA',
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'UI/UX'],
  description: 'Passionate frontend developer with a knack for building delightful user interfaces and scalable web apps.',
  resume: {
    experience: [
      {
        title: 'Senior Frontend Developer',
        company: 'Google',
        duration: '2020 - Present',
        description: 'Led development of core UI features, mentored junior devs, and improved app performance by 40%.'
      },
      {
        title: 'Frontend Developer',
        company: 'Facebook',
        duration: '2018 - 2020',
        description: 'Built and maintained React components, implemented new features, and collaborated with design team.'
      }
    ],
    education: {
      degree: 'B.S. Computer Science',
      school: 'Stanford University',
      duration: '2014 - 2018',
      honors: 'Graduated with honors. Focus on Software Engineering and AI.'
    }
  }
};

import ProfileCardParent from "./ProfileCardParent";
import ResumeModal from './ResumeModal';
import ResumeView from './ResumeView';

export default function ProfileSection() {
  const candidate = exampleCandidate;
  console.log('ProfileSection candidate', candidate);
  console.log('ProfileSection candidate', candidate);
  const [isResumeOpen, setResumeOpen] = useState(false);

  const handleOpenResume = () => setResumeOpen(true);
  const handleCloseResume = () => setResumeOpen(false);

  return (
    <>
      {/* Click anywhere outside the card to exit */}
      <div
        className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-900 to-black"
        onClick={() => window.history.back()}
        style={{ cursor: 'pointer' }}
      >
        <div onClick={e => e.stopPropagation()} style={{ cursor: 'default' }}>
          <ProfileCardParent
            type="candidate"
            name={candidate.name}
            title={candidate.title}
            handle={candidate.handle}
            status={candidate.status}
            avatarUrl={candidate.avatarUrl}
            contactText="More"
            showUserInfo={true}
            enableTilt={true}
            about={candidate.about}
            location={candidate.location}
            skills={candidate.skills}
            onEditClick={handleOpenResume}
            resume={candidate.resume}
          />
        </div>
        <ResumeModal isOpen={isResumeOpen} onClose={handleCloseResume}>
          <ResumeView
            avatarSrc={candidate.avatarUrl}
            name={candidate.name}
            title={candidate.title}
            skills={candidate.skills}
            onClose={handleCloseResume}
            onAction={(action) => {
              if (action === 'close') handleCloseResume();
              // Add other actions (star/heart) if needed
            }}
          />
        </ResumeModal>
      </div>
    </div>
    </>
  );
}
