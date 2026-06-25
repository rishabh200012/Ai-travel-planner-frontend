import api from "@/lib/axios";

export const registerUser = async (userData) => {
  const response = await api.post("/register", userData);

  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await api.post("/verify-otp", data);

  return response.data;
};

export const resendOtp = async (email) => {
  const response = await api.post("/resend-otp", { email });

  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/login", data);

  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/me");

  return response.data;
};
