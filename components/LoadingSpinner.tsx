
import React from 'react';

interface LoadingSpinnerProps {
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-dark-text-primary">
      <div className="w-12 h-12 border-4 border-dark-border border-t-brand-primary rounded-full animate-spin"></div>
      <p className="text-lg font-semibold tracking-wide">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
