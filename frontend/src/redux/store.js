import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import appointmentReducer from "./slices/appointmentSlice";
import serviceReducer from "./slices/serviceSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    services: serviceReducer,
    ui: uiReducer,
  },
});

export default store;
