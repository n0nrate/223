import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { channelsAPI } from '../../utils/api';

export const fetchChannelsThunk = createAsyncThunk(
  'channels/fetchChannels',
  async (serverId, { rejectWithValue }) => {
    try {
      const response = await channelsAPI.fetchChannels(serverId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch channels');
    }
  }
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    selectedChannel: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectChannel: (state, action) => {
      state.selectedChannel = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannelsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload;
      })
      .addCase(fetchChannelsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectChannel, addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;