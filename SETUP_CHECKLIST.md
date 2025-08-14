# ✅ Setup Checklist - Indian Coffee House Authentication

## 📋 **Complete this checklist step by step**

### **Phase 1: Appwrite Account Setup**
- [ ] **1.1** Go to [https://cloud.appwrite.io](https://cloud.appwrite.io)
- [ ] **1.2** Click "Sign Up" and create account
- [ ] **1.3** Verify email address
- [ ] **1.4** Login to Appwrite Console

### **Phase 2: Create Project**
- [ ] **2.1** Click "Create Project"
- [ ] **2.2** Enter project name: `Indian Coffee House`
- [ ] **2.3** Enter project ID: `indian-coffee-house`
- [ ] **2.4** Select region closest to you
- [ ] **2.5** Click "Create"
- [ ] **2.6** **WRITE DOWN** your Project ID: `________________`

### **Phase 3: Configure Platform**
- [ ] **3.1** Go to Settings → Platforms
- [ ] **3.2** Click "Add Platform"
- [ ] **3.3** Select "Web App"
- [ ] **3.4** Enter name: `Indian Coffee House - Development`
- [ ] **3.5** Enter hostname: `localhost`
- [ ] **3.6** Enter port: `3000`
- [ ] **3.7** Click "Next" then "Skip optional steps"
- [ ] **3.8** Verify platform appears with green checkmark

### **Phase 4: Configure Authentication**
- [ ] **4.1** Go to Auth → Settings
- [ ] **4.2** Verify "Email/Password" is enabled
- [ ] **4.3** Set password policy:
  - [ ] Minimum length: 8
  - [ ] Require uppercase: ✅
  - [ ] Require lowercase: ✅
  - [ ] Require numbers: ✅
  - [ ] Require special characters: ✅
- [ ] **4.4** Click "Update"

### **Phase 5: Update Your Code**
- [ ] **5.1** Open `.env.local` file
- [ ] **5.2** Replace `your-project-id-here` with your actual Project ID
- [ ] **5.3** Save the file
- [ ] **5.4** Your file should look like:
  ```
  NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
  NEXT_PUBLIC_APPWRITE_PROJECT_ID=indian-coffee-house
  ```

### **Phase 6: Install and Test**
- [ ] **6.1** Open terminal in your project folder
- [ ] **6.2** Run: `npm install`
- [ ] **6.3** Wait for installation to complete
- [ ] **6.4** Run: `npm run dev`
- [ ] **6.5** Open browser to `http://localhost:3000`
- [ ] **6.6** Verify website loads without errors

### **Phase 7: Test Authentication**
- [ ] **7.1** Click "Login/Sign up" button
- [ ] **7.2** Click "Sign up here"
- [ ] **7.3** Fill registration form:
  - [ ] First Name: `Test`
  - [ ] Last Name: `User`
  - [ ] Email: Your real email
  - [ ] Phone: Any number
  - [ ] Password: `TestPassword123!`
  - [ ] Confirm Password: `TestPassword123!`
  - [ ] Check "I agree to terms"
- [ ] **7.4** Click "Create Account"
- [ ] **7.5** Should see success message
- [ ] **7.6** Should redirect to home page
- [ ] **7.7** Should see your name in navigation

### **Phase 8: Verify in Appwrite**
- [ ] **8.1** Go back to Appwrite Console
- [ ] **8.2** Click "Auth" in sidebar
- [ ] **8.3** Should see your test user listed
- [ ] **8.4** User should show as "Active"

### **Phase 9: Test Login**
- [ ] **9.1** Click logout (if logged in)
- [ ] **9.2** Click "Login/Sign up"
- [ ] **9.3** Enter your email and password
- [ ] **9.4** Click "Sign In"
- [ ] **9.5** Should login successfully
- [ ] **9.6** Should see your name in navigation

---

## 🎉 **Success Criteria**

You've successfully completed setup when:

✅ **Registration works** - New users can create accounts
✅ **Login works** - Users can sign in with credentials  
✅ **Logout works** - Users can sign out
✅ **Navigation updates** - Shows user name when logged in
✅ **Session persists** - User stays logged in after page refresh
✅ **Appwrite shows users** - Console displays registered users

---

## 🚨 **If Something Doesn't Work**

**STOP** and check:

1. **Browser Console** (F12 → Console) for error messages
2. **Network Tab** (F12 → Network) for failed requests
3. **Appwrite Console** for any error logs
4. **Your `.env.local`** file has correct Project ID
5. **Platform settings** in Appwrite have `localhost:3000`

**Then refer to `TROUBLESHOOTING.md` for specific solutions.**

---

## 📞 **Ready for Next Steps?**

Once all checkboxes are ✅, you can:

- [ ] Deploy to production (Vercel, Netlify)
- [ ] Add production domain to Appwrite
- [ ] Set up database collections
- [ ] Implement reservation system
- [ ] Add user profiles
- [ ] Configure email verification

---

**🎯 Take your time with each step. Don't skip any checkboxes! Each one is important for the system to work properly.**

**☕️ Happy coding! Your Indian Coffee House now has professional authentication!**