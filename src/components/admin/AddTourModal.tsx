"use client";

import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AddTourModalProps {
  onClose: () => void;
}

export default function AddTourModal({ onClose }: AddTourModalProps) {
  const [form, setForm] = useState({
    name: "",
    hours: "",
    region: "",
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
        toast.error("You must be logged in to add tours");
        return;
      }

      // Upload photos
      const uploadedUrls: string[] = [];
      for (const file of photos) {
        const filePath = `tours/${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from("tour-images")
          .upload(filePath, file);

        if (error) {
          console.error("Upload error:", error);
          continue;
        }

        const publicUrl = supabase.storage
          .from("tour-images")
          .getPublicUrl(data.path).data.publicUrl;

        uploadedUrls.push(publicUrl);
      }

      const { error } = await supabase.from("tours").insert([
        {
          name: form.name,
          hours: form.hours ? parseInt(form.hours) : null,
          region: form.region,
          details: form.details,
          image_url: form.image_url,
          photos: uploadedUrls,
          user_id: user.id,
        },
      ]);

      if (error) {
        console.error("Error adding tour:", error.message);
        toast.error("Failed to add tour: " + error.message);
        return;
      }

      toast.success("Tour added successfully!");
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
        <h2 className="text-xl font-semibold mb-4 text-foreground">Add Tour</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name of Tour</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Island Discovery Tour"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="hours">Number of Hours</Label>
            <Input
              id="hours"
              name="hours"
              type="number"
              placeholder="8"
              value={form.hours}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              name="region"
              placeholder="e.g. North Coast"
              value={form.region}
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
              placeholder="Describe the tour..."
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
              className="bg-green-600 hover:bg-green-700 text-white"
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