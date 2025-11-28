import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onClose: () => void;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className="bg-white text-gray-800 p-4 rounded-xl shadow-xl border-2 border-red-200 max-w-md">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm mb-1 text-gray-900">Oops! Something went wrong</h4>
            <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 transform hover:scale-110"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-gray-500 text-xs">Try again or contact support if the issue persists</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorBanner;