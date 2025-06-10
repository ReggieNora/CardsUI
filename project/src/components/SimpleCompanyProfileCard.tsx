import React from 'react';

interface SimpleCompanyProfileCardProps {
  companyName: string;
  industry?: string;
  logoUrl?: string;
  description?: string;
  specialties?: string[];
  onViewProfile?: () => void;
}

const SimpleCompanyProfileCard: React.FC<SimpleCompanyProfileCardProps> = ({
  companyName,
  industry,
  logoUrl,
  description,
  specialties = [],
  onViewProfile,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs flex flex-col items-center text-center">
      {logoUrl && (
        <img
          src={logoUrl}
          alt={companyName}
          className="w-20 h-20 rounded-xl object-cover mb-4 border border-gray-200"
        />
      )}
      <h2 className="text-xl font-bold text-gray-900 mb-1">{companyName}</h2>
      {industry && <h3 className="text-base text-gray-600 mb-2">{industry}</h3>}
      {description && <p className="text-gray-700 text-sm mb-3 line-clamp-4">{description}</p>}
      {specialties.length > 0 && (
        <div className="flex gap-2 flex-wrap justify-center text-xs text-gray-500 mb-3">
          {specialties.map((spec, i) => (
            <span key={i} className="bg-gray-100 rounded px-2 py-1">{spec}</span>
          ))}
        </div>
      )}
      {onViewProfile && (
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          onClick={onViewProfile}
        >
          View Company
        </button>
      )}
    </div>
  );
};

export default SimpleCompanyProfileCard;
