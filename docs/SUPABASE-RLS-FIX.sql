-- Quick fix for Row Level Security (RLS) policies
-- Run this in your Supabase SQL Editor to fix the 500 errors

-- Enable RLS on the newsletter_subscribers table
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy to allow public inserts (for newsletter signups)
CREATE POLICY "Allow public newsletter signups" ON newsletter_subscribers
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Policy to allow reading active subscribers (for exports)
CREATE POLICY "Allow reading active subscribers" ON newsletter_subscribers
  FOR SELECT 
  TO public
  USING (status = 'active');

-- Policy to allow updates (for status changes like unsubscribe)
CREATE POLICY "Allow status updates" ON newsletter_subscribers
  FOR UPDATE 
  TO public
  USING (true)
  WITH CHECK (true);

-- Test the policies by inserting a record
INSERT INTO newsletter_subscribers (name, email, interests, source)
VALUES (
  'RLS Test User',
  'rls-test@fieldandfoyer.com',
  '["home-cleaning"]'::jsonb,
  'RLS Policy Test'
);

-- Verify the insert worked
SELECT * FROM newsletter_subscribers WHERE email = 'rls-test@fieldandfoyer.com';
