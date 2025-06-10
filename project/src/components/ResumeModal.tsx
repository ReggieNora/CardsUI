import React from "react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative">
        <button
          className="absolute top-2 right-2 text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl p-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
