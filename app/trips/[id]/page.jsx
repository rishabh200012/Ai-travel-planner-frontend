"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import TripHeader from "@/components/TripHeader";
import BudgetCard from "@/components/BudgetCard";
import HotelsList from "@/components/HotelsList";
import ItinerarySection from "@/components/ItinerarySection";
import PackingListSection from "@/components/PackingListSection";

import { getSingleTrip } from "@/services/trip.service";

export default function TripDetailsPage() {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTrip = async () => {
    try {
      const response = await getSingleTrip(id);

      setTrip(response.trip);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch trip");
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
      <main className="container-custom section-padding">
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!trip) {
    return (
      <main className="container-custom section-padding">
        <h1>Trip not found.</h1>
      </main>
    );
  }

  return (
    <main className="container-custom section-padding">
      <div className="space-y-6">
        <TripHeader trip={trip} />

        <BudgetCard budget={trip.estimatedBudget} />

        <HotelsList hotels={trip.hotels} />

        <ItinerarySection trip={trip} setTrip={setTrip} />

        <PackingListSection trip={trip} setTrip={setTrip} />
      </div>
    </main>
  );
}
