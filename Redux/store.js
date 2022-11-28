import createEventSlice from "./event/createEventSlice";

import manageEventSlice from "./event/manageEventSlice";

import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth/loginSlice";
import registerSlice from "./auth/registerSlice";
import eventForMeSlice from "./bookmarked/eventForMe";
import bookMarkedSlice from "./bookmarked/bookMarkedSlice";
import searchEventSlice from "./event/searchEvent";
import eventBookApiSlice from "./event/eventBook";
import myBookingSlice from "./bookmarked/myyBooking";
import categorieSlice from "./event/categorieSlice";
import orderSlice from "./order/orderSlice";
import profileSlice from "./settings/profileSlice";
import organizationSlice from "./admin/organizationSlice";
import customersSlice from "./admin/customersSlice";
import eventsSlice from "./admin/eventsSlice";
import bookingsSlice from "./admin/bookingsSlice";
const store = configureStore({
  reducer: {
    loginSlice,
    registerSlice,
    createEventSlice,
    eventForMeSlice,
    manageEventSlice,
    searchEventSlice,
    eventBookApiSlice,
    bookMarkedSlice,
    myBookingSlice,
    categorieSlice,
    orderSlice,
    profileSlice,
    organizationSlice,
    customersSlice,
    eventsSlice,
    bookingsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;
