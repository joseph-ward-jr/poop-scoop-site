#!/usr/bin/env node

/**
 * Test script to verify Jobber API connection
 * Run with: node scripts/test-jobber-connection.js
 */

import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load environment variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
config({ path: join(__dirname, '../.env.local') })

const JOBBER_API_URL = 'https://api.getjobber.com/api/graphql'
const API_VERSION = '2023-11-15'

async function testJobberConnection() {
  const accessToken = process.env.VITE_JOBBER_ACCESS_TOKEN

  if (!accessToken) {
    console.error('❌ VITE_JOBBER_ACCESS_TOKEN not found in environment variables')
    console.log('Please add your Jobber access token to .env.local file')
    process.exit(1)
  }

  console.log('🔍 Testing Jobber API connection...')
  console.log(`📡 API URL: ${JOBBER_API_URL}`)
  console.log(`📅 API Version: ${API_VERSION}`)
  console.log(`🔑 Token: ${accessToken.substring(0, 10)}...`)

  const query = `
    query TestConnection {
      account {
        id
        name
        industry
        createdAt
      }
    }
  `

  try {
    const response = await fetch(JOBBER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-JOBBER-GRAPHQL-VERSION': API_VERSION
      },
      body: JSON.stringify({ query })
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error('❌ GraphQL Errors:')
      data.errors.forEach(error => {
        console.error(`  - ${error.message}`)
      })
      process.exit(1)
    }

    if (data.data?.account) {
      console.log('✅ Connection successful!')
      console.log('📊 Account Details:')
      console.log(`  - ID: ${data.data.account.id}`)
      console.log(`  - Name: ${data.data.account.name}`)
      console.log(`  - Industry: ${data.data.account.industry || 'Not specified'}`)
      console.log(`  - Created: ${data.data.account.createdAt}`)
    } else {
      console.error('❌ Unexpected response format')
      console.log('Response:', JSON.stringify(data, null, 2))
      process.exit(1)
    }

  } catch (error) {
    console.error('❌ Connection failed:')
    console.error(`  ${error.message}`)
    
    if (error.message.includes('401')) {
      console.log('\n💡 Troubleshooting tips:')
      console.log('  - Check if your access token is valid')
      console.log('  - Test tokens expire after 60 minutes')
      console.log('  - Generate a new token in Jobber Developer Center')
    }
    
    process.exit(1)
  }
}

// Test client creation
async function testClientCreation() {
  const accessToken = process.env.VITE_JOBBER_ACCESS_TOKEN

  console.log('\n🧪 Testing client creation...')

  const mutation = `
    mutation TestClientCreate($input: ClientCreateInput!) {
      clientCreate(input: $input) {
        client {
          id
          firstName
          lastName
          emails {
            address
            primary
          }
        }
        userErrors {
          message
          path
        }
      }
    }
  `

  const variables = {
    input: {
      firstName: 'Test',
      lastName: 'User',
      emails: [{
        description: 'MAIN',
        primary: true,
        address: 'test@example.com'
      }],
      notes: 'Test client created by integration script'
    }
  }

  try {
    const response = await fetch(JOBBER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'X-JOBBER-GRAPHQL-VERSION': API_VERSION
      },
      body: JSON.stringify({ query: mutation, variables })
    })

    const data = await response.json()

    if (data.errors) {
      console.error('❌ GraphQL Errors:')
      data.errors.forEach(error => {
        console.error(`  - ${error.message}`)
      })
      return
    }

    if (data.data?.clientCreate?.userErrors?.length > 0) {
      console.error('❌ User Errors:')
      data.data.clientCreate.userErrors.forEach(error => {
        console.error(`  - ${error.message}`)
      })
      return
    }

    if (data.data?.clientCreate?.client) {
      console.log('✅ Client creation successful!')
      console.log('👤 Client Details:')
      console.log(`  - ID: ${data.data.clientCreate.client.id}`)
      console.log(`  - Name: ${data.data.clientCreate.client.firstName} ${data.data.clientCreate.client.lastName}`)
      console.log(`  - Email: ${data.data.clientCreate.client.emails[0]?.address}`)
    }

  } catch (error) {
    console.error('❌ Client creation failed:')
    console.error(`  ${error.message}`)
  }
}

// Run tests
async function main() {
  console.log('🚀 Jobber API Integration Test\n')
  
  await testJobberConnection()
  await testClientCreation()
  
  console.log('\n✨ Test completed!')
}

main().catch(console.error)
