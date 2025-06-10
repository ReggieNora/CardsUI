import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
import MessagePreview from './MessagePreview';
import { Mic, Paperclip, Smile, Send } from 'lucide-react';

interface Message {
  id: string;
  avatarSrc: string;
  name: string;
  preview: string;
  timestamp: string;
  unread?: boolean;
  online?: boolean;
  lastMessage?: {
    text: string;
    time: string;
  };
  conversation?: {
    messages: {
      id: string;
      text: string;
      timestamp: string;
      isOwn: boolean;
      attachments?: {
        type: 'image' | 'file' | 'voice';
        url: string;
        name?: string;
        duration?: string;
      }[];
      reactions?: {
        emoji: string;
        count: number;
        users: string[];
      }[];
      status?: 'sent' | 'delivered' | 'read';
    }[];
    isTyping?: boolean;
  };
}

interface MessagesCardProps {
  onViewProfile: () => void;
}

const MessagesCard: React.FC<MessagesCardProps> = ({ onViewProfile }) => {
  const [selectedMessage, setSelectedMessage] = useState<string>('1'); // Set to first message by default
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth <= 768);
  const [showChat, setShowChat] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // On mobile, show conversation list by default
    if (isMobileView) {
      setShowChat(false);
    } else {
      setShowChat(true);
    }
  }, [isMobileView]);

  // Enhanced demo conversations with full chat history
  const messages: Message[] = [
    {
      id: '1',
      avatarSrc: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Sarah Miller",
      preview: "Hey, I checked out your latest design work. The UI components look amazing! Would love to discuss a potential collaboration.",
      timestamp: "2m ago",
      unread: true,
      online: true,
      lastMessage: {
        text: "The UI components look amazing!",
        time: "2m ago"
      },
      conversation: {
        messages: [
          {
            id: '1-1',
            text: "Hi! I saw your portfolio and I'm really impressed with your work.",
            timestamp: "10:30 AM",
            isOwn: false,
            status: 'read'
          },
          {
            id: '1-2',
            text: "Thank you! I'm glad you like it. What caught your attention?",
            timestamp: "10:32 AM",
            isOwn: true,
            status: 'read'
          },
          {
            id: '1-3',
            text: "The UI components look amazing! Would love to discuss a potential collaboration.",
            timestamp: "10:33 AM",
            isOwn: false,
            status: 'read',
            reactions: [
              { emoji: '❤️', count: 1, users: ['Sarah'] }
            ]
          },
          {
            id: '1-4',
            text: "I've attached some of my recent work for you to check out.",
            timestamp: "10:35 AM",
            isOwn: true,
            status: 'delivered',
            attachments: [
              {
                type: 'file',
                url: '#',
                name: 'portfolio.pdf'
              }
            ]
          }
        ],
        isTyping: true
      }
    },
    {
      id: '2',
      avatarSrc: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "David Chen",
      preview: "The project looks great! When can we schedule a call to discuss the implementation details?",
      timestamp: "1h ago",
      online: true,
      lastMessage: {
        text: "When can we schedule a call?",
        time: "1h ago"
      },
      conversation: {
        messages: [
          {
            id: '2-1',
            text: "Hey! I've reviewed the project requirements.",
            timestamp: "9:30 AM",
            isOwn: false,
            status: 'read'
          },
          {
            id: '2-2',
            text: "Great! What are your thoughts?",
            timestamp: "9:32 AM",
            isOwn: true,
            status: 'read'
          },
          {
            id: '2-3',
            text: "The architecture looks solid. I have some ideas about the implementation.",
            timestamp: "9:35 AM",
            isOwn: false,
            status: 'read'
          },
          {
            id: '2-4',
            text: "I've recorded a quick voice message explaining my thoughts.",
            timestamp: "9:40 AM",
            isOwn: false,
            status: 'read',
            attachments: [
              {
                type: 'voice',
                url: '#',
                duration: '0:45'
              }
            ]
          }
        ]
      }
    },
    {
      id: '3',
      avatarSrc: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Emma Wilson",
      preview: "Thanks for the feedback on the design system. I've implemented the changes you suggested.",
      timestamp: "3h ago",
      lastMessage: {
        text: "I've implemented the changes",
        time: "3h ago"
      },
      conversation: {
        messages: [
          {
            id: '3-1',
            text: "I've updated the design system with your suggestions.",
            timestamp: "8:00 AM",
            isOwn: false,
            status: 'read'
          },
          {
            id: '3-2',
            text: "Here's a screenshot of the new components.",
            timestamp: "8:05 AM",
            isOwn: false,
            status: 'read',
            attachments: [
              {
                type: 'image',
                url: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
            ]
          },
          {
            id: '3-3',
            text: "Looks great! The spacing and typography are much better now.",
            timestamp: "8:10 AM",
            isOwn: true,
            status: 'read',
            reactions: [
              { emoji: '👍', count: 1, users: ['You'] }
            ]
          }
        ]
      }
    }
  ];

  const selectedChat = messages.find(m => m.id === selectedMessage);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const newMsg = {
      id: `${selectedChat.id}-${Date.now()}`,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      status: 'sent' as const
    };

    if (selectedChat.conversation) {
      selectedChat.conversation.messages.push(newMsg);
    }

    setNewMessage('');
  };

  const handleVoiceMessage = () => {
    setIsRecording(!isRecording);
    // In a real app, this would handle actual voice recording
  };

  const handleReaction = (messageId: string, emoji: string) => {
    if (!selectedChat?.conversation) return;
    
    const message = selectedChat.conversation.messages.find(m => m.id === messageId);
    if (!message) return;

    if (!message.reactions) {
      message.reactions = [];
    }

    const existingReaction = message.reactions.find(r => r.emoji === emoji);
    if (existingReaction) {
      existingReaction.count++;
      existingReaction.users.push('You');
    } else {
      message.reactions.push({
        emoji,
        count: 1,
        users: ['You']
      });
    }
  };

  // Helper render functions for cleaner conditional rendering
  const renderConversationList = () => (
    <div className={`${isMobileView ? 'w-full' : 'w-1/3 pr-4 border-r border-white/10'} flex flex-col`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Messages</h2>
        <p className="text-white/60 text-sm">You have {messages.filter(m => m.unread).length} unread messages</p>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`
              transition-all duration-200
              ${selectedMessage === message.id ? 'bg-white/20' : 'hover:bg-white/10'}
              rounded-xl p-3 cursor-pointer
            `}
            onClick={() => {
              setSelectedMessage(message.id);
              if (isMobileView) setShowChat(true);
            }}
          >
            <MessagePreview
              avatarSrc={message.avatarSrc}
              name={message.name}
              preview={message.preview}
              timestamp={message.timestamp}
              unread={message.unread}
              online={message.online}
            />
          </div>
        ))}
      </div>
      {/* Search Bar */}
      <div className="mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2
                       text-white placeholder-white/40 focus:outline-none focus:border-white/40
                       transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );

  const renderChatView = () => (
    <div className={`${isMobileView ? 'w-full' : 'w-2/3 pl-4'} flex flex-col`}>
      {/* Chat Header */}
      <div className="flex items-center space-x-3 mb-6">
        {isMobileView && (
          <button
            className="mr-3 px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
            onClick={() => setShowChat(false)}
          >
            Back
          </button>
        )}
        <div className="relative">
          <Avatar src={selectedChat?.avatarSrc || ''} size="md" />
          {selectedChat?.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white/10" />
          )}
        </div>
        <div>
          <h3 className="text-white font-semibold">{selectedChat?.name}</h3>
          <p className="text-white/60 text-sm">
            {selectedChat?.online ? 'Online' : 'Last seen recently'}
          </p>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {selectedChat?.conversation?.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className="relative group">
              <div
                className={`
                  max-w-[80%] rounded-2xl px-4 py-2
                  ${msg.isOwn 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/10 text-white'
                  }
                `}
              >
                {/* Message Content */}
                <p className="text-sm">{msg.text}</p>
                {/* Attachments */}
                {msg.attachments?.map((attachment, index) => (
                  <div key={index} className="mt-2">
                    {attachment.type === 'image' && (
                      <img 
                        src={attachment.url} 
                        alt="Attachment" 
                        className="rounded-lg max-w-full h-auto"
                      />
                    )}
                    {attachment.type === 'file' && (
                      <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
                        <Paperclip className="w-4 h-4" />
                        <span className="text-sm">{attachment.name}</span>
                      </div>
                    )}
                    {attachment.type === 'voice' && (
                      <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
                        <Mic className="w-4 h-4" />
                        <span className="text-sm">{attachment.duration}</span>
                      </div>
                    )}
                  </div>
                ))}
                {/* Message Footer */}
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs opacity-60">
                    {msg.timestamp}
                  </span>
                  {msg.isOwn && (
                    <span className="text-xs opacity-60 ml-2">
                      {msg.status === 'read' ? '✓✓' : msg.status === 'delivered' ? '✓✓' : '✓'}
                    </span>
                  )}
                </div>
                {/* Reactions */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className="absolute -bottom-4 right-0 flex space-x-1">
                    {msg.reactions.map((reaction, index) => (
                      <div
                        key={index}
                        className="bg-white/20 rounded-full px-2 py-0.5 text-xs"
                      >
                        {reaction.emoji} {reaction.count}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Reaction Picker (appears on hover) */}
              <div className="absolute -top-8 right-0 hidden group-hover:flex space-x-1 bg-white/20 rounded-full p-1">
                {['❤️', '👍', '😂', '😮', '😢', '🙏'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleReaction(msg.id, emoji)}
                    className="hover:scale-125 transition-transform"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
        {/* Typing Indicator */}
        {selectedChat?.conversation?.isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 text-white/60 hover:text-white transition-colors"
        >
          <Smile className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={handleVoiceMessage}
          className={`p-2 transition-colors ${
            isRecording ? 'text-red-500' : 'text-white/60 hover:text-white'
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2
                     text-white placeholder-white/40 focus:outline-none focus:border-white/40
                     transition-all duration-200"
        />
        <button
          type="submit"
          className="p-2 bg-purple-600 text-white rounded-xl
                     hover:bg-purple-500 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );

  return (
    <div className={`
      bg-white/10 backdrop-blur-md rounded-2xl p-6
      border border-white/20 shadow-xl overflow-hidden
      transition-all duration-300 ease-in-out
      ${isMobileView ? 'w-full' : 'w-[1000px] mx-auto'}
    `}>
      <div className={`${isMobileView ? '' : 'flex'} h-[600px]`}>
        {/* Mobile: show list or chat, Desktop: show both */}
        {isMobileView ? (
          showChat ? renderChatView() : renderConversationList()
        ) : (
          <>
            {renderConversationList()}
            {renderChatView()}
          </>
        )}
      </div>
    </div>
  );
};

export default MessagesCard;