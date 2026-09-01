import api from "./api";

export const createAppointmentApi = (formData) =>
  api.post("/appointments", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getMyAppointmentsApi = (params) =>
  api.get("/appointments", { params });

export const cancelAppointmentApi = (id) =>
  api.patch(`/appointments/${id}/cancel`);
