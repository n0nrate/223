import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectChannel } from '../store/slices/channelsSlice';
import { fetchMessagesThunk } from '../store/slices/messagesSlice';
import socket from '../utils/socket';

const ChannelSidebar = () => {
  const channels = useSelector((state) => state.channels.channels);
  const selectedChannel = useSelector((state) => state.channels.selectedChannel);
  const dispatch = useDispatch();

  const handleChannelSelect = (channel) => {
    dispatch(selectChannel(channel));
    dispatch(fetchMessagesThunk(channel.id));
    socket.emit('join_channel', { channelId: channel.id });
  };

  return (
    <div className="w-64 bg-gray-700 p-4">
      <h2 className="text-white text-lg font-semibold mb-4">Channels</h2>
      <ul className="space-y-2">
        {channels.map((channel) => (
          <li
            key={channel.id}
            className={`text-gray-300 cursor-pointer hover:text-white p-2 rounded ${
              selectedChannel?.id === channel.id ? 'bg-gray-600' : ''
            }`}
            onClick={() => handleChannelSelect(channel)}
          >
            # {channel.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelSidebar;