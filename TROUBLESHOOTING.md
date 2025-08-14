# 🔧 Troubleshooting Guide - Indian Coffee House Authentication

## 🚨 **Common Errors and Solutions**

### **Error 1: "Project not found" or "Invalid project ID"**

**What you see:**
```
AppwriteException: Project with the requested ID could not be found
```

**Solution:**
1. Check your `.env.local` file
2. Make sure `NEXT_PUBLIC_APPWRITE_PROJECT_ID` matches exactly with your Appwrite Console
3. In Appwrite Console → Settings → copy the "Project ID"
4. Restart your development server: `npm run dev`

---

### **Error 2: CORS Error in Browser Console**

**What you see:**
```
Access to fetch at 'https://cloud.appwrite.io/v1/account' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**
1. Go to Appwrite Console → Settings → Platforms
2. Make sure you have added:
   - **Name**: Any name
   - **Hostname**: `localhost`
   - **Port**: `3000`
3. If it exists, delete and recreate it
4. Wait 2-3 minutes for changes to take effect

---

### **Error 3: "Invalid credentials" on Login**

**What you see:**
- Login form shows "Invalid credentials" error
- User exists in Appwrite Console

**Solution:**
1. **Check password requirements:**
   - At least 8 characters
   - Contains uppercase letter
   - Contains lowercase letter
   - Contains number
   - Contains special character
2. **Try registering a new user** to test
3. **Check if email is correct** (no extra spaces)

---

### **Error 4: Registration Not Working**

**What you see:**
- Registration form submits but no user appears in Appwrite
- Error messages about password policy

**Solution:**
1. **Check password strength:**
   - Use: `TestPassword123!`
   - This meets all requirements
2. **Check Appwrite Console → Auth → Settings:**
   - Make sure "Email/Password" is enabled
   - Check password policy settings
3. **Try with a different email address**

---

### **Error 5: "useAuth must be used within an AuthProvider"**

**What you see:**
```
Error: useAuth must be used within an AuthProvider
```

**Solution:**
1. Check that `app/layout.tsx` has `<AuthProvider>` wrapper
2. Make sure all pages using `useAuth()` are inside this wrapper
3. Restart your development server

---

### **Error 6: Environment Variables Not Loading**

**What you see:**
- `process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID` is undefined
- Console shows "undefined" for project ID

**Solution:**
1. **Check file name**: Must be `.env.local` (not `.env` or `.env.development`)
2. **Check file location**: Must be in root folder (same level as `package.json`)
3. **Restart development server**: Stop (Ctrl+C) and run `npm run dev` again
4. **Check variable names**: Must start with `NEXT_PUBLIC_`

---

### **Error 7: "Failed to fetch" or Network Errors**

**What you see:**
```
TypeError: Failed to fetch
```

**Solution:**
1. **Check internet connection**
2. **Check Appwrite endpoint**: Should be `https://cloud.appwrite.io/v1`
3. **Try in incognito/private browser window**
4. **Disable browser extensions** temporarily
5. **Check if Appwrite is down**: Visit [status.appwrite.io](https://status.appwrite.io)

---

## 🔍 **How to Debug Issues**

### **Step 1: Check Browser Console**
1. Press `F12` in your browser
2. Click "Console" tab
3. Look for red error messages
4. Copy the exact error message

### **Step 2: Check Network Tab**
1. In browser dev tools, click "Network" tab
2. Try to login/register
3. Look for failed requests (red entries)
4. Click on failed requests to see details

### **Step 3: Check Appwrite Console**
1. Go to your Appwrite project
2. Check "Auth" → see if users are being created
3. Check "Logs" for any error messages

### **Step 4: Verify Configuration**
1. **Check `.env.local`:**
   ```bash
   cat .env.local
   ```
2. **Check if variables are loaded:**
   ```javascript
   console.log(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
   ```

---

## ✅ **Testing Checklist**

Before asking for help, verify these work:

- [ ] Can access `http://localhost:3000`
- [ ] Can see login/signup button
- [ ] Can navigate to signup page
- [ ] Can fill out signup form
- [ ] Password meets requirements (8+ chars, mixed case, numbers, symbols)
- [ ] Email is valid format
- [ ] Appwrite Console shows your project
- [ ] Platform is added with `localhost:3000`
- [ ] `.env.local` has correct Project ID
- [ ] Development server restarted after changes

---

## 🆘 **Still Need Help?**

If you're still stuck, provide these details:

1. **Exact error message** (copy from browser console)
2. **What you were trying to do** (register, login, etc.)
3. **Your `.env.local` content** (hide the actual Project ID)
4. **Screenshot of Appwrite Console** showing your project settings
5. **Browser and version** you're using

### **Where to Get Help:**
- **Appwrite Discord**: [discord.gg/GSeTUeA](https://discord.gg/GSeTUeA)
- **Appwrite Documentation**: [appwrite.io/docs](https://appwrite.io/docs)
- **GitHub Issues**: [github.com/appwrite/appwrite](https://github.com/appwrite/appwrite)

---

## 🎯 **Quick Test Commands**

Run these in your terminal to verify setup:

```bash
# Check if dependencies are installed
npm list appwrite

# Check if environment variables are set
echo $NEXT_PUBLIC_APPWRITE_PROJECT_ID

# Start fresh development server
npm run dev
```

---

**Remember: Most issues are configuration problems. Double-check each step! 🚀**