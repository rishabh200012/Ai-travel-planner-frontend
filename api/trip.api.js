import api from "@/lib/axios";

export const createTrip = async (data) => {
  const response = await api.post("/create-trip", data);

  return response.data;
};

export const getAllTrips = async () => {
  const response = await api.get("/get-all-trip");

  return response.data;
};

export const getSingleTrip = async (tripId) => {
  const response = await api.get(`/trip/${tripId}`);

  return response.data;
};

export const deleteTrip = async (tripId) => {
  const response = await api.delete(`/trip-delete/${tripId}`);

  return response.data;
};

export const updateTrip = async (id, data) => {
  const response = await api.put(`/trip-update/${id}`, data);

  return response.data;
};

export const generateItinerary = async (id) => {
  const response = await api.post(`/trip/${id}/generate`);

  return response.data;
};

export const regenerateDay = async (id, day) => {
  const response = await api.post(`/trip/${id}/regenerate-day`, { day });

  return response.data;
};

export const addActivity = async (id, data) => {
  const response = await api.patch(`/trip/${id}/activity/add`, data);

  return response.data;
};

export const removeActivity = async (id, data) => {
  const response = await api.patch(`/trip/${id}/activity/remove`, data);

  return response.data;
};

export const generatePackingList = async (id) => {
  const response = await api.post(`/trip/${id}/packing-list`);

  return response.data;
};
