import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiMiddleware from "../../utils/ApiMiddleware";

const initialState = {
  isLoading: true,
  allOrganizations: [],
  bookingsList: [],
  currentPage: 1,
  totalPages: 1,
  totalRecords: 0,
  limit: 20,
  error: "",
};

export const fetchBookingsData = createAsyncThunk(
  "allData/fetchBookingsData",
  async (data) => {
    const apidata = await ApiMiddleware.get(
      `/admin/list/events/bookings?limit=${data?.limit || ""}&orderBy=${
        data?.orderBy || ""
      }&page=${data?.page || ""}&search=${data?.search || ""}&organizationId=${
        data?.organizationId || ""
      }&startDate=${data?.startDate || ""}&endDate=${data?.endDate || ""}`
    );
    return apidata.data;
  }
);

export const allOrganizationsData = createAsyncThunk(
  "allData/allOrganizationsData",
  async () => {
    const apidata = await ApiMiddleware.get(`/dropdown/organizations`);
    return apidata.data.data;
  }
);

const bookingsSlice = createSlice({
  name: "bookingsPage",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBookingsData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchBookingsData.fulfilled]: (state, action) => {
      const { data, page, totalPages, totalRecords, limit } = action.payload;
      state.isLoading = false;
      state.bookingsList = [...data];
      state.currentPage = page;
      state.totalPages = totalPages;
      state.limit = limit;
      state.totalRecords = totalRecords;
    },
    [fetchBookingsData.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [allOrganizationsData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [allOrganizationsData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allOrganizations = action.payload;
    },
    [allOrganizationsData.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default bookingsSlice.reducer;
