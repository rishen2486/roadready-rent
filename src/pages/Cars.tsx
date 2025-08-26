import { useState } from "react";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import SearchBar, { SearchFilters } from "@/components/search/SearchBar";
import CarCard from "@/components/cars/CarCard";
import Navbar from "@/components/layout/Navbar";

// Mock car data
const mockCars = [
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
  {
    id: "4",
    name: "Mercedes C-Class",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    rating: 4.6,
    reviews: 98,
    passengers: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    pricePerDay: 90,
    location: "Downtown",
    features: ["Heated Seats", "Premium Sound", "Navigation"],
  },
  {
    id: "5",
    name: "Toyota Camry",
    category: "Midsize",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
    rating: 4.4,
    reviews: 203,
    passengers: 5,
    transmission: "Automatic",
    fuel: "Hybrid",
    pricePerDay: 65,
    location: "Airport",
    features: ["Fuel Efficient", "Safety Features", "Comfortable"],
  },
  {
    id: "6",
    name: "Jeep Wrangler",
    category: "SUV",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    rating: 4.5,
    reviews: 87,
    passengers: 5,
    transmission: "Manual",
    fuel: "Petrol",
    pricePerDay: 75,
    location: "City Center",
    features: ["4WD", "Convertible Top", "Off-Road Ready"],
  },
];

const Cars = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(null);
  const [sortBy, setSortBy] = useState("price");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([50, 150]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = ["Economy", "Compact", "Midsize", "Luxury", "SUV", "Electric"];

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const filteredCars = mockCars.filter(car => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(car.category)) {
      return false;
    }
    if (car.pricePerDay < priceRange[0] || car.pricePerDay > priceRange[1]) {
      return false;
    }
    return true;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.pricePerDay - b.pricePerDay;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-luxury py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Your Perfect Car
            </h1>
            <p className="text-xl text-white/90">
              Choose from our premium fleet of vehicles
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Sort by:</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {sortedCars.length} cars found
              </span>
              <div className="border-l border-border pl-4 flex gap-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            {showFilters && (
              <div className="lg:col-span-1">
                <Card className="luxury-card p-6 sticky top-8">
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold mb-4 flex items-center gap-2">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                      </Label>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Price Range</Label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={200}
                        min={25}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Categories</Label>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={category}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={(checked) => 
                                handleCategoryChange(category, checked as boolean)
                              }
                            />
                            <Label htmlFor={category} className="text-sm">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        setSelectedCategories([]);
                        setPriceRange([50, 150]);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* Car Grid */}
            <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {sortedCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>

              {sortedCars.length === 0 && (
                <Card className="luxury-card p-12 text-center">
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-2">No cars found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search criteria
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSelectedCategories([]);
                        setPriceRange([50, 150]);
                        setSearchFilters(null);
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cars;