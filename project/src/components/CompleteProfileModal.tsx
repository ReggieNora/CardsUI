import React, { useState } from 'react';

interface CompleteProfileModalProps {
  onComplete: (profile: { name: string; resumeFile?: File | null }) => void;
  onClose: () => void;
}

import ReactDOM from 'react-dom';

const CompleteProfileModal: React.FC<CompleteProfileModalProps> = ({ onComplete, onClose }) => {
  const [name, setName] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate async save
    setTimeout(() => {
      onComplete({ name, resumeFile });
      setSubmitting(false);
    }, 500);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-lg mx-4 bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/20 transition-all duration-300 text-white/80 hover:text-white bg-white/5 border border-white/10 shadow-lg"
        >
          <span className="text-lg">×</span>
        </button>
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Complete Your Profile</h2>
        <p className="text-white/80 mb-6 text-center">Welcome! Please tell us a bit more about yourself to get started.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/80 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full p-3 rounded-xl border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Upload Resume (PDF, DOCX, etc.)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="w-full text-white"
            />
            {resumeFile && (
              <div className="mt-2 text-white/70 text-sm">Selected: {resumeFile.name}</div>
            )}
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:from-pink-500 hover:to-purple-500 transition-colors"
          >
            {submitting ? 'Saving...' : 'Finish'}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default React.memo(CompleteProfileModal);
