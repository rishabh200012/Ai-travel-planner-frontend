"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import {
  generateItinerary,
  regenerateDay,
  addActivity,
  removeActivity,
} from "@/api/trip.api";

export default function ItinerarySection({ trip, setTrip }) {
  const [loading, setLoading] = useState(false);
  const [newActivity, setNewActivity] = useState({});

  const handleGenerateItinerary = async () => {
    try {
      setLoading(true);

      const response = await generateItinerary(trip._id);

      setTrip(response.trip);

      toast.success("Itinerary generated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to generate itinerary",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateDay = async (dayNumber) => {
    try {
      const response = await regenerateDay(trip._id, dayNumber);

      setTrip(response.trip);

      toast.success(response.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to regenerate day");
    }
  };

  const handleAddActivity = async (dayNumber) => {
    const activity = newActivity[dayNumber];

    if (!activity?.trim()) {
      return toast.error("Enter activity");
    }

    try {
      const response = await addActivity(trip._id, {
        day: dayNumber,
        activity,
      });

      setTrip(response.trip);

      setNewActivity((prev) => ({
        ...prev,
        [dayNumber]: "",
      }));

      toast.success(response.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add activity");
    }
  };

  const handleRemoveActivity = async (dayNumber, activityIndex) => {
    try {
      const response = await removeActivity(trip._id, {
        day: dayNumber,
        activityIndex,
      });

      setTrip(response.trip);

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to remove activity",
      );
    }
  };

  return (
    <div className="border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Itinerary</h2>

        {(!trip.itinerary || trip.itinerary.length === 0) && (
          <button
            onClick={handleGenerateItinerary}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            {loading ? "Generating..." : "Generate Itinerary"}
          </button>
        )}
      </div>

      {!trip.itinerary || trip.itinerary.length === 0 ? (
        <p className="text-gray-500">No itinerary generated yet.</p>
      ) : (
        <div className="space-y-6">
          {trip.itinerary.map((day) => (
            <div key={day.day} className="border rounded-lg p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <h3 className="text-xl font-bold">Day {day.day}</h3>

                <button
                  onClick={() => handleRegenerateDay(day.day)}
                  className="border px-4 py-2 rounded-lg"
                >
                  Regenerate Day
                </button>
              </div>

              <ul className="space-y-3">
                {day.activities?.map((activity, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border rounded-lg p-3"
                  >
                    <span>{activity}</span>

                    <button
                      onClick={() => handleRemoveActivity(day.day, index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col md:flex-row gap-3 mt-4">
                <input
                  type="text"
                  placeholder="Add new activity"
                  value={newActivity[day.day] || ""}
                  onChange={(e) =>
                    setNewActivity((prev) => ({
                      ...prev,
                      [day.day]: e.target.value,
                    }))
                  }
                  className="flex-1 border rounded-lg px-4 py-3"
                />

                <button
                  onClick={() => handleAddActivity(day.day)}
                  className="bg-black text-white px-5 py-3 rounded-lg"
                >
                  Add Activity
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
