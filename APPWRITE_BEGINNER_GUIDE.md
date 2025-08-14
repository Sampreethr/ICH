# 🚀 Complete Appwrite Setup Guide for Beginners

## 📋 **What is Appwrite?**
Appwrite is a backend-as-a-service platform that handles user authentication, databases, and file storage for your website. Think of it as a ready-made backend that you don't need to build from scratch.

---

## 🎯 **PART 1: Creating Your Appwrite Account & Project**

### **Step 1.1: Sign Up for Appwrite Cloud**

1. **Open your web browser** and go to: [https://cloud.appwrite.io](https://cloud.appwrite.io)

2. **Click the "Sign Up" button** (usually in the top-right corner)

3. **Fill in your details:**
   - **Email**: Use your real email address
   - **Password**: Create a strong password
   - **Name**: Your full name

4. **Click "Create Account"**

5. **Check your email** for a verification link and click it

6. **You'll be redirected to the Appwrite Console** (this is your dashboard)

### **Step 1.2: Create Your First Project**

1. **In the Appwrite Console**, you'll see a "Create Project" button or card

2. **Click "Create Project"**

3. **Fill in the project details:**
   - **Project Name**: `Indian Coffee House`
   - **Project ID**: `indian-coffee-house` (or let it auto-generate)
   - **Region**: Choose the closest to your location (e.g., "US East" if you're in America)

4. **Click "Create"**

5. **IMPORTANT**: Write down these details (you'll need them later):
   - **Project ID**: (something like `indian-coffee-house` or `64f7b8c9d1234567`)
   - **API Endpoint**: `https://cloud.appwrite.io/v1`

---

## 🌐 **PART 2: Configure Your Website Domain**

### **Step 2.1: Add Your Development Domain**

1. **In your project dashboard**, look for "Settings" in the left sidebar and click it

2. **Scroll down to find "Platforms"** section

3. **Click "Add Platform"**

4. **Select "Web App"** from the options

5. **Fill in the platform details:**
   - **Name**: `Indian Coffee House - Development`
   - **Hostname**: `localhost`
   - **Port**: `3000`

6. **Click "Next"**

7. **Click "Skip optional steps"** (we don't need them now)

8. **You should see your platform listed** with a green checkmark

### **Step 2.2: Configure Authentication Settings**

1. **In the left sidebar**, click on "Auth"

2. **Click on "Settings"** (you'll see it as a tab or button)

3. **Configure these settings:**
   - **Enable "Email/Password"** (should be enabled by default)
   - **Session Length**: Set to `31536000` (1 year) or leave default
   - **Password Policy**: 
     - Minimum length: `8`
     - Require uppercase: ✅ (checked)
     - Require lowercase: ✅ (checked)
     - Require numbers: ✅ (checked)
     - Require special characters: ✅ (checked)

4. **Scroll down and click "Update"**

---

## 🔧 **PART 3: Update Your Website Configuration**

### **Step 3.1: Update Environment Variables**

1. **Open your project folder** in your code editor

2. **Find the `.env.local` file** (it should be in the root folder)

3. **Replace the placeholder with your actual Project ID:**

```env
# Before (what you currently have):
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id-here

# After (replace with your actual Project ID):
NEXT_PUBLIC_APPWRITE_PROJECT_ID=indian-coffee-house
```

**Example of what your complete `.env.local` should look like:**
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=indian-coffee-house
```

### **Step 3.2: Install Dependencies**

1. **Open your terminal/command prompt**

2. **Navigate to your project folder:**
   ```bash
   cd path/to/your/indian-coffee-house-project
   ```

3. **Install the required packages:**
   ```bash
   npm install
   ```

4. **Wait for installation to complete** (you'll see a progress bar)

---

## 🚀 **PART 4: Test Your Setup**

### **Step 4.1: Start Your Development Server**

1. **In your terminal, run:**
   ```bash
   npm run dev
   ```

2. **You should see output like:**
   ```
   ▲ Next.js 14.0.0
   - Local:        http://localhost:3000
   - Ready in 2.3s
   ```

3. **Open your browser** and go to: `http://localhost:3000`

### **Step 4.2: Test User Registration**

1. **On your website**, click the "Login/Sign up" button

2. **Click "Sign up here"** to go to the registration page

3. **Fill in the registration form:**
   - **First Name**: `Test`
   - **Last Name**: `User`
   - **Email**: Use a real email you can access
   - **Phone**: Any phone number
   - **Password**: Create a strong password (follow the requirements)
   - **Confirm Password**: Same as above
   - **Check "I agree to terms"**

4. **Click "Create Account"**

5. **If successful**, you should see a success message and be redirected to the home page

### **Step 4.3: Verify User Creation in Appwrite**

1. **Go back to your Appwrite Console** (https://cloud.appwrite.io)

2. **Click on "Auth"** in the left sidebar

3. **You should see your new user listed** with:
   - Email address
   - Name
   - Registration date
   - Status (Active)

4. **If you see the user**, congratulations! Your authentication is working! 🎉

---

## 🔐 **PART 5: Advanced Configuration (Optional)**

### **Step 5.1: Set Up Email Verification**

1. **In Appwrite Console**, go to "Auth" → "Settings"

2. **Find "Email Verification"** section

3. **Toggle "Enable email verification"** to ON

4. **Configure email settings:**
   - **From Name**: `Indian Coffee House`
   - **From Email**: `noreply@yourdomain.com` (or use Appwrite's default)
   - **Reply To**: Your support email

5. **Click "Update"**

### **Step 5.2: Set Up Password Recovery**

1. **In the same settings page**, find "Password Recovery"

2. **Toggle "Enable password recovery"** to ON

3. **Configure the recovery URL:**
   - **Recovery URL**: `http://localhost:3000/reset-password`

4. **Click "Update"**

---

## 🗄️ **PART 6: Set Up Database (For Future Features)**

### **Step 6.1: Create Database**

1. **In Appwrite Console**, click "Databases" in the left sidebar

2. **Click "Create Database"**

3. **Fill in details:**
   - **Database ID**: `indian-coffee-house-db`
   - **Name**: `Indian Coffee House Database`

4. **Click "Create"**

### **Step 6.2: Create Collections (Tables)**

#### **Create Users Collection:**

1. **Click on your database** to open it

2. **Click "Create Collection"**

3. **Fill in details:**
   - **Collection ID**: `users`
   - **Name**: `Users`

4. **Click "Create"**

5. **Add Attributes (Fields):**
   - Click "Create Attribute"
   - **Type**: String, **Key**: `phone`, **Size**: 20
   - **Type**: String, **Key**: `preferences`, **Size**: 500
   - **Type**: Boolean, **Key**: `newsletter`, **Default**: false

#### **Create Reservations Collection:**

1. **Click "Create Collection"** again

2. **Fill in details:**
   - **Collection ID**: `reservations`
   - **Name**: `Reservations`

3. **Add Attributes:**
   - **Type**: String, **Key**: `userId`, **Size**: 50
   - **Type**: String, **Key**: `date`, **Size**: 20
   - **Type**: String, **Key**: `time`, **Size**: 10
   - **Type**: Integer, **Key**: `guests`
   - **Type**: String, **Key**: `location`, **Size**: 100
   - **Type**: String, **Key**: `specialRequests`, **Size**: 1000

### **Step 6.3: Set Permissions**

1. **For each collection**, click on "Settings" → "Permissions"

2. **Add these permissions:**
   - **Role**: `users`, **Permissions**: Read, Write (users can manage their own data)
   - **Role**: `guests`, **Permissions**: Create (guests can create reservations)

---

## 🎯 **PART 7: Testing Everything**

### **Test Checklist:**

1. **✅ User Registration**: Can create new accounts
2. **✅ User Login**: Can log in with created accounts
3. **✅ User Logout**: Can log out successfully
4. **✅ Session Persistence**: Stay logged in after page refresh
5. **✅ Navigation Updates**: Shows user name when logged in

### **Common Issues & Solutions:**

#### **Issue 1: "Project not found" error**
- **Solution**: Check your Project ID in `.env.local` matches exactly with Appwrite Console

#### **Issue 2: CORS errors in browser console**
- **Solution**: Make sure you added `localhost:3000` as a platform in Appwrite

#### **Issue 3: "Invalid credentials" on login**
- **Solution**: Make sure the user exists and password is correct

#### **Issue 4: Registration not working**
- **Solution**: Check password meets requirements (8+ chars, uppercase, lowercase, numbers, special chars)

---

## 🎉 **Congratulations!**

You now have a fully functional authentication system! Your users can:

- ✅ **Register** for new accounts
- ✅ **Login** to existing accounts  
- ✅ **Logout** securely
- ✅ **Stay logged in** across sessions
- ✅ **See their name** in the navigation

## 🚀 **Next Steps**

Once everything is working, you can:

1. **Deploy your website** to production (Vercel, Netlify, etc.)
2. **Add your production domain** to Appwrite platforms
3. **Implement reservation system** using the database
4. **Add user profiles** and preferences
5. **Set up email notifications**

## 📞 **Need Help?**

If you get stuck:

1. **Check the browser console** for error messages (F12 → Console)
2. **Check Appwrite Console** for any error logs
3. **Review this guide** step by step
4. **Ask for help** with specific error messages

Remember: Take your time with each step and don't skip any! Each step builds on the previous one. 🚀

---

**Happy coding! ☕️ Your Indian Coffee House website now has professional user authentication!**