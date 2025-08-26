import { useState } from "react";
import { Search, MapPin, Calendar, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
  className?: string;
}

export interface SearchFilters {
  location: string;
  pickupDate: string;
  returnDate: string;
  carType: string;
}

const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    pickupDate: "",
    returnDate: "",
    carType: "",
  });

  const handleSearch = () => {
    onSearch?.(filters);
  };

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className={`search-glass p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* Location */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Pickup Location
          </Label>
          <Input
            placeholder="City or Airport"
            value={filters.location}
            onChange={(e) => updateFilter("location", e.target.value)}
            className="bg-background/60"
          />
        </div>

        {/* Pickup Date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Pickup Date
          </Label>
          <Input
            type="date"
            value={filters.pickupDate}
            onChange={(e) => updateFilter("pickupDate", e.target.value)}
            className="bg-background/60"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Return Date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Return Date
          </Label>
          <Input
            type="date"
            value={filters.returnDate}
            onChange={(e) => updateFilter("returnDate", e.target.value)}
            className="bg-background/60"
            min={filters.pickupDate || new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Car Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Car className="h-4 w-4 text-primary" />
            Car Type
          </Label>
          <Select onValueChange={(value) => updateFilter("carType", value)}>
            <SelectTrigger className="bg-background/60">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="midsize">Midsize</SelectItem>
              <SelectItem value="fullsize">Full Size</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="convertible">Convertible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button 
          onClick={handleSearch}
          className="premium-button h-10"
          size="lg"
        >
          <Search className="h-4 w-4 mr-2" />
          Search Cars
        </Button>
      </div>
    </Card>
  );
};

export default SearchBar;