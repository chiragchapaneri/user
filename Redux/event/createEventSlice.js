import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiMiddleware from "../../utils/ApiMiddleware";
import toast from "react-hot-toast";
import Route from "next/router";

const initialState = {
  isLoading: false,
  createEventLoading: false,
  allDetails: null,
  categories: null,
  childCategories: null,
  type: null,
  eventTags: null,
  getSlug: null,
};

export const createEventFetchAPi = createAsyncThunk(
  "page/fetch",
  async (values) => {
    try {
      const CreateEventDetails = await ApiMiddleware.post("/event", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(CreateEventDetails.data.message);
      if (CreateEventDetails.status === 201) {
        Route.replace("/");
      }
      return CreateEventDetails;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const createEventType = createAsyncThunk("page/types", async () => {
  try {
    const CreateEventByType = await ApiMiddleware.get("/dropdown/event-types");
    return CreateEventByType.data;
  } catch (error) {}
});

export const createEventCategories = createAsyncThunk(
  "page/categories",
  async () => {
    try {
      const CreateEventByCategories = await ApiMiddleware.get(
        "/dropdown/categories"
      );
      return CreateEventByCategories.data;
    } catch (error) {}
  }
);

export const createEventChildCategories = createAsyncThunk(
  "page/childcategories",
  async (slug) => {
    try {
      const CreateEventByChildCategories = await ApiMiddleware.get(
        `/category/${slug}`,
        slug
      );
      return CreateEventByChildCategories.data;
    } catch (error) {}
  }
);

export const createEventTags = createAsyncThunk("page/eventtags", async () => {
  try {
    const CreateEventByChildCategories = await ApiMiddleware.get(`/event-tags`);
    return CreateEventByChildCategories.data;
  } catch (error) {}
});

const createEventSlice = createSlice({
  name: "createEventPage",
  initialState,
  reducers: {},
  extraReducers: {
    [createEventFetchAPi.pending]: (state, action) => {
      state.createEventLoading = true;
    },
    [createEventFetchAPi.fulfilled]: (state, action) => {
      state.createEventLoading = false;
      state.allDetails = action.payload?.data;
      // Route.replace("/");
    },
    [createEventFetchAPi.rejected]: (state, action) => {
      state.createEventLoading = false;
    },
    [createEventCategories.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createEventCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload?.data;
    },
    [createEventCategories.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [createEventChildCategories.pending]: (state, action) => {
      state.isLoading = true;
      state.childCategories = false;
    },
    [createEventChildCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.childCategories = action.payload?.data;
      state.getSlug = action.payload;
    },
    [createEventChildCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.childCategories = false;
    },
    [createEventType.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createEventType.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.type = action.payload?.data;
    },
    [createEventType.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [createEventTags.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createEventTags.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.eventTags = action.payload?.data;
    },
    [createEventTags.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default createEventSlice.reducer;
