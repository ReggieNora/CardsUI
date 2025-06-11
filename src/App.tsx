import React, { useState, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import GradientBackground from './components/GradientBackground';

function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  // User type state
  const [userType, setUserType] = useState<'candidate' | 'employer' | null>(() => {
    const storedType = localStorage.getItem('userType');
    return storedType === 'candidate' || storedType === 'employer' ? storedType : null;
  });

  // Authentication handlers
  const handleAuthSuccess = useCallback((type: 'candidate' | 'employer') => {
    setUserType(type);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userType', type);
  }, []);

  const handleSignupSuccess = useCallback((type: 'candidate' | 'employer') => {
    setUserType(type);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userType', type);
  }, []);

  // Show landing page if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center relative">
        <GradientBackground animated={true} />
        <LandingPage 
          onAuthSuccess={handleAuthSuccess}
          onSignupSuccess={handleSignupSuccess}
        />
      </div>
    );
  }

  // Show main app content when authenticated
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative">
      <GradientBackground animated={true} />
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Hirly!</h1>
        <p className="text-xl mb-6">You are logged in as: {userType}</p>
        <div className="space-x-4">
          <button
            onClick={() => window.location.href = '/app/cards'}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition-colors"
          >
            Go to Card Hub
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              setIsAuthenticated(false);
              setUserType(null);
            }}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;