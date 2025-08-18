# Google OAuth Setup Guide for Indian Coffee House

This guide will help you set up Google OAuth authentication for your restaurant app.

## Step 1: Google Cloud Console Setup

### 1.1 Create/Select a Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your project ID

### 1.2 Enable Required APIs
1. Go to **APIs & Services** > **Library**
2. Search for and enable:
   - **Google+ API** (for user profile information)
   - **People API** (for additional user data)

### 1.3 Create OAuth 2.0 Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client IDs**
3. If prompted, configure the OAuth consent screen first:
   - Choose **External** user type
   - Fill in app name: "Indian Coffee House"
   - Add your email as developer contact
   - Add authorized domains (your domain)

4. For OAuth 2.0 Client ID:
   - Application type: **Web application**
   - Name: "Indian Coffee House Web Client"
   
5. **Add Authorized Redirect URIs:**
   ```
   https://syd.cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/689c24510008dbb12ddf
   http://localhost:3000/auth/callback
   https://yourdomain.com/auth/callback
   ```
   
6. **Add Authorized JavaScript Origins:**
   ```
   http://localhost:3000
   https://yourdomain.com
   ```

7. Click **Create** and copy:
   - **Client ID**
   - **Client Secret**

## Step 2: Appwrite Configuration

### 2.1 Configure Google OAuth in Appwrite
1. Go to your [Appwrite Console](https://syd.cloud.appwrite.io/)
2. Navigate to **Authentication** > **Settings**
3. Find **Google** in the OAuth2 Providers section
4. Click **Enable**
5. Enter:
   - **App ID**: Your Google Client ID
   - **App Secret**: Your Google Client Secret

### 2.2 Update Appwrite Settings
1. In **Authentication** > **Settings**
2. Make sure these are configured:
   - **Success URL**: `https://yourdomain.com/auth/callback`
   - **Failure URL**: `https://yourdomain.com/login?error=oauth_failed`

## Step 3: Environment Variables (Vercel)

Add these environment variables to your Vercel deployment:

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://syd.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=689c24510008dbb12ddf
NEXT_PUBLIC_APPWRITE_DATABASE_ID=689c4c52003d0c52f495
NEXT_PUBLIC_APPWRITE_MENU_COLLECTION_ID=689c4ca60029753e6a8f
NEXT_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID=689c52a40008486f4431
NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID=689d6a8b001dc5eff4b3
```

### How to add to Vercel:
1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** > **Environment Variables**
4. Add each variable above

## Step 4: Testing

### 4.1 Local Testing
1. Make sure your `.env.local` has all the environment variables
2. Run `npm run dev`
3. Go to `http://localhost:3000/login`
4. Click "Continue with Google"
5. You should be redirected to Google's OAuth page

### 4.2 Production Testing
1. Deploy to Vercel with environment variables
2. Test the Google OAuth flow on your live site

## Step 5: Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" error**
   - Check that your redirect URIs in Google Console match exactly
   - Make sure you're using the correct Appwrite project ID in the URL

2. **"OAuth callback error"**
   - Check that your Appwrite OAuth settings are correct
   - Verify environment variables are set in Vercel

3. **"Missing Appwrite environment variables"**
   - Add all required environment variables to Vercel
   - Redeploy after adding variables

### Debug Steps:
1. Check browser console for errors
2. Check Vercel function logs
3. Check Appwrite logs in the console
4. Verify all URLs match between Google Console and Appwrite

## Step 6: Security Considerations

1. **Never expose Client Secret** in frontend code
2. **Use HTTPS** in production
3. **Validate redirect URIs** carefully
4. **Review OAuth scopes** - only request what you need
5. **Monitor OAuth usage** in Google Console

## What Happens When User Clicks "Continue with Google"

1. User clicks Google OAuth button
2. Redirected to Google's OAuth consent screen
3. User grants permissions
4. Google redirects to Appwrite callback URL
5. Appwrite creates user session
6. User redirected to `/auth/callback` page
7. App checks authentication status
8. User profile created in database (if new user)
9. User redirected to menu page

## Files Modified

- `contexts/AuthContext.tsx` - Added `loginWithGoogle` function
- `app/login/page.tsx` - Added functional Google OAuth button
- `app/signup/page.tsx` - Added functional Google OAuth button  
- `app/auth/callback/page.tsx` - New callback handler page

Your Google OAuth is now ready to use! 🎉