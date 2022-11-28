import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import Route from "next/router";
import ApiMiddleware from "../../utils/ApiMiddleware";
import { useDispatch } from "react-redux";

const initialState = {
  isLoading: false,
  imageLoding: false,
  allData: null,
  userData: {},
  locationLoading: false,
  intrestLoading: false,
  image: "",
  userDataLoading: false,
  intrestLoading: false,
  userIntrest: [],
};

export const userDetails = createAsyncThunk("userDetails", async (values) => {
  try {
    const apidata = await ApiMiddleware.get("/user/me");

    if (!apidata?.data?.avatar) {
      return {
        image: "",
        role: apidata?.data?.role,
        userIntrest: apidata?.data?.interests,
      };
    } else {
      return {
        image: apidata?.data?.avatar,
        role: apidata?.data?.role,
        userIntrest: apidata?.data?.interests,
      };
    }
  } catch (error) {
    console.log("data found er");
  }
});

export const upadeIntrestApi = createAsyncThunk(
  "upadeIntrestApi",
  async (values) => {
    try {
      const apidata = await ApiMiddleware.patch("/user", {
        interests: values,
      });

      toast.success(apidata.data.message);

      return apidata;
    } catch (error) {}
  }
);

export const changePasswordApi = createAsyncThunk(
  "changePasswordApi",
  async (values) => {
    try {
      const loginCredentials = await ApiMiddleware.post(
        "/user/change-password",
        {
          newPassword: values.newpassword,
          oldPassword: values.oldpassword,
        }
      );

      toast.success(loginCredentials.data.message);

      return loginCredentials;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const userImageUploadApi = createAsyncThunk(
  "userImageUploadApi",
  async (values, { dispatch }) => {
    try {
      const apidata = await ApiMiddleware.patch("/user", values, {
        headers: { "Content-Type": "multipart/form-data; " },
      });

      dispatch(userDetails());
      toast.success(apidata.data.message);

      return apidata;
    } catch (error) {
      if (!error) {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const changeUserDataApi = createAsyncThunk(
  "changeUserDataApi",
  async (values, { dispatch }) => {
    try {
      const apidata = await ApiMiddleware.patch("/user", {
        ...values,
      });

      toast.success(apidata.data.message);
      dispatch(userDetails());

      return loginCredentials;
    } catch (error) {
      if (!error) {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);

export const changeUserLocation = createAsyncThunk(
  "changeUserLocation",
  async (values) => {
    try {
      const apidata = await ApiMiddleware.patch("/user", {
        ...values,
      });

      toast.success(apidata.data.message);

      return loginCredentials;
    } catch (error) {
      if (!error) {
        toast.error(error?.response?.data?.message);
      }
    }
  }
);
const profileSlice = createSlice({
  name: "loginPage",
  initialState,
  reducers: {},
  extraReducers: {
    [changePasswordApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [changePasswordApi.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [changePasswordApi.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [changeUserDataApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [changeUserDataApi.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [changeUserDataApi.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [userImageUploadApi.pending]: (state, action) => {
      state.imageLoding = true;
    },
    [userImageUploadApi.fulfilled]: (state, action) => {
      state.imageLoding = false;
    },

    [userImageUploadApi.rejected]: (state, action) => {
      state.imageLoding = false;
    },
    [changeUserLocation.pending]: (state, action) => {
      state.locationLoading = true;
    },
    [changeUserLocation.fulfilled]: (state, action) => {
      state.locationLoading = false;
    },
    [changeUserLocation.rejected]: (state, action) => {
      state.locationLoading = false;
    },
    [upadeIntrestApi.pending]: (state, action) => {
      state.intrestLoading = true;
    },
    [upadeIntrestApi.fulfilled]: (state, action) => {
      state.intrestLoading = false;
    },

    [upadeIntrestApi.rejected]: (state, action) => {
      state.intrestLoading = false;
    },

    [userDetails.pending]: (state, action) => {
      state.userDataLoading = true;
    },
    [userDetails.fulfilled]: (state, action) => {
      state.image = action?.payload?.image;

      state.userIntrest = action.payload.userIntrest;

      localStorage.setItem("avatar", action?.payload?.image);
    },

    [userDetails.rejected]: (state, action) => {
      state.userDataLoading = false;
    },
  },
});

export default profileSlice.reducer;
