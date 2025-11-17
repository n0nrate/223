import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import socket from '../utils/socket';

const MessageInput = () => {
  const [input, setInput] = useState('');
  const selectedChannel = useSelector((state) => state.channels.selectedChannel);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && selectedChannel) {
      socket.emit('send_message', { channelId: selectedChannel.id, content: input });
      setInput('');
    }
  };

  return (
    <div className="p-4 bg-gray-700">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-l focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;