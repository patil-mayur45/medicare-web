import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAppointmentApi,
  getMyAppointmentsApi,
  cancelAppointmentApi,
} from "../../services/appointmentService";
import { getErrorMessage } from "../../services/api";

const initialState = {
  items: [],
  listStatus: "idle", // idle | loading | succeeded | failed
  listError: null,
  createStatus: "idle",
  createError: null,
};

export const bookAppointment = createAsyncThunk(
  "appointments/book",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createAppointmentApi(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const fetchMyAppointments = createAsyncThunk(
  "appointments/fetchMine",
  async (params, { rejectWithValue }) => {
    try {
      const res = await getMyAppointmentsApi(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  "appointments/cancel",
  async (id, { rejectWithValue }) => {
    try {
      const res = await cancelAppointmentApi(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.items.unshift(action.payload.appointment);
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
      .addCase(fetchMyAppointments.pending, (state) => {
        state.listStatus = "loading";
        state.listError = null;
      })
      .addCase(fetchMyAppointments.fulfilled, (state, action) => {
        state.listStatus = "succeeded";
        state.items = action.payload.appointments;
      })
      .addCase(fetchMyAppointments.rejected, (state, action) => {
        state.listStatus = "failed";
        state.listError = action.payload;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        const idx = state.items.findIndex((a) => a._id === action.payload.appointment._id);
        if (idx !== -1) state.items[idx] = action.payload.appointment;
      });
  },
});

export const { resetCreateStatus } = appointmentSlice.actions;
export default appointmentSlice.reducer;
