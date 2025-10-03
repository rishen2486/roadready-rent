"use client";

import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AddAttractionModalProps {
  onClose: () => void;
}

export default function AddAttractionModal({ onClose }: AddAttractionModalProps) {
  const [form, setForm] = useState({
    name: "",
    region: "",
    hours: "",
    details: "",
    image_url: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files).slice(0, 5));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to add attractions");
        return;
      }

      // Upload photos
      const uploadedUrls: string[] = [];
      for (const file of photos) {
        const filePath = `attractions/${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from("attraction-images")
          .upload(filePath, file);

        if (error) {
          console.error("Upload error:", error);
          continue;
        }

        const publicUrl = supabase.storage
          .from("attraction-images")
          .getPublicUrl(data.path).data.publicUrl;

        uploadedUrls.push(publicUrl);
      }

      const { error } = await supabase.from("attractions").insert([
        {
          name: form.name,
          region: form.region,
          hours: form.hours ? parseInt(form.hours) : null,
          details: form.details,
          image_url: form.image_url,
          photos: uploadedUrls,
          user_id: user.id,
        },
      ]);

      if (error) {
        console.error("Error adding attraction:", error.message);
        toast.error("Failed to add attraction: " + error.message);
        return;
      }

      toast.success("Attraction added successfully!");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-background p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Add Attraction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name of Attraction</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Black River Gorges"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              name="region"
              placeholder="e.g. Southwest"
              value={form.region}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="hours">Number of Hours (optional)</Label>
            <Input
              id="hours"
              name="hours"
              type="number"
              placeholder="3"
              value={form.hours}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="photos">Photos (up to 5 images)</Label>
            <Input
              id="photos"
              name="photos"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {photos.length > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {photos.length} file(s) selected
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="details">Other Details</Label>
            <Textarea
              id="details"
              name="details"
              placeholder="Describe the attraction..."
              value={form.details}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}