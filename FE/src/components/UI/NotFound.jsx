import React from 'react';

const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#03c6c7]/10 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <div className="mb-8 relative">
          <div className="absolute -left-16 -top-16 opacity-10">
            <svg viewBox="0 0 100 100" className="w-48 h-48 text-[#03c6c7]">
              <circle cx="50" cy="50" r="45" fill="currentColor" fillOpacity="0.1" />
              <path d="M50 10 L70 50 L50 90 L30 50 Z" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </div>
          <h1 className="text-9xl font-bold text-[#03c6c7] drop-shadow-md">
            404
          </h1>
          <p className="text-2xl font-semibold text-gray-800 mt-4">
            Oops! Page Not Found
          </p>
          <p className="text-gray-600 mt-2">
            The page you're looking for seems to have wandered off into the social media void.
          </p>
        </div>
        
        <div className="flex justify-center space-x-4 mt-8">
          <button 
            onClick={handleGoHome} 
            className="flex items-center bg-[#03c6c7] text-white px-6 py-3 rounded-full hover:bg-[#03c6c7]/90 transition-colors"
          >
            ↖ Go Home
          </button>
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
          >
            ← Go Back
          </button>
        </div>
        
        <div className="mt-12 text-gray-500 text-sm">
          Need help? <a href="/support" className="text-[#03c6c7] hover:underline">Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;