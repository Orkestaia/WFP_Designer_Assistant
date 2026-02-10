-- Create design_requests table
CREATE TABLE IF NOT EXISTS design_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    product_id TEXT,
    product_name TEXT,
    product_category TEXT,
    original_image_url TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS for design_requests
ALTER TABLE design_requests ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Allow service role full access for design_requests" ON design_requests
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Storage bucket instructions (Run in Supabase Dashboard):
-- 1. Go to Storage
-- 2. Create a new bucket named 'user-uploads'
-- 3. Make it PUBLIC
