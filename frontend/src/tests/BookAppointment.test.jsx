import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./testUtils";
import BookAppointment from "../pages/BookAppointment";

vi.mock("../services/appointmentService", () => ({
  createAppointmentApi: vi.fn(),
  getMyAppointmentsApi: vi.fn(),
  cancelAppointmentApi: vi.fn(),
}));

import { createAppointmentApi } from "../services/appointmentService";

const loggedInState = {
  auth: {
    user: { _id: "u1", name: "Jane Doe", email: "jane@example.com" },
    token: "fake-token",
    status: "idle",
    error: null,
  },
};

describe("Book Appointment form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders specialty, date, time and comments fields", () => {
    renderWithProviders(<BookAppointment />, { preloadedState: loggedInState });

    expect(screen.getByLabelText(/doctor specialty/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preferred date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preferred time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/additional comments/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /confirm appointment/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitted without required fields", async () => {
    const user = userEvent.setup();
    renderWithProviders(<BookAppointment />, { preloadedState: loggedInState });

    await user.click(screen.getByRole("button", { name: /confirm appointment/i }));

    expect(await screen.findByText(/select a doctor specialty/i)).toBeInTheDocument();
    expect(await screen.findByText(/please select a date/i)).toBeInTheDocument();
    expect(await screen.findByText(/please select a time/i)).toBeInTheDocument();
    expect(createAppointmentApi).not.toHaveBeenCalled();
  });

  it("submits the form and calls the create-appointment API when valid", async () => {
    createAppointmentApi.mockResolvedValueOnce({
      data: {
        success: true,
        appointment: {
          _id: "a1",
          doctorType: "Cardiology",
          date: "2027-01-15",
          time: "10:00 AM",
          status: "pending",
        },
      },
    });

    const user = userEvent.setup();
    renderWithProviders(<BookAppointment />, { preloadedState: loggedInState });

    await user.selectOptions(screen.getByLabelText(/doctor specialty/i), "Cardiology");
    await user.type(screen.getByLabelText(/preferred date/i), "2027-01-15");
    await user.selectOptions(screen.getByLabelText(/preferred time/i), "10:00 AM");

    await user.click(screen.getByRole("button", { name: /confirm appointment/i }));

    await waitFor(() => expect(createAppointmentApi).toHaveBeenCalledTimes(1));
  });
});
