"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import TourCard from "@/components/tours/TourCard";

export default function Tours() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      const { data, error } = await supabase.from("tours").select("*");
      if (error) {
        console.error("Error fetching tours:", error.message);
        return;
      }
      setTours(data || []);
      setLoading(false);
    };

    fetchTours();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="text-center text-muted-foreground">Loading tours...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-foreground mb-6">Tours</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.length > 0 ? (
            tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground">
              No tours available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}