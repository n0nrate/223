import React from 'react';
import ServerSidebar from '../components/ServerSidebar';
import ChannelSidebar from '../components/ChannelSidebar';
import ChatArea from '../components/ChatArea';

const Home = () => {
  return (
    <div className="flex h-screen">
      <ServerSidebar />
      <ChannelSidebar />
      <ChatArea />
    </div>
  );
};

export default Home;