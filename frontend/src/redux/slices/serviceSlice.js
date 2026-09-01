import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getServicesApi } from "../../services/serviceService";
import { getErrorMessage } from "../../services/api";

const initialState = {
  items: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getServicesApi();
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.services;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default serviceSlice.reducer;
