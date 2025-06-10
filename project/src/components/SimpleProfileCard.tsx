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
    <div
      className="rounded-2xl border border-white/20 shadow-2xl bg-gradient-to-br from-purple-500 via-purple-400 to-pink-400 flex flex-col items-center text-center"
      style={{ width: 320, height: 400 }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="w-24 h-24 rounded-2xl object-cover mb-4 border-2 border-white/30 shadow-lg"
        />
      )} 
      <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">{name}</h2>
      {title && <h3 className="text-lg text-white/80 mb-2">{title}</h3>}
      {description && <p className="text-white/90 text-base mb-3 line-clamp-4">{description}</p>} 
      <div className="flex gap-2 justify-center text-xs text-white/80 mb-3">
        {meta1 && <span className="bg-white/20 rounded px-2 py-1">{meta1}</span>}
        {meta2 && <span className="bg-white/20 rounded px-2 py-1">{meta2}</span>}
        {meta3 && <span className="bg-white/20 rounded px-2 py-1">{meta3}</span>}
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
