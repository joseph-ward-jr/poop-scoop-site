# Newsletter Database Setup

## Database Schema

### Newsletter Subscribers Table

```sql
CREATE TABLE newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  interests JSONB,
  source VARCHAR(255),
  subscription_date TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'active',
  jobber_client_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscribers(status);
CREATE INDEX idx_newsletter_source ON newsletter_subscribers(source);
```

## Implementation Options

### Option 1: Vercel Postgres (Recommended)
**Pros:**
- Native Vercel integration
- SQL database with full query capabilities
- Automatic backups and scaling
- Easy to export data for email campaigns

**Setup:**
1. Add Vercel Postgres to your project
2. Set up environment variables
3. Run migration scripts

**Cost:** $20/month for hobby plan

### Option 2: Vercel KV (Redis)
**Pros:**
- Very fast
- Simple key-value storage
- Good for high-volume subscriptions

**Cons:**
- Less query flexibility
- Harder to export for email campaigns

### Option 3: Airtable
**Pros:**
- Easy to view and manage subscribers
- Built-in email campaign features
- No database setup required
- Great UI for non-technical users

**Cons:**
- External dependency
- API rate limits

### Option 4: Google Sheets
**Pros:**
- Free
- Easy to view and export
- Familiar interface

**Cons:**
- Not designed for high volume
- API limitations

## Recommended Implementation

### 1. Vercel Postgres Setup

```bash
# Install Vercel Postgres
npm install @vercel/postgres

# Add to your Vercel project
vercel env add POSTGRES_URL
```

### 2. Environment Variables
```
POSTGRES_URL=your_postgres_connection_string
```

### 3. Migration Script
```javascript
// scripts/migrate-newsletter.js
const { sql } = require('@vercel/postgres')

async function createNewsletterTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      interests JSONB,
      source VARCHAR(255),
      subscription_date TIMESTAMP DEFAULT NOW(),
      status VARCHAR(50) DEFAULT 'active',
      jobber_client_id VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `
}
```

## Email Campaign Export

### Query for Active Subscribers
```sql
SELECT 
  name,
  email,
  interests,
  source,
  subscription_date
FROM newsletter_subscribers 
WHERE status = 'active'
ORDER BY subscription_date DESC;
```

### Query by Interest
```sql
SELECT email, name
FROM newsletter_subscribers 
WHERE status = 'active'
  AND interests @> '["home-cleaning"]'::jsonb;
```

### Export for Email Marketing Tools
- **Mailchimp**: CSV export with email, name, interests
- **ConvertKit**: API integration or CSV import
- **Constant Contact**: CSV export
- **Campaign Monitor**: CSV or API integration

## Benefits of This Approach

1. **Dual Storage**: Jobber for CRM + Database for marketing
2. **Campaign Segmentation**: Filter by interests, source, date
3. **Analytics**: Track subscription sources and trends
4. **Compliance**: Easy unsubscribe management
5. **Backup**: Multiple data sources for reliability
6. **Export Flexibility**: Easy integration with email marketing tools

## Next Steps

1. Choose database option (recommend Vercel Postgres)
2. Set up database and run migrations
3. Update newsletter API to use dual storage
4. Test subscription flow
5. Set up email campaign export process
