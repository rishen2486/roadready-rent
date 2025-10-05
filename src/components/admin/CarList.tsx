"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

interface Car {
  id: string;
  name: string;
  brand: string;
  country?: string;
  price_per_day: number;
  user_id: string;
}

export default function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSuperuser, setIsSuperuser] = useState(false);

  useEffect(() => {
    checkSuperuserAndFetchCars();
  }, []);

  async function checkSuperuserAndFetchCars() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in");
        return;
      }

      // Check if user is superuser
      const { data: profile } = await supabase
        .from("profiles")
        .select("superuser")
        .eq("user_id", user.id)
        .single();

      const isSuper = profile?.superuser || false;
      setIsSuperuser(isSuper);

      // Fetch cars
      let query = supabase.from("cars").select("*");
      
      // If not superuser, only show their own cars
      if (!isSuper) {
        query = query.eq("user_id", user.id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching cars:", error);
        toast.error("Failed to load cars");
      } else {
        setCars(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, userId: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in");
        return;
      }

      // Only allow deletion if user owns the car or is superuser
      if (!isSuperuser && user.id !== userId) {
        toast.error("You can only delete your own cars");
        return;
      }

      const { error } = await supabase
        .from("cars")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting car:", error);
        toast.error("Failed to delete car");
      } else {
        toast.success("Car deleted successfully!");
        checkSuperuserAndFetchCars();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-foreground">Loading cars...</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-foreground mb-4">
        {isSuperuser ? "All Cars" : "Your Cars"}
      </h2>
      
      {cars.length === 0 ? (
        <p className="text-muted-foreground">No cars found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-border rounded-lg">
            <thead>
              <tr className="bg-muted">
                <th className="p-3 text-left text-foreground">Name</th>
                <th className="p-3 text-left text-foreground">Brand</th>
                <th className="p-3 text-left text-foreground">Country</th>
                <th className="p-3 text-left text-foreground">Price/Day</th>
                <th className="p-3 text-left text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id} className="border-t border-border hover:bg-muted/50">
                  <td className="p-3 text-foreground">{car.name}</td>
                  <td className="p-3 text-foreground">{car.brand}</td>
                  <td className="p-3 text-foreground">{car.country || "N/A"}</td>
                  <td className="p-3 text-foreground">Rs {car.price_per_day}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toast.info("Edit functionality coming soon")}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(car.id, car.user_id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
