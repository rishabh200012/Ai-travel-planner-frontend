"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import TripCard from "@/components/TripCard";
import { getAllTrips, deleteTrip } from "@/services/trip.service";
import { getMe } from "@/services/auth.service";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const meRes = await getMe();

      setUser(meRes.userData);

      const tripsRes = await getAllTrips();

      setTrips(tripsRes.trips || []);
    } catch (error) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (tripId) => {
    try {
      await deleteTrip(tripId);

      setTrips((prev) => prev.filter((trip) => trip._id !== tripId));

      toast.success("Trip deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="container-custom section-padding">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome {user?.name}</h1>

          <p className="text-gray-500">Manage your trips</p>
        </div>

        <button
          onClick={() => router.push("/create-trip")}
          className="bg-black text-white px-5 py-3 rounded-lg"
        >
          Create Trip
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="border rounded-xl p-8">
          <h2 className="text-xl font-semibold">No Trips Found</h2>

          <p className="mt-2 text-gray-500">Create your first trip.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip._id} trip={trip} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </main>
  );
}
