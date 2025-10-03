"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import AttractionCard from "@/components/attractions/AttractionCard";

export default function Attractions() {
  const [attractions, setAttractions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttractions = async () => {
      const { data, error } = await supabase.from("attractions").select("*");
      if (error) {
        console.error("Error fetching attractions:", error.message);
        return;
      }
      setAttractions(data || []);
      setLoading(false);
    };

    fetchAttractions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="text-center text-muted-foreground">Loading attractions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-foreground mb-6">Attractions</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.length > 0 ? (
            attractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground">
              No attractions available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}