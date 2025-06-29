# Jobber Production Credentials Setup

## 🚨 **CRITICAL: Your Current Token Expires Every 60 Minutes**

The token you're currently using from GraphiQL is a **test token** that expires every 60 minutes. For a production website that needs to work 24/7, you have two options:

1. **Client Credentials (RECOMMENDED)** - Automatic token refresh
2. **Permanent Access Token** - Manual token management

## ✅ **RECOMMENDED: Client Credentials (Automatic Token Refresh)**

### **Option 1: Client Credentials (Best for Production)**

This approach automatically gets fresh tokens when needed, so you never have to worry about expiration.

1. **Create Your Jobber App** (same process as before)
   - Go to [developer.getjobber.com](https://developer.getjobber.com)
   - Click "New" to create an app
   - Fill out the form with your business details

2. **Get Client Credentials**
   - After creating the app, you'll receive:
     - **Client ID**: `abc123...`
     - **Client Secret**: `xyz789...`
   - These don't expire and can generate fresh tokens automatically

3. **Set Environment Variables**

   **Local Development (.env.local):**
   ```env
   VITE_JOBBER_ACCESS_TOKEN=your_current_token  # Keep for local dev
   ```

   **Production (Vercel):**
   ```env
   JOBBER_CLIENT_ID=your_client_id_here
   JOBBER_CLIENT_SECRET=your_client_secret_here
   ```

4. **How It Works**
   - Your serverless function automatically requests fresh tokens
   - No manual token management required
   - Works 24/7 without interruption
   - Tokens refresh automatically when needed

## ✅ **Alternative: Permanent Access Token**

### **Option 2: Manual Token Management**

1. **Go to Jobber Developer Center**
   - Visit: [developer.getjobber.com](https://developer.getjobber.com)
   - Sign in to your developer account

2. **Create a Private App**
   - Click "Create App"
   - Choose "Private App" (for your own business use)
   - Fill out the details:
     ```
     App Name: Field & Foyer Website Integration
     App Type: Private App
     Description: Automated client creation from website contact forms
     ```

3. **Set Required Scopes**
   - Select these permissions:
     - ✅ `clients:read` - Read client information
     - ✅ `clients:write` - Create and update clients
     - ✅ `client_notes:write` - Add notes to clients (optional)

4. **Generate Production Credentials**
   - After creating the app, you'll receive:
     - **Client ID**: `abc123...`
     - **Client Secret**: `xyz789...`
     - **Access Token**: `eyJhbGciOi...` (this one doesn't expire!)

5. **Use the Permanent Token**
   - Copy the **Access Token** (not the test token)
   - This token is permanent and won't expire every 60 minutes

### **Option 2: API Key (Alternative)**

1. **In Jobber Developer Center**
2. **Navigate to "API Keys" section**
3. **Create New API Key**
   - Name: "Website Integration"
   - Scopes: `clients:read`, `clients:write`
4. **Copy the generated API key**
   - This is also a permanent token

## 🔧 **Update Your Environment Variables**

### **Local Development (.env.local)**
```env
VITE_JOBBER_ACCESS_TOKEN=your_permanent_token_here
```

### **Production (Vercel)**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update the existing `JOBBER_ACCESS_TOKEN` variable:
   - **Name**: `JOBBER_ACCESS_TOKEN`
   - **Value**: `your_permanent_token_here`
   - **Environments**: All three

## 🧪 **Testing Your Permanent Token**

### **Test in GraphiQL First**
1. Go to [Jobber GraphiQL Explorer](https://developer.getjobber.com/graphiql)
2. Replace the test token with your permanent token
3. Run a test query:
   ```graphql
   query {
     account {
       id
       name
     }
   }
   ```
4. Should work without expiring

### **Test on Your Website**
1. Update your local `.env.local` with the permanent token
2. Test the contact form: `http://localhost:3000/contact`
3. Update Vercel environment variable
4. Test production contact form

## ⚠️ **Current Token Expiration**

Your current token expires on: **January 20, 2025**

**Immediate Action Required:**
1. Get a permanent token using the steps above
2. Update both local and production environment variables
3. Test to ensure 24/7 operation

## 🔒 **Security Notes**

### **Token Security**
- **Never commit tokens** to version control
- **Use environment variables** for all tokens
- **Rotate tokens periodically** for security
- **Monitor token usage** in Jobber dashboard

### **Production Considerations**
- **Permanent tokens** don't expire automatically
- **Monitor API usage** to stay within limits
- **Set up alerts** for API failures
- **Have backup authentication** if needed

## 📊 **Token Comparison**

| Token Type | Duration | Use Case | Expires |
|------------|----------|----------|---------|
| GraphiQL Test | 60 minutes | Development/Testing | ❌ Yes |
| Private App | Permanent | Production | ✅ No |
| API Key | Permanent | Production | ✅ No |

## 🚨 **Immediate Action Plan**

1. **Today**: Get permanent token from Jobber Developer Center
2. **Update local environment**: Replace token in `.env.local`
3. **Update production**: Replace token in Vercel environment variables
4. **Test thoroughly**: Ensure contact form works 24/7
5. **Monitor**: Check that token doesn't expire

## 📞 **Need Help?**

If you have trouble getting a permanent token:

1. **Jobber Support**: Contact Jobber developer support
2. **Documentation**: [Jobber API Authentication Docs](https://developer.getjobber.com/docs/authentication/)
3. **Community**: Jobber Developer Community forums

## ✅ **Verification Checklist**

- [ ] Created private app in Jobber Developer Center
- [ ] Generated permanent access token
- [ ] Updated local `.env.local` file
- [ ] Updated Vercel environment variable
- [ ] Tested contact form locally
- [ ] Tested contact form in production
- [ ] Verified token doesn't expire
- [ ] Set up monitoring for API failures

**Once you have a permanent token, your contact form will work 24/7 without interruption!**
