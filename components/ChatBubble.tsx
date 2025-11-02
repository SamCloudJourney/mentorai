import React from 'react';

export interface ChatBubbleProps {
  message: string;
  role: 'user' | 'assistant';
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, role }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div
        className={`px-4 py-2 rounded-lg ${
          isUser ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-900'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatBubble;
