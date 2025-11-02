import React from 'react';

interface ProgressBarProps {
  progress: number; // percentage 0-100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const percentage = Math.min(Math.max(progress, 0), 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-teal-500 h-4 rounded-full transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
