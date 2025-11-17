import React from 'react';

const MessageItem = ({ message }) => {
  return (
    <div className="mb-4">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
          {message.author.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline space-x-2">
            <span className="text-white font-semibold">{message.author}</span>
            <span className="text-gray-400 text-sm">{new Date(message.timestamp).toLocaleString()}</span>
          </div>
          <p className="text-gray-300 mt-1">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;