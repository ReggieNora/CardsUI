import React from 'react';

interface CandidateProps {
  userType: 'candidate';
  onClose: () => void;
  onEdit: () => void;
  name: string;
  title: string;
  imageUrl?: string;
  description?: string;
  skills?: string[];
  experience?: string;
  location?: string;
}

interface EmployerProps {
  userType: 'employer';
  onClose: () => void;
  onEdit: () => void;
  companyName: string;
  industry?: string;
  logoUrl?: string;
  description?: string;
  specialties?: string[];
  employees?: number;
}

type StackStyleProfileCardProps = CandidateProps | EmployerProps;

const StackStyleProfileCard: React.FC<StackStyleProfileCardProps> = (props) => {
  const { onClose, onEdit } = props;

  // Use the exact same dimensions and styling as the stack cards
  const cardStyle = {
    width: '320px',
    height: '400px',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg">
      {/* Close Button - Positioned to the side and moved up */}
      <button
        onClick={onClose}
        className="absolute left-1/2 top-1/2 transform -translate-y-1/2 translate-x-[200px] translate-y-[-90px] z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md flex items-center justify-center transition-all duration-300"
      >
        <span className="text-white text-2xl font-bold leading-none">×</span>
      </button>

      {/* Edit Button - Positioned to the left side */}
      <button
        onClick={onEdit}
        className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-[200px] translate-y-[-90px] z-20 px-4 py-2 rounded-xl bg-gradient-to-br from-purple-500 via-purple-400 to-pink-400 text-white font-bold shadow-lg border border-white/20 hover:scale-105 transition-all"
      >
        Edit
      </button>

      {/* Profile Card - Matching Stack Card Style */}
      <div
        className="rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl border border-white/20 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
        style={cardStyle}
      >
        {/* Glassmorphic overlay for depth */}
        <div className="absolute inset-0 bg-white/5 rounded-2xl" />
        
        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          {/* Profile Image/Logo */}
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 mb-4 bg-white/10 flex items-center justify-center">
            {props.userType === 'candidate' ? (
              props.imageUrl ? (
                <img 
                  src={props.imageUrl} 
                  alt={props.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl">👤</span>
              )
            ) : (
              props.logoUrl ? (
                <img 
                  src={props.logoUrl} 
                  alt={props.companyName}
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <span className="text-3xl">🏢</span>
              )
            )}
          </div>

          {/* Name/Company Name */}
          <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-2 text-center">
            {props.userType === 'candidate' ? props.name : props.companyName}
          </h2>

          {/* Title/Industry */}
          {props.userType === 'candidate' ? (
            <p className="text-white/90 text-lg mb-3">{props.title}</p>
          ) : (
            <p className="text-white/90 text-lg mb-3">{props.industry}</p>
          )}

          {/* Location/Employee Count */}
          {props.userType === 'candidate' ? (
            props.location && (
              <p className="text-white/80 text-sm mb-3">📍 {props.location}</p>
            )
          ) : (
            props.employees && (
              <p className="text-white/80 text-sm mb-3">👥 {props.employees} employees</p>
            )
          )}

          {/* Description */}
          {props.description && (
            <p className="text-white/80 text-sm text-center mb-3 line-clamp-3 leading-relaxed">
              {props.description}
            </p>
          )}

          {/* Skills/Specialties */}
          {props.userType === 'candidate' ? (
            props.skills && props.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-3">
                {props.skills.slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )
          ) : (
            props.specialties && props.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-3">
                {props.specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-xs"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            )
          )}

          {/* Experience (for candidates) */}
          {props.userType === 'candidate' && props.experience && (
            <p className="text-white/80 text-sm">
              💼 {props.experience} experience
            </p>
          )}
        </div>

        {/* Card indicator (matches stack cards) */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-white/60 rounded-full" />
      </div>
    </div>
  );
};

export default StackStyleProfileCard;