import React from 'react';

interface XPBadgeProps {
  xp: number;
}

const XPBadge: React.FC<XPBadgeProps> = ({ xp }) => {
  return (
    <span className="inline-flex items-center px-2 py-1 bg-yellow-200 text-yellow-800 text-sm font-semibold rounded-full">
      {xp} XP
    </span>
  );
};

export default XPBadge;
