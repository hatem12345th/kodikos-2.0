import React, { useState } from 'react';
import { FileText } from 'lucide-react';

export default function ProgressScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(45);

  // Simulate progress
  React.useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return 95;
        return prev + Math.random() * 15;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleComplete = () => {
    setProgress(100);
    setTimeout(() => setIsLoading(false), 500);
  };

  if (!isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <p className="text-white text-xl font-semibold mb-4">Upload Complete!</p>
          <button
            onClick={() => {
              setIsLoading(true);
              setProgress(45);
            }}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Upload Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center  ">
      <div className="text-center max-w-sm">
        {/* Document Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-20 h-20">
            <svg
              className="w-full h-full"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              color="#3B82F6"
            >
              {/* Document outline */}
              <path d="M16 4h24v20h12v36H16z" />
              {/* Folded corner */}
              <path d="M40 4v20h12" />
              {/* Page lines */}
              <line x1="20" y1="28" x2="44" y2="28" />
              <line x1="20" y1="36" x2="44" y2="36" />
              <line x1="20" y1="44" x2="40" y2="44" />
            </svg>
            {/* Checkmark animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-400 animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Status Text */}
        <h2 className="text-white text-lg font-semibold mb-6">
          Extracting Data from Invoice ...
        </h2>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full  from-blue-500 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Progress Text */}
        <p className="text-gray-400 text-sm mb-8">{Math.round(progress)}% Complete</p>

        {/* Demo Button */}
        <button
          onClick={handleComplete}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          Simulate Complete
        </button>
      </div>
    </div>
  );
}