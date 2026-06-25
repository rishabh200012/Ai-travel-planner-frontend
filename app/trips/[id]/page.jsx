"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import TripHeader from "@/components/TripHeader";
import BudgetCard from "@/components/BudgetCard";
import HotelsList from "@/components/HotelsList";
import ItinerarySection from "@/components/ItinerarySection";
import PackingListSection from "@/components/PackingListSection";

import { getSingleTrip } from "@/api/trip.api";

export default function TripDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTrip = async () => {
    try {
      setLoading(true);

      const response = await getSingleTrip(id);

      setTrip(response.trip);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to fetch trip.");

      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTrip();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="container-custom py-10">
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-14 w-14 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />

              <h2 className="mt-6 text-2xl font-semibold">
                Loading your trip...
              </h2>

              <p className="mt-2 text-gray-500">
                Preparing your travel details.
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!trip) {
    return (
      <>
        <Navbar />

        <main className="container-custom py-10">
          <div className="rounded-3xl border bg-white py-24 text-center shadow">
            <div className="text-7xl">🧳</div>

            <h1 className="mt-6 text-4xl font-bold">Trip Not Found</h1>

            <p className="mx-auto mt-4 max-w-lg text-gray-500">
              This trip doesn't exist or you don't have permission to view it.
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
        <div className="space-y-8">
          <TripHeader trip={trip} />

          <BudgetCard budget={trip.estimatedBudget} />

          <HotelsList hotels={trip.hotels} />

          <ItinerarySection trip={trip} setTrip={setTrip} />

          <PackingListSection trip={trip} setTrip={setTrip} />
        </div>
      </main>
    </>
  );
}
