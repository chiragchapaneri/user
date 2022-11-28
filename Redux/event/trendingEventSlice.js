import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiMiddleware from '../utils/ApiMiddleware';
import toast from 'react-hot-toast';

const initialState = {
  trendingEvent: [],
};

export const trendingEventApi = createAsyncThunk(
  'page/forgot',
  async (values) => {
    try {
      const apidata = await ApiMiddleware.post('auth/password/forgot', values);
      toast.success('Link to reset password sent');
      return apidata;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const forgotSlice = createSlice({
  name: 'forgotpage',
  initialState,
  reducers: {},
  extraReducers: {
    [trendingEventApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [trendingEventApi.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [trendingEventApi.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default trendingEventSlice.reducer;
