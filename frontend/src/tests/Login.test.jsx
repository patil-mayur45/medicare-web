import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./testUtils";
import Login from "../pages/Login";

// Mock the API layer so no real network calls are made
vi.mock("../services/authService", () => ({
  loginApi: vi.fn(),
  signupApi: vi.fn(),
  getMeApi: vi.fn(),
  updateProfileApi: vi.fn(),
}));

import { loginApi } from "../services/authService";

describe("Login form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders email and password fields plus a submit button", () => {
    renderWithProviders(<Login />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);

    await user.click(screen.getByRole("button", { name: /log in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
    expect(loginApi).not.toHaveBeenCalled();
  });

  it("shows an error for an invalid email format", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);

    await user.type(screen.getByLabelText(/email address/i), "not-an-email");
    await user.tab(); // triggers blur validation

    expect(await screen.findByText(/enter a valid email/i)).toBeInTheDocument();
  });

  it("submits valid credentials and calls the login API", async () => {
    loginApi.mockResolvedValueOnce({
      data: {
        success: true,
        token: "fake-token",
        user: { _id: "1", name: "Jane Doe", email: "jane@example.com" },
      },
    });

    const user = userEvent.setup();
    renderWithProviders(<Login />);

    await user.type(screen.getByLabelText(/email address/i), "jane@example.com");
    await user.type(screen.getByLabelText(/^password/i), "password123");
    await user.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => expect(loginApi).toHaveBeenCalledWith({
      email: "jane@example.com",
      password: "password123",
    }));
  });
});
