import { Star, Users, Fuel, Gauge, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CarCardProps {
  car: {
    id: string;
    name: string;
    category: string;
    image: string;
    rating: number;
    reviews: number;
    passengers: number;
    transmission: string;
    fuel: string;
    pricePerDay: number;
    location: string;
    features: string[];
  };
}

const CarCard = ({ car }: CarCardProps) => {
  return (
    <Card className="car-card overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {car.category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{car.rating}</span>
            <span className="text-xs text-muted-foreground">({car.reviews})</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {car.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {car.location}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{car.passengers} seats</span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge className="h-4 w-4" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center gap-1">
              <Fuel className="h-4 w-4" />
              <span>{car.fuel}</span>
            </div>
          </div>

          {car.features.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {car.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {car.features.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{car.features.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="text-left">
          <div className="text-2xl font-bold text-foreground">
            ${car.pricePerDay}
            <span className="text-sm font-normal text-muted-foreground">/day</span>
          </div>
        </div>
        <Button asChild className="premium-button">
          <Link to={`/cars/${car.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;