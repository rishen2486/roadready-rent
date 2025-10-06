"use client";

import { useState } from "react";
import Slider from "react-slick";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BookingModal from "@/components/BookingModal";

interface CarCardProps {
  car: {
    id: string;
    name: string;
    brand?: string;
    seats?: number;
    transmission?: string;
    price_per_day?: number;
    mileage?: string;
    large_bags?: number;
    small_bags?: number;
    description?: string;
    photos?: string[];
    image_url?: string;
    features?: string[];
  };
}

export default function CarCardWithSlider({ car }: CarCardProps) {
  const [open, setOpen] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const displayPhotos = car.photos && car.photos.length > 0 ? car.photos : car.image_url ? [car.image_url] : [];

  return (
    <div className="border rounded-lg shadow-md p-4 bg-card hover:shadow-lg transition-shadow">
      {/* Thumbnail (first photo) */}
      {displayPhotos.length > 0 ? (
        <img
          src={displayPhotos[0]}
          alt={car.name}
          className="w-full h-40 object-cover rounded-md mb-3 cursor-pointer"
          onClick={() => setOpen(true)}
        />
      ) : (
        <div className="w-full h-40 bg-muted flex items-center justify-center rounded-md mb-3">
          <span className="text-muted-foreground">No Image</span>
        </div>
      )}

      <h3 className="text-lg font-semibold text-foreground">{car.name}</h3>
      {car.brand && <p className="text-sm text-muted-foreground">{car.brand}</p>}
      
      <div className="flex gap-2 mt-2 flex-wrap">
        {car.seats && <Badge variant="secondary">{car.seats} seats</Badge>}
        {car.transmission && <Badge variant="secondary">{car.transmission}</Badge>}
        {car.large_bags && <Badge variant="secondary">{car.large_bags} large bags</Badge>}
      </div>

      {car.price_per_day && (
        <p className="text-lg font-bold text-primary mt-3">Rs {car.price_per_day}/day</p>
      )}

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
            <DialogTitle className="text-2xl">{car.name}</DialogTitle>
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
                        alt={`${car.name} - ${i + 1}`} 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img 
                  src={displayPhotos[0]} 
                  alt={car.name} 
                  className="w-full h-64 object-cover rounded-md"
                />
              )}
            </div>
          )}

          {/* Car Details */}
          <div className="space-y-3 text-sm">
            {car.brand && (
              <div className="flex justify-between">
                <span className="font-medium">Brand:</span>
                <span>{car.brand}</span>
              </div>
            )}
            {car.seats && (
              <div className="flex justify-between">
                <span className="font-medium">Seats:</span>
                <span>{car.seats}</span>
              </div>
            )}
            {car.transmission && (
              <div className="flex justify-between">
                <span className="font-medium">Transmission:</span>
                <span>{car.transmission}</span>
              </div>
            )}
            {car.large_bags !== undefined && (
              <div className="flex justify-between">
                <span className="font-medium">Large Bags:</span>
                <span>{car.large_bags}</span>
              </div>
            )}
            {car.small_bags !== undefined && (
              <div className="flex justify-between">
                <span className="font-medium">Small Bags:</span>
                <span>{car.small_bags}</span>
              </div>
            )}
            {car.mileage && (
              <div className="flex justify-between">
                <span className="font-medium">Mileage:</span>
                <span>{car.mileage}</span>
              </div>
            )}
            {car.price_per_day && (
              <div className="flex justify-between">
                <span className="font-medium">Price per Day:</span>
                <span className="text-lg font-bold text-primary">Rs {car.price_per_day}</span>
              </div>
            )}
            {car.features && car.features.length > 0 && (
              <div>
                <span className="font-medium">Features:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {car.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline">{feature}</Badge>
                  ))}
                </div>
              </div>
            )}
            {car.description && (
              <div>
                <span className="font-medium">Description:</span>
                <p className="mt-1 text-muted-foreground">{car.description}</p>
              </div>
            )}
          </div>

          <Button 
            onClick={() => {
              setOpen(false);
              setShowBooking(true);
            }}
            className="w-full mt-4"
          >
            Book This Car
          </Button>
        </DialogContent>
      </Dialog>

      <BookingModal
        show={showBooking}
        onClose={() => setShowBooking(false)}
        item={car}
        type="car"
      />
    </div>
  );
}
