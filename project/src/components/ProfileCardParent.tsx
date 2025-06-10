import React from "react";
import checkMark from "../assets/check-mark.png";

interface CandidateProfileProps {
  type: "candidate";
  name: string;
  title: string;
  handle: string;
  status?: string;
  avatarUrl: string;
  contactText?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  onEditClick?: () => void;
  about?: string;
  location?: string;
  skills?: string[];
  resume: {
    experience: {
      title: string;
      company: string;
      duration: string;
      description: string;
    }[];
    education: {
      degree: string;
      school: string;
      duration: string;
      honors: string;
    };
  };
}

interface EmployerProfileProps {
  type: "employer";
  name: string;
  handle: string;
  avatarUrl: string;
  contactText?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  onEditClick?: () => void;
  location?: string;
  employees?: number;
  about?: string;
  skills?: string[];
}

type ProfileCardParentProps = CandidateProfileProps | EmployerProfileProps;

const ProfileCardParent: React.FC<ProfileCardParentProps> = (props) => {

  // Common fields for both types
  if (props.type === "candidate") {
    const {
      name,
      handle,
      avatarUrl,
      title,
      onEditClick,
      location,
      about,
      skills,
      resume
    } = props;
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#18122B] via-[#251E40] to-[#1A1A2E]">
        <div className="relative w-full max-w-[400px] h-[540px] rounded-2xl shadow-2xl bg-white/10 backdrop-blur-2xl flex flex-col justify-between p-7 border border-white/30">
          {/* Top Row: Logo and Badge */}
          <div className="flex items-start justify-between mb-2">
            {avatarUrl && (
              <div className="rounded-xl bg-white/60 p-1 w-12 h-12 flex items-center justify-center shadow-md">
                <img src={avatarUrl} alt={name} className="w-10 h-10 object-contain rounded-lg" />
              </div>
            )}
            {/* Verification Badge */}
            <div className="ml-auto flex flex-col items-end">
              <span className="bg-white/70 rounded-full shadow-sm p-1 flex items-center justify-center w-8 h-8">
                <img src={checkMark} alt="Verified" className="w-5 h-5" />
              </span>
            </div>
          </div>
          {/* Main Info */}
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="text-2xl font-extrabold text-white leading-tight mb-1" style={{textShadow:'0 2px 16px #0004'}}>{title || name}</div>
            {props.type === 'candidate' && (
              <div className="text-lg text-white/80 font-semibold mb-2">{name}</div>
            )}
            {props.type === 'employer' && (
              <div className="text-lg text-white/80 font-semibold mb-2">{name}</div>
            )}
            {/* Meta Info Rows */}
            <div className="flex flex-col gap-1 items-center mb-3 w-full">
              {location && (
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10c0 7-7.5 11-7.5 11S4.5 17 4.5 10a7.5 7.5 0 1115 0z" /></svg>
                  {location}
                </div>
              )}
              {props.type === 'employer' && typeof employees === 'number' && (
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13 0A4 4 0 0017 4a4 4 0 00-2.67 7.13M7 16a4 4 0 01-8 0m8 0A4 4 0 017 4a4 4 0 012.67 7.13" /></svg>
                  {employees} Employees
                </div>
              )}
              {/* Example for candidate: add more meta info rows as needed */}
              {props.type === 'candidate' && skills && skills.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {skills.slice(0,3).map((skill, idx) => (
                    <span key={idx} className="bg-white/20 text-white text-xs rounded-full px-3 py-1">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {/* About/Summary */}
            {about && (
              <div className="text-white/90 text-base leading-relaxed mb-2 max-h-20 overflow-auto">
                {about}
              </div>
            )}
            {/* Experience/Education for candidate */}
            {props.type === 'candidate' && resume?.experience && resume.experience.length > 0 && (
              <div className="mb-1">
                <div className="text-white/80 text-xs font-semibold mb-1">Experience</div>
                <ul className="space-y-1">
                  {resume.experience.slice(0,1).map((exp, idx) => (
                    <li key={idx} className="text-white/80 text-xs flex flex-col">
                      <span className="font-medium">{exp.title}</span>
                      <span className="text-white/60">{exp.company} &middot; {exp.duration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {props.type === 'candidate' && resume?.education && resume.education.degree && (
              <div className="mb-1">
                <div className="text-white/80 text-xs font-semibold mb-1">Education</div>
                <div className="text-white/80 text-xs">
                  <span className="font-medium">{resume.education.degree}</span> at {resume.education.school} ({resume.education.duration})
                </div>
                {resume.education.honors && <div className="text-white/60 text-xs">{resume.education.honors}</div>}
              </div>
            )}
          </div>
          {/* Show More/Edit Button at bottom */}
          {onEditClick && (
            <button
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold py-3 mt-2 transition text-base"
              onClick={onEditClick}
            >
              Show More
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 12H6.75m0 0l4.5-4.5m-4.5 4.5l4.5 4.5" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  } else {
    const {
      name,
      avatarUrl,
      onEditClick,
      location,
      about,
      skills,
      employees,
    } = props;
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#18122B] via-[#251E40] to-[#1A1A2E]">
        <div className="relative w-full max-w-[400px] h-[540px] rounded-2xl shadow-2xl bg-white/10 backdrop-blur-2xl flex flex-col justify-between p-7 border border-white/30">
          {/* Top Row: Logo and Badge */}
          <div className="flex items-start justify-between mb-2">
            {avatarUrl && (
              <div className="rounded-xl bg-white/60 p-1 w-12 h-12 flex items-center justify-center shadow-md">
                <img src={avatarUrl} alt={name} className="w-10 h-10 object-contain rounded-lg" />
              </div>
            )}
            {/* Verification Badge */}
            <div className="ml-auto flex flex-col items-end">
              <span className="bg-white/70 rounded-full shadow-sm p-1 flex items-center justify-center w-8 h-8">
                <img src={checkMark} alt="Verified" className="w-5 h-5" />
              </span>
            </div>
          </div>
          {/* Main Info */}
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="text-2xl font-extrabold text-white leading-tight mb-1" style={{textShadow:'0 2px 16px #0004'}}>{name}</div>
            {/* Meta Info Rows */}
            <div className="flex flex-col gap-1 items-center mb-3 w-full">
              {location && (
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10c0 7-7.5 11-7.5 11S4.5 17 4.5 10a7.5 7.5 0 1115 0z" /></svg>
                  {location}
                </div>
              )}
              {typeof employees === 'number' && (
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13 0A4 4 0 0017 4a4 4 0 00-2.67 7.13M7 16a4 4 0 01-8 0m8 0A4 4 0 017 4a4 4 0 012.67 7.13" /></svg>
                  {employees} Employees
                </div>
              )}
              {skills && skills.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {skills.slice(0,3).map((skill, idx) => (
                    <span key={idx} className="bg-white/20 text-white text-xs rounded-full px-3 py-1">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {/* About/Summary */}
            {about && (
              <div className="text-white/90 text-base leading-relaxed mb-2 max-h-20 overflow-auto">
                {about}
              </div>
            )}
          </div>
          {/* Show More/Edit Button at bottom */}
          {onEditClick && (
            <button
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold py-3 mt-2 transition text-base"
              onClick={onEditClick}
            >
              Show More
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 12H6.75m0 0l4.5-4.5m-4.5 4.5l4.5 4.5" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default ProfileCardParent;
