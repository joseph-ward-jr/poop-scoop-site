# 🔐 Complete OAuth2 Setup Instructions for Jobber Integration

## 🎯 **What You Need to Do**

I've built all the OAuth2 functionality for you! Now you just need to configure your Jobber app and complete the authorization flow.

## 📋 **Step-by-Step Instructions**

### **Step 1: Configure Your Jobber App**

1. **Go to your Jobber app dashboard** at [developer.getjobber.com](https://developer.getjobber.com)
2. **Find your app** that you created earlier
3. **Click on your app** to open its settings
4. **Look for "Redirect URI" or "Callback URL" setting**
5. **Set the redirect URI to:**
   ```
   https://www.fieldandfoyer.com/oauth/callback
   ```
6. **Save the settings**

### **Step 2: Add Environment Variables to Vercel**

You need to add one more environment variable:

1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables
2. **Add this new variable:**
   - **Name**: `JOBBER_REDIRECT_URI`
   - **Value**: `https://www.fieldandfoyer.com/oauth/callback`
   - **Environments**: All three (Production, Preview, Development)

3. **Verify you have these existing variables:**
   - ✅ `JOBBER_CLIENT_ID` = your client ID
   - ✅ `JOBBER_CLIENT_SECRET` = your client secret
   - ✅ `JOBBER_REDIRECT_URI` = `https://www.fieldandfoyer.com/oauth/callback`

### **Step 3: Deploy the Changes**

The OAuth2 functionality will deploy automatically when you merge the pull request.

### **Step 4: Complete the Authorization Flow**

1. **Create the authorization URL** by replacing `YOUR_CLIENT_ID` with your actual client ID:
   ```
   https://api.getjobber.com/api/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=https://www.fieldandfoyer.com/oauth/callback&state=setup123&scope=read_clients%20write_clients
   ```

2. **Visit this URL in your browser**
3. **Log into your Jobber account** if prompted
4. **Click "Allow Access"** to authorize your app
5. **You'll be redirected** to your website at `/oauth/callback`
6. **The page will automatically exchange** the authorization code for tokens
7. **You'll see a success page** with your refresh token

### **Step 5: Add Refresh Token to Vercel**

1. **Copy the refresh token** from the success page
2. **Go to Vercel** → Your Project → Settings → Environment Variables
3. **Add the refresh token:**
   - **Name**: `JOBBER_REFRESH_TOKEN`
   - **Value**: `your_refresh_token_here`
   - **Environments**: All three

### **Step 6: Test Your Integration**

1. **Go to your contact page**: `https://www.fieldandfoyer.com/contact`
2. **Fill out and submit** the contact form
3. **Check your Jobber account** for the new client
4. **Success!** Your integration now has automatic token refresh

## 🎯 **What Each File Does**

### **Files I Created:**
- **`src/pages/OAuthCallbackPage.tsx`** - Handles the OAuth callback from Jobber
- **`api/oauth-exchange.js`** - Exchanges authorization code for tokens
- **`src/pages/OAuthSuccessPage.tsx`** - Shows success and next steps
- **Updated `src/App.tsx`** - Added routes for OAuth pages

### **How It Works:**
1. **Authorization URL** → User authorizes your app in Jobber
2. **Callback Page** → Receives authorization code from Jobber
3. **Exchange Function** → Trades code for access token + refresh token
4. **Success Page** → Shows tokens and instructions
5. **Contact Form** → Uses refresh token for automatic token refresh

## 🔧 **Environment Variables Summary**

After setup, you should have these in Vercel:

```env
# OAuth2 Credentials
JOBBER_CLIENT_ID=your_client_id_from_jobber_app
JOBBER_CLIENT_SECRET=your_client_secret_from_jobber_app
JOBBER_REFRESH_TOKEN=your_refresh_token_from_oauth_flow
JOBBER_REDIRECT_URI=https://www.fieldandfoyer.com/oauth/callback

# Optional: Remove these old ones
# JOBBER_ACCESS_TOKEN=old_expiring_token (not needed anymore)
```

## 🎉 **Expected Results**

After completing these steps:
- ✅ **Contact form works 24/7** without token expiration
- ✅ **Automatic token refresh** using refresh token
- ✅ **No more manual token management**
- ✅ **Professional, reliable operation**

## 🆘 **If You Need Help**

### **Common Issues:**

1. **"Redirect URI mismatch"**
   - Make sure the redirect URI in your Jobber app exactly matches: `https://www.fieldandfoyer.com/oauth/callback`

2. **"Invalid client"**
   - Verify your Client ID and Client Secret are correct in Vercel

3. **"Authorization failed"**
   - Try the authorization URL again
   - Make sure you're logged into the correct Jobber account

### **Testing URLs:**

- **OAuth Callback**: `https://www.fieldandfoyer.com/oauth/callback`
- **OAuth Success**: `https://www.fieldandfoyer.com/oauth/success`
- **Contact Form**: `https://www.fieldandfoyer.com/contact`
- **Test Interface**: `https://www.fieldandfoyer.com/test/jobber`

## 📞 **Next Steps**

1. **Complete the setup** following these instructions
2. **Test the contact form** to verify it works
3. **Monitor for a few days** to ensure reliability
4. **Enjoy automated lead management!** 🎉

**The OAuth2 integration is now complete and ready for 24/7 operation!**
