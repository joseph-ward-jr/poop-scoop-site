# Supabase Database Setup Guide

## 🚀 Quick Setup Instructions

### Step 1: Create Supabase Project

1. **Go to Supabase**: [supabase.com](https://supabase.com)
2. **Sign up/Login** with GitHub
3. **Create New Project**:
   - Project name: `field-foyer-newsletter`
   - Database password: (generate strong password)
   - Region: Choose closest to your users
   - Click "Create new project"

### Step 2: Set Up Database Table

1. **Go to SQL Editor** in Supabase dashboard
2. **Run this SQL** to create the table:

```sql
-- Create newsletter_subscribers table
CREATE TABLE newsletter_subscribers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  interests JSONB DEFAULT '[]'::jsonb,
  source TEXT DEFAULT 'Website',
  status TEXT DEFAULT 'active',
  jobber_client_id TEXT,
  unsubscribe_token TEXT UNIQUE DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscribers(status);
CREATE INDEX idx_newsletter_source ON newsletter_subscribers(source);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_newsletter_subscribers_updated_at
  BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert test record
INSERT INTO newsletter_subscribers (name, email, interests, source)
VALUES (
  'Test Subscriber',
  'test@fieldandfoyer.com',
  '["home-cleaning", "lawn-maintenance"]'::jsonb,
  'Database Setup Test'
);
```

### Step 3: Get API Keys

1. **Go to Settings > API** in Supabase dashboard
2. **Copy these values**:
   - Project URL
   - anon/public key

### Step 4: Add Environment Variables

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

2. **For Local Development** (create `.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Step 5: Update Newsletter API

Update your newsletter service to use Supabase:

```javascript
// In src/services/jobberApi.ts, change the API endpoint:
const response = await fetch('/api/newsletter-supabase', {
  // ... rest of the code
})
```

### Step 6: Test the Setup

1. **Pull latest code**:
```bash
git pull origin feature/blog-system-with-newsletter
npm install
```

2. **Start dev server**:
```bash
npm run dev
```

3. **Test newsletter signup**:
   - Go to `http://localhost:3000/blog`
   - Subscribe to newsletter
   - Check Supabase dashboard for new record

## 📊 Using Supabase for Email Campaigns

### View Subscribers in Dashboard
1. Go to **Table Editor** in Supabase
2. Select `newsletter_subscribers` table
3. View, filter, and export data

### Export for Email Marketing

**CSV Export**:
```
GET /api/newsletter-export-supabase?format=csv
```

**Mailchimp Format**:
```
GET /api/newsletter-export-supabase?format=mailchimp
```

**Filter by Interest**:
```
GET /api/newsletter-export-supabase?interests=home-cleaning&format=csv
```

### Real-time Subscriptions (Bonus)
```javascript
// Listen for new subscribers in real-time
supabase
  .channel('newsletter_subscribers')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'newsletter_subscribers' },
    (payload) => {
      console.log('New subscriber!', payload.new)
    }
  )
  .subscribe()
```

## 💰 Pricing

**Free Tier** (Perfect for starting):
- 500MB database storage
- 2GB bandwidth per month
- 50MB file storage
- 100,000 monthly active users

**Pro Tier** ($25/month):
- 8GB database storage
- 250GB bandwidth
- 100GB file storage
- 500,000 monthly active users

## 🎯 Benefits of Supabase

1. **Free to Start**: No upfront costs
2. **Real-time**: Live updates when new subscribers join
3. **Built-in API**: Automatic REST and GraphQL APIs
4. **Dashboard**: Easy to view and manage subscribers
5. **Backup**: Automatic daily backups
6. **Security**: Row-level security built-in
7. **Scalable**: Grows with your business

## 🔧 Advanced Features

### Row Level Security (RLS)
```sql
-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy for reading (public can read active subscribers)
CREATE POLICY "Public can read active subscribers" ON newsletter_subscribers
  FOR SELECT USING (status = 'active');
```

### Automatic Unsubscribe
```sql
-- Function to unsubscribe via token
CREATE OR REPLACE FUNCTION unsubscribe_by_token(token TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE newsletter_subscribers 
  SET status = 'unsubscribed' 
  WHERE unsubscribe_token = token;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;
```

## 🚀 Next Steps

1. **Set up Supabase project** (5 minutes)
2. **Run SQL setup** (2 minutes)
3. **Add environment variables** (2 minutes)
4. **Update API endpoint** (1 minute)
5. **Test newsletter signup** (1 minute)

**Total setup time: ~10 minutes!**

## 📞 Support

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Community**: [supabase.com/discord](https://supabase.com/discord)
- **Status**: [status.supabase.com](https://status.supabase.com)
