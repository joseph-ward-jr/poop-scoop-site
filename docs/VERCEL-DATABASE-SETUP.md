# Vercel Postgres Database Setup Guide

## 🚀 Quick Setup Instructions

### Step 1: Add Vercel Postgres to Your Project

1. **Go to your Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your `poop-scoop-site` project

2. **Add Postgres Database**
   - Click on the "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Choose a database name (e.g., `newsletter-db`)
   - Select your region (choose closest to your users)
   - Click "Create"

3. **Get Connection Details**
   - After creation, you'll see connection details
   - The `POSTGRES_URL` will be automatically added to your environment variables

### Step 2: Run Database Setup Script

1. **Pull the latest code** (if you haven't already):
   ```bash
   git pull origin feature/blog-system-with-newsletter
   npm install
   ```

2. **Run the database setup script**:
   ```bash
   node scripts/setup-database.js
   ```

   This will:
   - Create the `newsletter_subscribers` table
   - Add necessary indexes for performance
   - Create triggers for automatic timestamp updates
   - Insert a test record
   - Display database statistics

### Step 3: Test Newsletter Subscription

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Test the newsletter signup**:
   - Go to `http://localhost:3000/blog`
   - Wait 15 seconds for the popup OR click "Subscribe Now"
   - Fill out the form and submit
   - Check the console for success messages

3. **Verify database storage**:
   ```bash
   node -e "
   const { sql } = require('@vercel/postgres');
   sql\`SELECT * FROM newsletter_subscribers ORDER BY created_at DESC LIMIT 5\`
     .then(result => console.log('Recent subscribers:', result.rows))
     .catch(console.error)
   "
   ```

## 📊 Using the Database for Email Campaigns

### Export Subscribers (Various Formats)

1. **JSON Export** (default):
   ```
   GET /api/newsletter-export
   ```

2. **CSV Export** (for Excel/Google Sheets):
   ```
   GET /api/newsletter-export?format=csv
   ```

3. **Mailchimp Format**:
   ```
   GET /api/newsletter-export?format=mailchimp
   ```

4. **Email Addresses Only**:
   ```
   GET /api/newsletter-export?format=emails-only
   ```

### Filter Subscribers

1. **By Interest**:
   ```
   GET /api/newsletter-export?interests=home-cleaning
   ```

2. **By Source**:
   ```
   GET /api/newsletter-export?source=Blog Page Visit
   ```

3. **Combine Filters**:
   ```
   GET /api/newsletter-export?interests=lawn-maintenance&source=Homepage Hero&format=csv
   ```

### Example API Responses

**JSON Format:**
```json
{
  "subscribers": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "interests": ["home-cleaning", "lawn-maintenance"],
      "source": "Blog Page Visit",
      "subscription_date": "2024-12-15T10:30:00Z",
      "status": "active"
    }
  ],
  "pagination": {
    "total": 50,
    "count": 10,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

**CSV Format:**
```csv
Name,Email,Interests,Source,Subscription Date,Status
"John Doe","john@example.com","home-cleaning;lawn-maintenance","Blog Page Visit","2024-12-15T10:30:00Z","active"
```

## 🔧 Database Schema

```sql
CREATE TABLE newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  interests JSONB DEFAULT '[]'::jsonb,
  source VARCHAR(255) DEFAULT 'Website',
  subscription_date TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'active',
  jobber_client_id VARCHAR(255),
  unsubscribe_token VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 📈 Email Campaign Integration

### Mailchimp Integration
1. Export subscribers: `GET /api/newsletter-export?format=mailchimp`
2. Import the JSON into Mailchimp via their API or CSV export

### ConvertKit Integration
1. Export as CSV: `GET /api/newsletter-export?format=csv`
2. Import CSV into ConvertKit

### Custom Email Tool
1. Use JSON API: `GET /api/newsletter-export`
2. Process the data in your preferred email marketing tool

## 🛠 Troubleshooting

### Database Connection Issues
1. **Check environment variables** in Vercel dashboard
2. **Verify POSTGRES_URL** is set correctly
3. **Run setup script again** if tables are missing

### Newsletter Not Working
1. **Check browser console** for JavaScript errors
2. **Verify API endpoints** are responding
3. **Test database connection** with the verification script

### Export API Issues
1. **Check database has data**: Run the verification script
2. **Test API endpoint**: Visit `/api/newsletter-export` directly
3. **Check query parameters**: Ensure filters are valid

## 💰 Costs

- **Vercel Postgres**: $20/month for hobby plan
- **Includes**: 60 hours of compute, 0.5GB storage, 1GB data transfer
- **Scales automatically** as your subscriber list grows

## 🔒 Security Features

- **Email validation** prevents invalid addresses
- **Duplicate prevention** via unique email constraint
- **Unsubscribe tokens** for GDPR compliance
- **SQL injection protection** via parameterized queries

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Verify your Vercel Postgres setup in the dashboard
4. Test with the provided verification scripts
