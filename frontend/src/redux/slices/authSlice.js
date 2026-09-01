import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupApi, loginApi, getMeApi, updateProfileApi } from "../../services/authService";
import { getErrorMessage } from "../../services/api";

const storedUser = (() => {
  try {
    const raw = localStorage.getItem("medicare_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

const initialState = {
  user: storedUser,
  token: localStorage.getItem("medicare_token") || null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

export const signup = createAsyncThunk("auth/signup", async (data, { rejectWithValue }) => {
  try {
    const res = await signupApi(data);
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await loginApi(data);
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, { rejectWithValue }) => {
  try {
    const res = await getMeApi();
    return res.data;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await updateProfileApi(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const persist = (token, user) => {
  localStorage.setItem("medicare_token", token);
  localStorage.setItem("medicare_user", JSON.stringify(user));
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("medicare_token");
      localStorage.removeItem("medicare_user");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        persist(action.payload.token, action.payload.user);
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        persist(action.payload.token, action.payload.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("medicare_user", JSON.stringify(action.payload.user));
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        localStorage.setItem("medicare_user", JSON.stringify(action.payload.user));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
