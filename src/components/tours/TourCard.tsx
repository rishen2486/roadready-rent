"use client";

import { useState } from "react";
import Slider from "react-slick";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TourCardProps {
  tour: {
    id: string;
    name: string;
    region?: string;
    hours?: number;
    details?: string;
    photos?: string[];
    image_url?: string;
  };
}

export default function TourCard({ tour }: TourCardProps) {
  const [open, setOpen] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const displayPhotos = tour.photos && tour.photos.length > 0 ? tour.photos : tour.image_url ? [tour.image_url] : [];

  return (
    <div className="border rounded-lg shadow-md p-4 bg-card hover:shadow-lg transition-shadow">
      {/* Thumbnail (first photo) */}
      {displayPhotos.length > 0 ? (
        <img
          src={displayPhotos[0]}
          alt={tour.name}
          className="w-full h-40 object-cover rounded-md mb-3 cursor-pointer"
          onClick={() => setOpen(true)}
        />
      ) : (
        <div className="w-full h-40 bg-muted flex items-center justify-center rounded-md mb-3">
          <span className="text-muted-foreground">No Image</span>
        </div>
      )}

      <h3 className="text-lg font-semibold text-foreground">{tour.name}</h3>
      {tour.region && <p className="text-sm text-muted-foreground">{tour.region}</p>}

      <div className="flex gap-2 mt-2">
        {tour.hours && <Badge variant="secondary">{tour.hours} hours</Badge>}
      </div>

      {/* Details Button */}
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-3 w-full" 
        onClick={() => setOpen(true)}
      >
        View Details
      </Button>

      {/* Pop-up Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{tour.name}</DialogTitle>
          </DialogHeader>

          {/* Full Image Slider */}
          {displayPhotos.length > 0 && (
            <div className="mb-4 rounded-md overflow-hidden">
              {displayPhotos.length > 1 ? (
                <Slider {...sliderSettings}>
                  {displayPhotos.map((url: string, i: number) => (
                    <div key={i}>
                      <img 
                        src={url} 
                        alt={`${tour.name} - ${i + 1}`} 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img 
                  src={displayPhotos[0]} 
                  alt={tour.name} 
                  className="w-full h-64 object-cover rounded-md"
                />
              )}
            </div>
          )}

          {/* Tour Details */}
          <div className="space-y-3 text-sm">
            {tour.region && (
              <div className="flex justify-between">
                <span className="font-medium">Region:</span>
                <span>{tour.region}</span>
              </div>
            )}
            {tour.hours && (
              <div className="flex justify-between">
                <span className="font-medium">Duration:</span>
                <span>{tour.hours} hours</span>
              </div>
            )}
            {tour.details && (
              <div>
                <span className="font-medium">Details:</span>
                <p className="mt-1 text-muted-foreground">{tour.details}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
