import React, { useState } from 'react';
import { Building2, MapPin, Globe, Users, Star, Award, Briefcase } from 'lucide-react';
import GradientButton from './GradientButton';

interface CompanyProfileCardProps {
  onViewProfile?: () => void;
}

const CompanyProfileCard: React.FC<CompanyProfileCardProps> = ({ onViewProfile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const companyInfo = {
    name: "Hirly, Inc.",
    logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    location: "San Francisco, CA",
    website: "hirly.com",
    size: "50-200 employees",
    founded: "2023",
    industry: "Technology",
    description: "Revolutionizing the hiring process with AI-powered recruitment solutions.",
    specialties: ["AI Recruitment", "Talent Matching", "HR Technology"],
    benefits: ["Remote First", "Health Insurance", "401(k)", "Flexible PTO"],
    awards: ["Best Tech Startup 2023", "Innovation Award 2023"]
  };

  if (!isExpanded) {
    return (
      <div className="relative w-[350px]">
        <div className="flex flex-col h-[480px] p-8 rounded-3xl 
                      bg-white/10 backdrop-blur-md border border-white/20
                      shadow-xl shadow-black/20">
          
          {/* Company Logo and Name */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 border-2 border-white/20">
              <img 
                src={companyInfo.logo} 
                alt={companyInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-wide text-center
                         text-shadow-glow">{companyInfo.name}</h2>
            <p className="text-white/60 mt-1">{companyInfo.industry}</p>
          </div>

          {/* Quick Info */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-white/60" />
              <span className="text-white/80">{companyInfo.location}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-white/60" />
              <span className="text-white/80">{companyInfo.size}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-white/60" />
              <span className="text-white/80">{companyInfo.website}</span>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-6">
            <h3 className="text-white/90 text-sm font-semibold mb-3">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {companyInfo.specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="px-3 py-1 rounded-full bg-white/10 border border-white/20
                           text-white/80 text-sm"
                >
                  {specialty}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-col items-center space-y-4">
            <GradientButton onClick={() => setIsExpanded(true)}>
              View Full Profile
            </GradientButton>
          </div>
        </div>
        
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] h-4 
                      bg-black/20 blur-md rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="relative w-[700px]">
      <div className="flex flex-col h-[600px] p-8 rounded-3xl 
                    bg-white/10 backdrop-blur-md border border-white/20
                    shadow-xl shadow-black/20">
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20">
              <img 
                src={companyInfo.logo} 
                alt={companyInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-wide
                           text-shadow-glow">{companyInfo.name}</h2>
              <p className="text-white/60">{companyInfo.industry}</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="px-4 py-2 bg-white/10 text-white rounded-xl
                     hover:bg-white/20 transition-colors duration-200"
          >
            Collapse
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 space-y-6">
          {/* Company Description */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">About Us</h3>
            <p className="text-white/80 leading-relaxed">{companyInfo.description}</p>
          </div>

          {/* Company Details */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Company Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Building2 className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-white/60 text-sm">Founded</p>
                  <p className="text-white">{companyInfo.founded}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-white/60 text-sm">Company Size</p>
                  <p className="text-white">{companyInfo.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-white/60 text-sm">Location</p>
                  <p className="text-white">{companyInfo.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-white/60" />
                <div>
                  <p className="text-white/60 text-sm">Website</p>
                  <p className="text-white">{companyInfo.website}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {companyInfo.specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20
                           text-white/80"
                >
                  {specialty}
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Benefits & Perks</h3>
            <div className="grid grid-cols-2 gap-3">
              {companyInfo.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-white/80"
                >
                  <Star className="w-4 h-4 text-white/60" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Awards & Recognition</h3>
            <div className="space-y-3">
              {companyInfo.awards.map((award, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 text-white/80"
                >
                  <Award className="w-5 h-5 text-white/60" />
                  <span>{award}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] h-4 
                    bg-black/20 blur-md rounded-full"></div>
    </div>
  );
};

export default CompanyProfileCard; 