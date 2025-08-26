import { useState } from "react";
import { ArrowRight, Star, Shield, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SearchBar, { SearchFilters } from "@/components/search/SearchBar";
import CarCard from "@/components/cars/CarCard";
import Navbar from "@/components/layout/Navbar";
import { Link } from "react-router-dom";

// Mock data for featured cars
const featuredCars = [
  {
    id: "1",
    name: "BMW 3 Series",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    rating: 4.8,
    reviews: 124,
    passengers: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    pricePerDay: 85,
    location: "Downtown",
    features: ["GPS", "Bluetooth", "Premium Sound"],
  },
  {
    id: "2",
    name: "Tesla Model 3",
    category: "Electric",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    rating: 4.9,
    reviews: 89,
    passengers: 5,
    transmission: "Automatic",
    fuel: "Electric",
    pricePerDay: 95,
    location: "Airport",
    features: ["Autopilot", "Supercharging", "Premium Interior"],
  },
  {
    id: "3",
    name: "Audi Q7",
    category: "SUV",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
    rating: 4.7,
    reviews: 156,
    passengers: 7,
    transmission: "Automatic",
    fuel: "Petrol",
    pricePerDay: 120,
    location: "City Center",
    features: ["AWD", "Panoramic Roof", "Premium Package"],
  },
];

const Index = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(null);

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
    // In a real app, this would navigate to /cars with search params
    console.log("Search filters:", filters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80')] bg-cover bg-center opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Premium Car Rental
            <span className="block bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Discover our premium fleet of vehicles and enjoy the freedom of the road. 
            From luxury sedans to spacious SUVs, find your perfect ride.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-5xl mx-auto mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="premium-button text-lg px-8 py-6" asChild>
              <Link to="/cars">
                Browse All Cars
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose CarsRus Rental?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience premium car rental with unmatched service and quality
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Star,
                title: "Premium Fleet",
                description: "Top-quality vehicles from leading brands, meticulously maintained for your comfort."
              },
              {
                icon: Shield,
                title: "Fully Insured",
                description: "Comprehensive insurance coverage and 24/7 roadside assistance for peace of mind."
              },
              {
                icon: Clock,
                title: "Instant Booking",
                description: "Book your perfect car in minutes with our streamlined reservation system."
              },
              {
                icon: Users,
                title: "Expert Support",
                description: "Professional customer service team ready to assist you every step of the way."
              }
            ].map((feature, index) => (
              <Card key={index} className="luxury-card text-center p-6">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Vehicles
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our handpicked selection of premium vehicles
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" variant="outline" className="px-8" asChild>
              <Link to="/cars">
                View All Cars
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 luxury-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Hit the Road?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied customers who trust CarsRus Rental for their transportation needs.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
            <Link to="/cars">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
