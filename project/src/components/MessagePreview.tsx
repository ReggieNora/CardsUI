import React from 'react';
import Avatar from './Avatar';

interface MessagePreviewProps {
  avatarSrc: string;
  name: string;
  preview: string;
  timestamp: string;
  unread?: boolean;
  online?: boolean;
}

const MessagePreview: React.FC<MessagePreviewProps> = ({
  avatarSrc,
  name,
  preview,
  timestamp,
  unread = false,
  online = false
}) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="relative">
        <Avatar src={avatarSrc} size="md" />
        {online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white/10" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className={`font-semibold truncate ${unread ? 'text-white' : 'text-white/80'}`}>
            {name}
          </h3>
          <span className={`text-xs ${unread ? 'text-white' : 'text-white/60'}`}>
            {timestamp}
          </span>
        </div>
        
        <p className={`text-sm truncate ${unread ? 'text-white' : 'text-white/60'}`}>
          {preview}
        </p>
      </div>

      {unread && (
        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
      )}
    </div>
  );
};

export default MessagePreview;