import React, { useState } from 'react';
import { User, Briefcase, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';

interface AuthFormProps {
  onAuthSuccess: (userType: 'candidate' | 'employer') => void;
  authAction: 'signin' | 'signup';
  userType: 'candidate' | 'employer';
  onUserTypeChange: (type: 'candidate' | 'employer') => void;
  onToggleAuthAction: () => void;
  onSignupSuccess?: (userType: 'candidate' | 'employer') => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onAuthSuccess,
  authAction,
  userType,
  onUserTypeChange,
  onToggleAuthAction,
  onSignupSuccess,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto p-8">
      {/* User type toggle/slider */}
      <div className="flex items-center justify-center gap-4 mb-6 w-full">
        <button
          className={`flex-1 px-6 py-2 rounded-xl flex items-center justify-center gap-2 text-lg font-semibold transition-colors ${
            userType === 'candidate'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'bg-black/30 text-white/60 border border-white/10'
          }`}
          onClick={() => onUserTypeChange('candidate')}
        >
          <User className="w-5 h-5" /> Candidate
        </button>
        <button
          className={`flex-1 px-6 py-2 rounded-xl flex items-center justify-center gap-2 text-lg font-semibold transition-colors ${
            userType === 'employer'
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
              : 'bg-black/30 text-white/60 border border-white/10'
          }`}
          onClick={() => onUserTypeChange('employer')}
        >
          <Briefcase className="w-5 h-5" /> Employer
        </button>
      </div>

      <h2 className="text-2xl font-bold text-white mb-3 text-center">
        {authAction === 'signin' ? 'Sign In' : 'Sign Up'} as{' '}
        {userType === 'candidate' ? 'Candidate' : 'Employer'}
      </h2>
      <p className="text-white/90 text-center whitespace-pre-line text-lg mb-6">
        {authAction === 'signin'
          ? 'Enter your credentials to sign in.'
          : 'Fill out the form to create your account.'}
      </p>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-3 rounded-xl border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {authAction === 'signup' && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-xl border border-white/20 bg-black/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        )}

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onAuthSuccess(userType);
            if (authAction === 'signup' && typeof onSignupSuccess === 'function') {
              onSignupSuccess(userType);
            }
          }}
          className="w-full mt-2 px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg flex items-center justify-center gap-2 hover:from-pink-600 hover:to-purple-600 transition-colors text-lg"
        >
          {authAction === 'signin' ? (
            <>
              <LogIn className="w-5 h-5" /> Sign In
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" /> Sign Up
            </>
          )}
        </button>

        {authAction === 'signin' && (
          <div className="w-full flex flex-col gap-3 mt-6">
            <button className="flex items-center justify-center gap-3 w-full py-2 rounded-xl bg-white/90 hover:bg-white text-gray-800 font-semibold shadow border border-white/30 transition-colors">
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>
          </div>
        )}

        <div className="mt-8 text-center">
          {authAction === 'signin' ? (
            <span className="text-white/70">
              New here?{' '}
              <button
                className="text-purple-300 hover:underline ml-1"
                onClick={onToggleAuthAction}
              >
                Sign up
              </button>
            </span>
          ) : (
            <span className="text-white/70">
              Already have an account?{' '}
              <button
                className="text-purple-300 hover:underline ml-1"
                onClick={onToggleAuthAction}
              >
                Sign in
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;