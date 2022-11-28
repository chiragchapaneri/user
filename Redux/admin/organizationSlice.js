import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiMiddleware from "../../utils/ApiMiddleware";
import toast from "react-hot-toast";

const initialState = {
  isLoading: true,
  organizationList: [],
  currentPage: 1,
  totalPages: 1,
  totalRecords: 0,
  limit: 20,
  error: "",
  eventsList: [],
  addOrganizationData: [],
  showForm: false,
  organizationFormSubmit: false,
  organizationFormEditSubmit: false,
};
export const fetchOrganizationData = createAsyncThunk(
  "allData/fetchOrganizationData",
  async (data) => {
    const apidata = await ApiMiddleware.get(
      `/organization?limit=${data?.limit || "20"}&orderBy=${
        data?.orderBy || ""
      }&page=${data?.page || "1"}&search=${data?.search || ""}`
    );
    return apidata?.data;
  }
);

export const deleteOrganizationData = createAsyncThunk(
  "organizationList/deleteOrganizationData",
  async (id, { dispatch }) => {
    try {
      const apidata = await ApiMiddleware.delete(`/organization/${id.id}`);
      dispatch(fetchOrganizationData());
      toast.success(apidata?.data?.message);
      return apidata?.data;
    } catch (error) {}
  }
);

export const fetchEventsData = createAsyncThunk(
  "eventsList/fetchEventsData",
  async (data) => {
    const apidata = await ApiMiddleware.get("/dropdown/event-types");
    return apidata.data.data;
  }
);
export const addOrganizationData = createAsyncThunk(
  "allData/addOrganizationData",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const apidata = await ApiMiddleware.post("/organization", data);
      dispatch(fetchOrganizationData());
      toast.success(apidata.data.message);
      return apidata;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

export const editOrganizationData = createAsyncThunk(
  "allData/editOrganizationData",
  async (data, { dispatch }) => {
    try {
      const apidata = await ApiMiddleware.patch(
        `/organization/${data.id}`,
        data.data
      );
      dispatch(fetchOrganizationData());
      toast.success(apidata.data.message);
      return apidata?.data;
    } catch (error) {}
  }
);

const organizationSlice = createSlice({
  name: "organizationPage",
  initialState,
  reducers: {
    setShowForm: (state, action) => {
      state.showForm = action.payload;
    },
  },
  extraReducers: {
    [fetchOrganizationData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchOrganizationData.fulfilled]: (state, action) => {
      const { data, page, totalPages, totalRecords, limit } = action.payload;
      state.isLoading = false;
      state.organizationList = [...data];
      state.currentPage = page;
      state.totalPages = totalPages;
      state.limit = limit;
      state.totalRecords = totalRecords;
    },
    [fetchOrganizationData.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [deleteOrganizationData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteOrganizationData.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    },
    [deleteOrganizationData.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [fetchEventsData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchEventsData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.eventsList = action.payload;
    },
    [fetchEventsData.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [addOrganizationData.pending]: (state, action) => {
      state.organizationFormSubmit = true;
    },
    [addOrganizationData.fulfilled]: (state, action) => {
      state.organizationFormSubmit = false;
      state.showForm = false;
    },
    [addOrganizationData.rejected]: (state, { payload }) => {
      state.organizationFormSubmit = false;
      toast.error(payload?.message);
    },

    [editOrganizationData.pending]: (state, action) => {
      state.organizationFormEditSubmit = true;
    },
    [editOrganizationData.fulfilled]: (state, action) => {
      state.organizationFormEditSubmit = false;
      state.showForm = false;
    },
    [editOrganizationData.rejected]: (state, action) => {
      state.organizationFormEditSubmit = false;
    },
  },
});

export const { setShowForm } = organizationSlice.actions;
export default organizationSlice.reducer;
