import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import serversReducer from './slices/serversSlice';
import channelsReducer from './slices/channelsSlice';
import messagesReducer from './slices/messagesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    servers: serversReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});

export default store;