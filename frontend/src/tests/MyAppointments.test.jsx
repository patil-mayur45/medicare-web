import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "./testUtils";
import MyAppointments from "../pages/MyAppointments";

vi.mock("../services/appointmentService", () => ({
  createAppointmentApi: vi.fn(),
  getMyAppointmentsApi: vi.fn(),
  cancelAppointmentApi: vi.fn(),
}));

import { getMyAppointmentsApi } from "../services/appointmentService";

const loggedInState = {
  auth: {
    user: { _id: "u1", name: "Jane Doe", email: "jane@example.com" },
    token: "fake-token",
    status: "idle",
    error: null,
  },
};

const sampleAppointments = [
  {
    _id: "a1",
    doctorType: "Cardiology",
    date: "2027-02-10T00:00:00.000Z",
    time: "10:00 AM",
    status: "pending",
    comments: "Follow-up check",
  },
  {
    _id: "a2",
    doctorType: "Dermatology",
    date: "2026-11-05T00:00:00.000Z",
    time: "02:30 PM",
    status: "confirmed",
    comments: "",
  },
];

describe("My Appointments list", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a loading state while appointments are being fetched", async () => {
    let resolvePromise;
    getMyAppointmentsApi.mockReturnValueOnce(
      new Promise((resolve) => {
        resolvePromise = resolve;
      })
    );

    renderWithProviders(<MyAppointments />, { preloadedState: loggedInState });

    // Skeleton loaders render as generic status-less divs; assert real cards
    // aren't shown yet and the appointments heading is present.
    expect(screen.getByText(/my appointments/i)).toBeInTheDocument();
    expect(screen.queryByText("Cardiology")).not.toBeInTheDocument();

    resolvePromise({ data: { success: true, count: 0, appointments: [] } });
    await waitFor(() => expect(getMyAppointmentsApi).toHaveBeenCalled());
  });

  it("renders appointment cards once data has loaded", async () => {
    getMyAppointmentsApi.mockResolvedValueOnce({
      data: { success: true, count: 2, appointments: sampleAppointments },
    });

    renderWithProviders(<MyAppointments />, { preloadedState: loggedInState });

    expect(await screen.findByText("Cardiology")).toBeInTheDocument();
    expect(await screen.findByText("Dermatology")).toBeInTheDocument();
    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
    expect(screen.getByText("02:30 PM")).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
    expect(screen.getByText(/confirmed/i)).toBeInTheDocument();
  });

  it("shows an empty state when there are no appointments", async () => {
    getMyAppointmentsApi.mockResolvedValueOnce({
      data: { success: true, count: 0, appointments: [] },
    });

    renderWithProviders(<MyAppointments />, { preloadedState: loggedInState });

    expect(await screen.findByText(/no appointments yet/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /book an appointment/i })).toBeInTheDocument();
  });

  it("shows an error state with a retry option when the fetch fails", async () => {
    getMyAppointmentsApi.mockRejectedValueOnce({
      response: { data: { message: "Network error, please try again" } },
    });

    renderWithProviders(<MyAppointments />, { preloadedState: loggedInState });

    expect(await screen.findByText(/network error, please try again/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });
});
