import React from "react";
import ReactDOM from "react-dom";

interface WelcomeModalProps {
  name: string;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ name, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-md mx-4 bg-white/10 border border-white/20 rounded-2xl shadow-2xl overflow-hidden p-8 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/20 transition-all duration-300 text-white/80 hover:text-white bg-white/5 border border-white/10 shadow-lg"
        >
          <span className="text-lg">×</span>
        </button>
        <h2 className="text-3xl font-bold text-white mb-4">Welcome, {name}!</h2>
        <p className="text-white/80 mb-6">Your account is ready. Explore the app and make the most of your new experience!</p>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:from-pink-500 hover:to-purple-500 transition-colors"
        >
          Let's Go!
        </button>
      </div>
    </div>,
    document.body
  );
};

export default React.memo(WelcomeModal);
