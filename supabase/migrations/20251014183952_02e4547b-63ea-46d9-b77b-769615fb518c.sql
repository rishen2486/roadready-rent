-- Insert 18 Japanese cars: 9 for Mauritius (3 small, 3 medium, 3 luxury) and 9 for Rodrigues (3 small, 3 medium, 3 luxury)

-- Mauritius Small Cars
INSERT INTO public.cars (name, brand, seats, transmission, mileage, price_per_day, description, features, photos, country, large_bags, small_bags, available)
VALUES 
  ('Toyota Yaris', 'Toyota', 5, 'automatic', 'Unlimited', 1000, 'Compact and fuel-efficient city car perfect for exploring Mauritius. Features modern design and excellent maneuverability.', ARRAY['Air Conditioning', 'Bluetooth', 'USB Port', 'Power Steering', 'Central Locking'], ARRAY['/cars/mauritius-small-1.jpg'], 'Mauritius', 1, 2, true),
  ('Honda Fit', 'Honda', 5, 'automatic', 'Unlimited', 1000, 'Versatile and spacious small car with impressive fuel economy. Ideal for beach trips and island tours.', ARRAY['Air Conditioning', 'Bluetooth', 'Reversing Camera', 'Power Windows', 'ABS'], ARRAY['/cars/mauritius-small-2.jpg'], 'Mauritius', 1, 2, true),
  ('Nissan March', 'Nissan', 5, 'manual', 'Unlimited', 1000, 'Reliable and economical compact car. Perfect for couples or small families exploring the island.', ARRAY['Air Conditioning', 'Power Steering', 'Central Locking', 'Radio/CD', 'Child Seat Compatible'], ARRAY['/cars/mauritius-small-3.jpg'], 'Mauritius', 1, 1, true);

-- Mauritius Medium Cars
INSERT INTO public.cars (name, brand, seats, transmission, mileage, price_per_day, description, features, photos, country, large_bags, small_bags, available)
VALUES 
  ('Toyota Camry', 'Toyota', 5, 'automatic', 'Unlimited', 1200, 'Premium mid-size sedan with elegant design and comfortable ride. Perfect for business trips and family vacations.', ARRAY['Air Conditioning', 'Cruise Control', 'Bluetooth', 'Leather Seats', 'Sunroof', 'Reversing Camera'], ARRAY['/cars/mauritius-medium-1.jpg'], 'Mauritius', 2, 2, true),
  ('Honda Accord', 'Honda', 5, 'automatic', 'Unlimited', 1200, 'Sophisticated sedan combining style, comfort, and performance. Ideal for longer journeys across the island.', ARRAY['Air Conditioning', 'Navigation System', 'Bluetooth', 'Heated Seats', 'Keyless Entry', 'ABS'], ARRAY['/cars/mauritius-medium-2.jpg'], 'Mauritius', 2, 2, true),
  ('Mazda 6', 'Mazda', 5, 'automatic', 'Unlimited', 1200, 'Stylish and dynamic mid-size sedan with premium features. Great for both city driving and coastal roads.', ARRAY['Air Conditioning', 'Bluetooth', 'Premium Audio', 'Smart Entry', 'Lane Assist', 'LED Headlights'], ARRAY['/cars/mauritius-medium-3.jpg'], 'Mauritius', 2, 3, true);

-- Mauritius Luxury Cars
INSERT INTO public.cars (name, brand, seats, transmission, mileage, price_per_day, description, features, photos, country, large_bags, small_bags, available)
VALUES 
  ('Lexus RX', 'Lexus', 7, 'automatic', 'Unlimited', 1500, 'Premium luxury SUV with exceptional comfort and advanced features. Perfect for VIP transportation and special occasions.', ARRAY['Air Conditioning', 'Navigation System', 'Premium Sound System', 'Leather Interior', 'Sunroof', 'Heated & Cooled Seats', '360 Camera'], ARRAY['/cars/mauritius-luxury-1.jpg'], 'Mauritius', 3, 3, true),
  ('Toyota Crown', 'Toyota', 5, 'automatic', 'Unlimited', 1500, 'Executive luxury sedan with refined elegance and cutting-edge technology. Ideal for business executives and special events.', ARRAY['Air Conditioning', 'Premium Leather', 'Adaptive Cruise Control', 'Heads-up Display', 'Premium Audio', 'Massage Seats'], ARRAY['/cars/mauritius-luxury-2.jpg'], 'Mauritius', 3, 2, true),
  ('Nissan Armada', 'Nissan', 8, 'automatic', 'Unlimited', 1500, 'Full-size luxury SUV offering maximum space and comfort. Perfect for large groups and family adventures.', ARRAY['Air Conditioning', 'Entertainment System', 'Third Row Seating', 'Power Tailgate', 'Leather Seats', 'Parking Sensors', 'Tow Package'], ARRAY['/cars/mauritius-luxury-3.jpg'], 'Mauritius', 4, 4, true);

