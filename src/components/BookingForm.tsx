import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, MapPin, User, Mail, Phone, X, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

interface Car {
  id: string;
  name: string;
  image_url?: string;
  price_per_day: number;
  description: string;
}

interface BookingFormProps {
  car: Car;
  onClose: () => void;
}

export function BookingForm({ car, onClose }: BookingFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    pickupLocation: '',
    pickupTime: '',
    dropoffLocation: '',
    returnTime: '',
  });

  // Fetch booked dates for this car
  useEffect(() => {
    const fetchBookedDates = async () => {
      const { data } = await supabase
        .from('car_availability')
        .select('start_date, end_date')
        .eq('car_id', car.id);

      if (data) {
        const dates: Date[] = [];
        data.forEach(booking => {
          const start = new Date(booking.start_date);
          const end = new Date(booking.end_date);
          
          // Add all dates in the range
          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
          }
        });
        setBookedDates(dates);
      }
    };

    fetchBookedDates();
  }, [car.id]);

  const calculateTotalAmount = () => {
    if (!dateRange?.from || !dateRange?.to) return 0;
    
    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    return diffDays * car.price_per_day;
  };

  const handleClearDates = () => {
    setDateRange(undefined);
  };

  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate => 
      bookedDate.toDateString() === date.toDateString()
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get current user if authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      const totalAmount = calculateTotalAmount();
      
      if (totalAmount <= 0) {
        toast({
          title: "Invalid dates",
          description: "Please select valid pickup and drop-off dates.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Store booking data in localStorage for receipt generation
      const bookingData = {
        car_name: car.name,
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        customer_phone: formData.customerPhone,
        pickup_location: formData.pickupLocation,
        pickup_time: formData.pickupTime,
        dropoff_location: formData.dropoffLocation,
        return_time: formData.returnTime,
        start_date: dateRange!.from!.toISOString().split('T')[0],
        end_date: dateRange!.to!.toISOString().split('T')[0],
        total_amount: totalAmount,
      };

      // Create booking
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert({
          user_id: user?.id || null,
          car_id: car.id,
          customer_name: formData.customerName,
          customer_email: formData.customerEmail,
          customer_phone: formData.customerPhone,
          start_date: dateRange!.from!.toISOString().split('T')[0],
          end_date: dateRange!.to!.toISOString().split('T')[0],
          pickup_location: formData.pickupLocation,
          dropoff_location: formData.dropoffLocation,
          total_amount: totalAmount,
          payment_status: 'pending',
          item_type: 'car',
          item_id: car.id,
        })
        .select()
        .single();

      if (booking) {
        localStorage.setItem(`booking_${booking.id}`, JSON.stringify({
          ...bookingData,
          booking_id: booking.id,
        }));
      }

      if (error) {
        console.error('Booking error:', error);
        toast({
          title: "Booking failed",
          description: "There was an error creating your booking. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Add to car_availability table
      const { error: availabilityError } = await supabase
        .from('car_availability')
        .insert({
          car_id: car.id,
          start_date: dateRange!.from!.toISOString().split('T')[0],
          end_date: dateRange!.to!.toISOString().split('T')[0],
          booking_id: booking.id,
        });

      if (availabilityError) {
        console.error('Availability error:', availabilityError);
      }

      toast({
        title: "Booking created!",
        description: "Redirecting to payment...",
      });

      // Redirect to booking page for payment
      navigate(`/booking/${booking.id}`);
      onClose();
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = calculateTotalAmount();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Calendar Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Select Dates</CardTitle>
            {dateRange?.from && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearDates}
                className="h-8 px-2"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={1}
            disabled={(date) => 
              date < new Date(new Date().setHours(0, 0, 0, 0)) || 
              isDateBooked(date)
            }
            className="pointer-events-auto rounded-md border"
          />

          <div className="space-y-3 pt-2">
            <div>
              <Label className="text-sm font-medium">Pickup Date</Label>
              <div className="mt-1 p-3 bg-muted rounded-md text-sm">
                {dateRange?.from ? format(dateRange.from, "PPP") : "Select pickup date"}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Return Date</Label>
              <div className="mt-1 p-3 bg-muted rounded-md text-sm">
                {dateRange?.to ? format(dateRange.to, "PPP") : "Select return date"}
              </div>
            </div>
          </div>

          {totalAmount > 0 && (
            <div className="bg-primary/10 p-4 rounded-lg space-y-2 mt-4 border border-primary/20">
              <div className="flex justify-between text-sm">
                <span>Daily Rate:</span>
                <span className="font-medium">Rs {car.price_per_day}/day</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Duration:</span>
                <span className="font-medium">
                  {Math.ceil((dateRange!.to!.getTime() - dateRange!.from!.getTime()) / (1000 * 60 * 60 * 24)) + 1} days
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-primary/20">
                <span>Total:</span>
                <span className="text-primary">Rs {totalAmount}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Form Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Book {car.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="customerName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerEmail" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerPhone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Locations */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="pickupLocation" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Pickup Location
                </Label>
                <Input
                  id="pickupLocation"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  placeholder="123 Main St, City, State"
                  required
                />
              </div>
              <div>
                <Label htmlFor="pickupTime" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Pick-up Time
                </Label>
                <Input
                  id="pickupTime"
                  name="pickupTime"
                  type="time"
                  value={formData.pickupTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dropoffLocation" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Return Location
                </Label>
                <Input
                  id="dropoffLocation"
                  name="dropoffLocation"
                  value={formData.dropoffLocation}
                  onChange={handleInputChange}
                  placeholder="456 Oak Ave, City, State"
                  required
                />
              </div>
              <div>
                <Label htmlFor="returnTime" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Return Time
                </Label>
                <Input
                  id="returnTime"
                  name="returnTime"
                  type="time"
                  value={formData.returnTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={loading || !dateRange?.from || !dateRange?.to} className="flex-1">
                {loading ? 'Creating Booking...' : 'Create Booking'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}