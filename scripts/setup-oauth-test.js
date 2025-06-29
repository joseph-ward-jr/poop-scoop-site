#!/usr/bin/env node

/**
 * Setup script for OAuth2 testing
 * This script helps set up the environment for testing Jobber OAuth2 integration
 */

import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const envExamplePath = join(rootDir, '.env.example')
const envLocalPath = join(rootDir, '.env.local')

console.log('🚀 Jobber OAuth2 Testing Setup\n')

// Check if .env.example exists
if (!existsSync(envExamplePath)) {
  console.error('❌ .env.example file not found')
  process.exit(1)
}

// Check if .env.local already exists
if (existsSync(envLocalPath)) {
  console.log('✅ .env.local file already exists')
  
  // Check if it has the Jobber token
  const envContent = readFileSync(envLocalPath, 'utf8')
  if (envContent.includes('VITE_JOBBER_ACCESS_TOKEN=') && !envContent.includes('your_jobber_access_token_here')) {
    console.log('✅ Jobber access token appears to be configured')
  } else {
    console.log('⚠️  Jobber access token may not be configured properly')
    console.log('   Please update VITE_JOBBER_ACCESS_TOKEN in .env.local')
  }
} else {
  // Copy .env.example to .env.local
  const exampleContent = readFileSync(envExamplePath, 'utf8')
  writeFileSync(envLocalPath, exampleContent)
  console.log('✅ Created .env.local from .env.example')
  console.log('⚠️  Please update VITE_JOBBER_ACCESS_TOKEN in .env.local with your actual token')
}

console.log('\n📋 Next Steps:')
console.log('1. Get your Jobber access token from the Developer Center')
console.log('2. Update VITE_JOBBER_ACCESS_TOKEN in .env.local')
console.log('3. Run: npm run dev')
console.log('4. Visit: http://localhost:3000/test/jobber')
console.log('5. Test your OAuth2 integration!')

console.log('\n🔗 Useful Links:')
console.log('• Jobber Developer Center: https://developer.getjobber.com/')
console.log('• Test Account Signup: https://getjobber.com/developer-sign-up/')
console.log('• Integration Docs: docs/JOBBER_INTEGRATION.md')

console.log('\n✨ Setup complete!')
