-- Add photos array column to cars, tours, and attractions tables
ALTER TABLE public.cars ADD COLUMN IF NOT EXISTS photos TEXT[] DEFAULT '{}';
ALTER TABLE public.tours ADD COLUMN IF NOT EXISTS photos TEXT[] DEFAULT '{}';
ALTER TABLE public.attractions ADD COLUMN IF NOT EXISTS photos TEXT[] DEFAULT '{}';

-- Create storage buckets for car, tour, and attraction images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('car-images', 'car-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('tour-images', 'tour-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('attraction-images', 'attraction-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for car images
CREATE POLICY "Car images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'car-images');

CREATE POLICY "Authenticated users can upload car images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'car-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update car images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'car-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete car images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'car-images' AND auth.uid() IS NOT NULL);

-- Create storage policies for tour images
CREATE POLICY "Tour images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'tour-images');

CREATE POLICY "Authenticated users can upload tour images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'tour-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update tour images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'tour-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete tour images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'tour-images' AND auth.uid() IS NOT NULL);

-- Create storage policies for attraction images
CREATE POLICY "Attraction images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'attraction-images');

CREATE POLICY "Authenticated users can upload attraction images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'attraction-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update attraction images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'attraction-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete attraction images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'attraction-images' AND auth.uid() IS NOT NULL);