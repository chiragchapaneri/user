import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiMiddleware from "../../utils/ApiMiddleware";

const initialState = {
  isLoading: true,
  isLoadingOrganization: true,
  allOrganizations: [],
  eventsList: [],
  currentPage: 1,
  totalPages: 1,
  totalRecords: 0,
  limit: 20,
  error: "",
};
export const fetchEventsData = createAsyncThunk(
  "allData/fetchEventsData",
  async (data) => {
    const apidata = await ApiMiddleware.get(
      `/admin/list/events?limit=${data?.limit || ""}&orderBy=${
        data?.orderBy || ""
      }&page=${data?.page || ""}&search=${data?.search || ""}&location=${
        data?.location || ""
      }&organizationId=${data?.organizationId || ""}&startDate=${
        data?.startDate || ""
      }&endDate=${data?.endDate || ""}`
    );
    return apidata.data;
  }
);
export const allOrganizationsData = createAsyncThunk(
  "allData/allOrganizationsData",
  async () => {
    try {
      const apidata = await ApiMiddleware.get(`/dropdown/organizations`);
      return apidata.data.data;
    } catch (error) {}
  }
);

const eventsSlice = createSlice({
  name: "eventsPage",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEventsData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchEventsData.fulfilled]: (state, action) => {
      const { data, page, totalPages, totalRecords, limit } = action.payload;
      state.isLoading = false;
      state.eventsList = [...data];
      state.currentPage = page;
      state.totalPages = totalPages;
      state.limit = limit;
      state.totalRecords = totalRecords;
    },
    [fetchEventsData.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [allOrganizationsData.pending]: (state, action) => {
      state.isLoadingOrganization = true;
    },
    [allOrganizationsData.fulfilled]: (state, action) => {
      state.isLoadingOrganization = false;
      state.allOrganizations = action.payload;
    },
    [allOrganizationsData.rejected]: (state, action) => {
      state.isLoadingOrganization = false;
    },
  },
});

export default eventsSlice.reducer;
