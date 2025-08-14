# 🚀 Appwrite Setup Instructions for Indian Coffee House

## Step 1: Complete Your .env.local File

1. Open your `.env.local` file
2. Replace `your-project-id-here` with your actual Appwrite Project ID from Step 1.2
3. Your file should look like this:

```
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-actual-project-id
```

## Step 2: Configure Appwrite Platform Settings

### 2.1 Add Your Website Domain
1. Go to your Appwrite Console
2. Click on "Settings" in the left sidebar
3. Scroll down to "Platforms"
4. Click "Add Platform" → "Web App"
5. Enter these details:
   - **Name**: Indian Coffee House Website
   - **Hostname**: `localhost` (for development)
   - **Port**: `3000` (for development)
6. Click "Next" and then "Skip optional steps"

### 2.2 Add Production Domain (Later)
When you deploy your website, add your production domain:
- **Hostname**: `yourdomain.com`
- **Port**: Leave empty for production

## Step 3: Install Dependencies

Run this command in your terminal:

```bash
npm install
```

## Step 4: Start Your Development Server

```bash
npm run dev
```

## Step 5: Test the Authentication

1. Go to `http://localhost:3000`
2. Click "Login/Sign up" button
3. Try creating a new account
4. Check your Appwrite Console → "Auth" to see the new user

## Step 6: Configure Email Settings (Optional)

### For Email Verification:
1. In Appwrite Console, go to "Auth" → "Settings"
2. Enable "Email confirmation"
3. Set up SMTP settings or use Appwrite's default email service

### For Password Reset:
1. In the same settings, enable "Password recovery"
2. Configure your email templates

## Step 7: Set Up Database (For Future Features)

1. In Appwrite Console, go to "Databases"
2. Click "Create Database"
3. Name: `indian-coffee-house-db`
4. Database ID: `indian-coffee-house-db`

### Create Collections:
1. **Users Collection** (for additional user data):
   - Collection ID: `users`
   - Add attributes: `phone`, `preferences`, etc.

2. **Reservations Collection** (for table bookings):
   - Collection ID: `reservations`
   - Add attributes: `userId`, `date`, `time`, `guests`, `location`, etc.

## Step 8: Security Settings

### 8.1 Set Permissions
1. Go to each collection
2. Click "Settings" → "Permissions"
3. Set appropriate read/write permissions:
   - Users can read/write their own data
   - Admin can read/write all data

### 8.2 Enable Security Features
1. In "Settings" → "Security"
2. Enable "Password dictionary" to prevent weak passwords
3. Set "Password history" to prevent password reuse
4. Configure "Session length" as needed

## 🎉 You're All Set!

Your Indian Coffee House website now has:
- ✅ User Registration
- ✅ User Login
- ✅ User Logout
- ✅ Session Management
- ✅ Secure Authentication

## 🔧 Troubleshooting

### Common Issues:

1. **"Project not found" error**:
   - Check your Project ID in `.env.local`
   - Make sure the project exists in Appwrite Console

2. **CORS errors**:
   - Add your domain to Platforms in Appwrite Console
   - Make sure hostname and port are correct

3. **Authentication not working**:
   - Check browser console for errors
   - Verify your API endpoint is correct
   - Make sure you've added the platform in Appwrite

### Need Help?
- Check Appwrite Documentation: https://appwrite.io/docs
- Join Appwrite Discord: https://discord.gg/GSeTUeA
- Check GitHub Issues: https://github.com/appwrite/appwrite

## 🚀 Next Steps

Once authentication is working, you can:
1. Add user profiles
2. Store reservation data
3. Add email notifications
4. Implement user preferences
5. Add admin dashboard

Happy coding! ☕️