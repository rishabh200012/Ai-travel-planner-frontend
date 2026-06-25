"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import TripCard from "@/components/TripCard";

import { getAllTrips, deleteTrip } from "@/api/trip.api";
import { getMe } from "@/api/auth.api";

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
      <>
        <Navbar />

        <main className="min-h-[calc(100vh-64px)] flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />

            <p className="mt-5 text-lg font-medium text-gray-600">
              Loading your trips...
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="container-custom py-10">
        {/* Hero */}

        <section className="overflow-hidden rounded-3xl bg-linear-to-r from-blue-700 via-indigo-600 to-violet-700 p-8 text-white shadow-2xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-blue-100">Welcome Back 👋</p>

              <h1 className="text-4xl font-bold">{user?.name}</h1>

              <p className="mt-3 max-w-xl text-blue-100">
                Organize your trips, generate AI itineraries, estimate budgets
                and enjoy stress-free travel planning.
              </p>
            </div>

            <button
              onClick={() => router.push("/create-trip")}
              className="rounded-2xl bg-white px-8 py-4 font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:scale-105"
            >
              + Create New Trip
            </button>
          </div>
        </section>

        {/* Stats */}

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow">
            <p className="text-gray-500">Total Trips</p>

            <h2 className="mt-3 text-4xl font-bold text-blue-600">
              {trips.length}
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow">
            <p className="text-gray-500">Planned Days</p>

            <h2 className="mt-3 text-4xl font-bold text-indigo-600">
              {trips.reduce((sum, trip) => sum + trip.days, 0)}
            </h2>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow">
            <p className="text-gray-500">Destinations</p>

            <h2 className="mt-3 text-4xl font-bold text-violet-600">
              {new Set(trips.map((trip) => trip.destination)).size}
            </h2>
          </div>
        </section>

        {/* Trips */}

        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Your Trips</h2>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              {trips.length} Trip{trips.length !== 1 && "s"}
            </span>
          </div>

          {trips.length === 0 ? (
            <div className="rounded-3xl border border-dashed bg-white py-20 text-center shadow">
              <div className="text-7xl">🌍</div>

              <h2 className="mt-6 text-3xl font-bold">No Trips Yet</h2>

              <p className="mx-auto mt-3 max-w-md text-gray-500">
                Create your first AI-powered trip and start exploring the world
                smarter.
              </p>

              <button
                onClick={() => router.push("/create-trip")}
                className="mt-8 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105"
              >
                Create Your First Trip
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {trips.map((trip) => (
                <TripCard key={trip._id} trip={trip} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