-- Rodrigues Small Cars
INSERT INTO public.cars (name, brand, seats, transmission, mileage, price_per_day, description, features, photos, country, large_bags, small_bags, available)
VALUES 
  ('Suzuki Swift', 'Suzuki', 5, 'automatic', 'Unlimited', 1000, 'Sporty and fun-to-drive compact car. Great for exploring the scenic roads of Rodrigues island.', ARRAY['Air Conditioning', 'Bluetooth', 'USB Port', 'Power Windows', 'Central Locking'], ARRAY['/cars/rodrigues-small-1.jpg'], 'Rodrigues', 1, 2, true),
  ('Daihatsu Mira', 'Daihatsu', 4, 'manual', 'Unlimited', 1000, 'Ultra-efficient mini car perfect for island hopping. Excellent fuel economy and easy parking.', ARRAY['Air Conditioning', 'Power Steering', 'Radio', 'Central Locking', 'Eco Mode'], ARRAY['/cars/rodrigues-small-2.jpg'], 'Rodrigues', 1, 1, true),
  ('Mitsubishi Mirage', 'Mitsubishi', 5, 'automatic', 'Unlimited', 1000, 'Modern and reliable compact hatchback. Perfect for couples exploring Rodrigues beaches and attractions.', ARRAY['Air Conditioning', 'Bluetooth', 'Reversing Camera', 'Keyless Entry', 'USB Charging'], ARRAY['/cars/rodrigues-small-3.jpg'], 'Rodrigues', 1, 2, true);

-- Rodrigues Medium Cars
INSERT INTO public.cars (name, brand, seats, transmission, mileage, price_per_day, description, features, photos, country, large_bags, small_bags, available)
VALUES 
  ('Subaru Legacy', 'Subaru', 5, 'automatic', 'Unlimited', 1200, 'All-wheel drive sedan providing safety and comfort. Ideal for all weather conditions on the island.', ARRAY['Air Conditioning', 'AWD System', 'Bluetooth', 'EyeSight Safety', 'Premium Audio', 'Heated Seats'], ARRAY['/cars/rodrigues-medium-1.jpg'], 'Rodrigues', 2, 2, true),
  ('Toyota Corolla', 'Toyota', 5, 'automatic', 'Unlimited', 1200, 'World-renowned reliable sedan with excellent comfort. Perfect for families and longer stays.', ARRAY['Air Conditioning', 'Bluetooth', 'Reversing Camera', 'Lane Assist', 'Adaptive Cruise', 'Auto Headlights'], ARRAY['/cars/rodrigues-medium-2.jpg'], 'Rodrigues', 2, 2, true),
  ('Nissan Altima', 'Nissan', 5, 'automatic', 'Unlimited', 1200, 'Spacious and well-equipped mid-size sedan. Great value for exploring all of Rodrigues.', ARRAY['Air Conditioning', 'Navigation', 'Bluetooth', 'Smart Entry', 'Dual Climate', 'Premium Sound'], ARRAY['/cars/rodrigues-medium-3.jpg'], 'Rodrigues', 2, 3, true);

-- Rodrigues Luxury Cars
INSERT INTO public.cars (name, brand, seats, transmission, mileage, price_per_day, description, features, photos, country, large_bags, small_bags, available)
VALUES 
  ('Honda Pilot', 'Honda', 8, 'automatic', 'Unlimited', 1500, 'Premium three-row SUV with advanced technology and comfort. Perfect for large families and group tours.', ARRAY['Air Conditioning', 'Navigation System', 'Third Row', 'Honda Sensing', 'Leather Interior', 'Panoramic Sunroof', 'Wireless Charging'], ARRAY['/cars/rodrigues-luxury-1.jpg'], 'Rodrigues', 3, 3, true),
  ('Infiniti Q50', 'Infiniti', 5, 'automatic', 'Unlimited', 1500, 'Luxury sports sedan with powerful performance and premium amenities. Ideal for those seeking elegance and excitement.', ARRAY['Air Conditioning', 'Premium Leather', 'Bose Sound System', 'Adaptive Suspension', 'Sport Mode', 'Premium Navigation'], ARRAY['/cars/rodrigues-luxury-2.jpg'], 'Rodrigues', 2, 2, true),
  ('Mazda CX-9', 'Mazda', 7, 'automatic', 'Unlimited', 1500, 'Sophisticated luxury SUV with stunning design and cutting-edge features. Perfect for premium island experiences.', ARRAY['Air Conditioning', 'Premium Interior', 'Third Row Seating', 'i-ACTIVSENSE', 'Bose Audio', 'Power Liftgate', 'Apple CarPlay'], ARRAY['/cars/rodrigues-luxury-3.jpg'], 'Rodrigues', 3, 3, true);