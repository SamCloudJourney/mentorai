import React from 'react';

interface LessonCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ title, description, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md cursor-pointer" onClick={onClick}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default LessonCard;
