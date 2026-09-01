import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import authReducer from "../redux/slices/authSlice";
import appointmentReducer from "../redux/slices/appointmentSlice";
import serviceReducer from "../redux/slices/serviceSlice";
import uiReducer from "../redux/slices/uiSlice";

// Renders a component wrapped with a fresh Redux store + Router,
// so each test can supply its own preloaded state.
export function renderWithProviders(ui, { preloadedState = {}, route = "/" } = {}) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      appointments: appointmentReducer,
      services: serviceReducer,
      ui: uiReducer,
    },
    preloadedState,
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>
    ),
  };
}
