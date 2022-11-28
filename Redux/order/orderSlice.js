import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiMiddleware from '../../utils/ApiMiddleware';

const initialState = {
  orderData: {},
  tableOrderData: [],
  isLoading: false,
};

export const orderDetailsApi = createAsyncThunk('orderApi', async (orderId) => {
  try {
    const apiData = await ApiMiddleware.get(`/user/bookings/${orderId}`);

    return {
      data: apiData?.data?.data,
      table: apiData?.data?.data?.bookedTickets,
    };
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [orderDetailsApi.rejected]: (state, action) => {
      state.isLoading = true;
    },
    [orderDetailsApi.fulfilled]: (state, action) => {
      state.orderData = action.payload.data;
      state.tableOrderData = action.payload.table;
    },
    [orderDetailsApi.pending]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default orderSlice.reducer;
