import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../store/slices/messagesSlice';
import socket from '../utils/socket';
import MessageItem from './MessageItem';
import MessageInput from './MessageInput';

const ChatArea = () => {
  const messages = useSelector((state) => state.messages.messages);
  const selectedChannel = useSelector((state) => state.channels.selectedChannel);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNewMessage = (message) => {
      dispatch(addMessage(message));
    };

    socket.on('new_message', handleNewMessage);

    return () => {
      socket.off('new_message', handleNewMessage);
    };
  }, [dispatch]);

  return (
    <div className="flex-1 flex flex-col bg-gray-600">
      <div className="flex-1 p-4 overflow-y-auto">
        {selectedChannel ? (
          messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))
        ) : (
          <div className="text-gray-400 text-center mt-10">Select a channel to start chatting</div>
        )}
      </div>
      {selectedChannel && <MessageInput />}
    </div>
  );
};

export default ChatArea;