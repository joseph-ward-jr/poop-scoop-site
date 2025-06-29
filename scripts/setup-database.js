// Database setup script for newsletter subscribers
// Run this after setting up Vercel Postgres

const { sql } = require('@vercel/postgres')

async function setupNewsletterDatabase() {
  try {
    console.log('🚀 Setting up newsletter database...')

    // Create newsletter_subscribers table
    await sql`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
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
      )
    `

    console.log('✅ Created newsletter_subscribers table')

    // Create indexes for better performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_newsletter_email 
      ON newsletter_subscribers(email)
    `

    await sql`
      CREATE INDEX IF NOT EXISTS idx_newsletter_status 
      ON newsletter_subscribers(status)
    `

    await sql`
      CREATE INDEX IF NOT EXISTS idx_newsletter_source 
      ON newsletter_subscribers(source)
    `

    await sql`
      CREATE INDEX IF NOT EXISTS idx_newsletter_subscription_date 
      ON newsletter_subscribers(subscription_date)
    `

    console.log('✅ Created database indexes')

    // Create a function to update the updated_at timestamp
    await sql`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ language 'plpgsql'
    `

    await sql`
      DROP TRIGGER IF EXISTS update_newsletter_subscribers_updated_at ON newsletter_subscribers
    `

    await sql`
      CREATE TRIGGER update_newsletter_subscribers_updated_at
      BEFORE UPDATE ON newsletter_subscribers
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
    `

    console.log('✅ Created update trigger')

    // Test the table by inserting a sample record (optional)
    const testEmail = 'test@fieldandfoyer.com'
    
    // Check if test record exists
    const existingTest = await sql`
      SELECT id FROM newsletter_subscribers WHERE email = ${testEmail}
    `

    if (existingTest.rows.length === 0) {
      await sql`
        INSERT INTO newsletter_subscribers (name, email, interests, source)
        VALUES (
          'Test Subscriber',
          ${testEmail},
          '["home-cleaning", "lawn-maintenance"]'::jsonb,
          'Database Setup Test'
        )
      `
      console.log('✅ Inserted test record')
    } else {
      console.log('ℹ️  Test record already exists')
    }

    // Display table info
    const tableInfo = await sql`
      SELECT 
        COUNT(*) as total_subscribers,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_subscribers
      FROM newsletter_subscribers
    `

    console.log('📊 Database Statistics:')
    console.log(`   Total subscribers: ${tableInfo.rows[0].total_subscribers}`)
    console.log(`   Active subscribers: ${tableInfo.rows[0].active_subscribers}`)

    console.log('🎉 Database setup complete!')
    console.log('')
    console.log('Next steps:')
    console.log('1. Update your newsletter API to use the database')
    console.log('2. Test newsletter subscriptions')
    console.log('3. Set up email campaign exports')

  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  }
}

// Run the setup
if (require.main === module) {
  setupNewsletterDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Setup failed:', error)
      process.exit(1)
    })
}

module.exports = { setupNewsletterDatabase }
