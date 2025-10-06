-- Add booking_date column to bookings table if it doesn't exist
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_date date;

-- Add item_type and item_id columns for tours and attractions bookings
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS item_type text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS item_id uuid;