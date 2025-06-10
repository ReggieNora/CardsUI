import React from 'react';

interface SimpleProfileCardProps {
  name: string;
  title?: string;
  imageUrl?: string;
  description?: string;
  meta1?: string;
  meta2?: string;
  meta3?: string;
  onViewProfile?: () => void;
}

const SimpleProfileCard: React.FC<SimpleProfileCardProps> = ({
  name,
  title,
  imageUrl,
  description,
  meta1,
  meta2,
  meta3,
  onViewProfile,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-6 w-full max-w-xs flex flex-col items-center text-center">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-20 h-20 rounded-xl object-cover mb-4 border border-gray-200"
        />
      )}
      <h2 className="text-xl font-bold text-gray-900 mb-1">{name}</h2>
      {title && <h3 className="text-base text-gray-600 mb-2">{title}</h3>}
      {description && <p className="text-gray-700 text-sm mb-3 line-clamp-4">{description}</p>}
      <div className="flex gap-2 justify-center text-xs text-gray-500 mb-3">
        {meta1 && <span className="bg-white/30 backdrop-blur rounded px-2 py-1">{meta1}</span>}
        {meta2 && <span className="bg-white/30 backdrop-blur rounded px-2 py-1">{meta2}</span>}
        {meta3 && <span className="bg-white/30 backdrop-blur rounded px-2 py-1">{meta3}</span>}
      </div>
      {onViewProfile && (
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          onClick={onViewProfile}
        >
          View Profile
        </button>
      )}
    </div>
  );
};

export default SimpleProfileCard;
