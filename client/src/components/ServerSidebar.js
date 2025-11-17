import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectServer } from '../store/slices/serversSlice';
import { fetchServersThunk } from '../store/slices/serversSlice';
import { fetchChannelsThunk } from '../store/slices/channelsSlice';

const ServerSidebar = () => {
  const servers = useSelector((state) => state.servers.servers);
  const selectedServer = useSelector((state) => state.servers.selectedServer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServersThunk());
  }, [dispatch]);

  const handleServerSelect = (server) => {
    dispatch(selectServer(server));
    dispatch(fetchChannelsThunk(server.id));
  };

  return (
    <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-2">
      {servers.map((server) => (
        <div
          key={server.id}
          className={`w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-500 ${
            selectedServer?.id === server.id ? 'bg-blue-600' : ''
          }`}
          onClick={() => handleServerSelect(server)}
        >
          {server.name.charAt(0).toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default ServerSidebar;