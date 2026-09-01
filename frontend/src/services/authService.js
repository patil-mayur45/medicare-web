import api from "./api";

export const signupApi = (data) => api.post("/auth/signup", data);
export const loginApi = (data) => api.post("/auth/login", data);
export const getMeApi = () => api.get("/auth/me");
export const updateProfileApi = (formData) =>
  api.put("/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
