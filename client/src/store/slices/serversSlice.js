import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { serversAPI } from '../../utils/api';

export const fetchServersThunk = createAsyncThunk(
  'servers/fetchServers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await serversAPI.fetchServers();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch servers');
    }
  }
);

const serversSlice = createSlice({
  name: 'servers',
  initialState: {
    servers: [],
    selectedServer: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectServer: (state, action) => {
      state.selectedServer = action.payload;
    },
    addServer: (state, action) => {
      state.servers.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.servers = action.payload;
      })
      .addCase(fetchServersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectServer, addServer } = serversSlice.actions;
export default serversSlice.reducer;