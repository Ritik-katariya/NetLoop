import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NoData = ({ size = "md" }) => {
  // Size variants mapping
  const sizeMap = {
    sm: "w-48 h-48",
    md: "w-64 h-64",
    lg: "w-96 h-96"
  };

  return (
    <div className="min-h-[500px] w-full flex flex-col items-center justify-center bg-white p-8">
      {/* Animation Container */}
      <div className={`relative ${sizeMap[size]} mb-8`}>
        {/* Outer rotating circles */}
        <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
          {[...Array(12)].map((_, index) => (
            <div
              key={`outer-${index}`}
              className="absolute w-3 h-3 rounded-full bg-cyan-500"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${index * 30}deg) translate(120px) scale(${1 - index * 0.07})`,
                opacity: 1 - index * 0.07,
                animation: 'pulse 2s ease-in-out infinite',
                animationDelay: `${index * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Middle rotating circles */}
        <div className="absolute inset-0 animate-[spin_6s_linear_infinite_reverse]">
          {[...Array(8)].map((_, index) => (
            <div
              key={`middle-${index}`}
              className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${index * 45}deg) translate(90px) scale(${1 - index * 0.08})`,
                opacity: 1 - index * 0.08,
                animation: 'pulse 2s ease-in-out infinite',
                animationDelay: `${index * 0.15}s`,
              }}
            />
          ))}
        </div>

        {/* Inner rotating circles */}
        <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
          {[...Array(6)].map((_, index) => (
            <div
              key={`inner-${index}`}
              className="absolute w-2 h-2 rounded-full bg-cyan-300"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${index * 60}deg) translate(60px) scale(${1 - index * 0.09})`,
                opacity: 1 - index * 0.09,
                animation: 'pulse 2s ease-in-out infinite',
                animationDelay: `${index * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Center element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Pulsing background */}
            <div className="absolute inset-0 bg-cyan-200 rounded-full animate-ping opacity-25" />
            {/* Center dot */}
            <div className="relative w-6 h-6 bg-cyan-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center space-y-6">
        <h3 className="text-4xl font-light text-cyan-500 animate-pulse">
          No Data Available
        </h3>
        
        <Link 
          to="/"
          className="inline-flex items-center px-6 py-3 text-sm text-white bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
        >
          <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          <span>Return Home</span>
        </Link>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, index) => (
          <div
            key={`decor-${index}`}
            className="absolute w-1 h-1 rounded-full bg-cyan-100"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse 2s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Add custom keyframes
const customStyles = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.7; }
  }
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

export default NoData;