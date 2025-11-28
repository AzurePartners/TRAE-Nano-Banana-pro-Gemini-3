import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Processing...' }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-gray-500 rounded-full animate-ping opacity-30"></div>
        <div className="relative bg-gradient-to-r from-emerald-500 to-gray-600 p-4 rounded-full">
          <Sparkles className="w-8 h-8 text-white animate-pulse" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{message}</h3>
        <p className="text-gray-500 text-sm">This may take a moment...</p>
      </div>
      
      <div className="flex items-center justify-center space-x-2">
        <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
        <span className="text-gray-600 text-sm font-medium">AI is working its magic</span>
      </div>
      
      <div className="flex space-x-1 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;