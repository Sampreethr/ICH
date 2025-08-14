# 🗄️ Database Setup Guide - Indian Coffee House

## 📋 **Collections You Need to Create in Appwrite**

Based on your `.env.local` file, you need to create these collections in your Appwrite database:

### **Collection 1: Menu Items**
- **Collection ID**: `689c4ca60029753e6a8f` (from your .env.local)
- **Name**: `Menu Items`

**Attributes to add:**
- `name` (String, Size: 100, Required: Yes)
- `description` (String, Size: 500, Required: Yes)
- `price` (Float, Required: Yes)
- `category` (String, Size: 50, Required: Yes)
- `image` (String, Size: 500, Required: Yes)
- `popular` (Boolean, Default: false)
- `rating` (Float, Default: 4.0)
- `available` (Boolean, Default: true)

### **Collection 2: Orders**
- **Collection ID**: `689c52a40008486f4431` (from your .env.local)
- **Name**: `Orders`

**Attributes to add:**
- `userId` (String, Size: 50, Required: No)
- `userEmail` (String, Size: 100, Required: Yes)
- `userName` (String, Size: 100, Required: Yes)
- `items` (String, Size: 5000, Required: Yes) - JSON string of cart items
- `totalItems` (Integer, Required: Yes)
- `totalPrice` (Float, Required: Yes)
- `orderDate` (String, Size: 50, Required: Yes)
- `status` (String, Size: 20, Default: "pending")

### **Collection 3: User Profiles**
- **Collection ID**: `689d6a8b001dc5eff4b3` (from your .env.local)
- **Name**: `User Profiles`

**Attributes to add:**
- `userId` (String, Size: 50, Required: Yes)
- `email` (String, Size: 100, Required: Yes)
- `name` (String, Size: 100, Required: Yes)
- `phone` (String, Size: 20, Required: No)
- `preferences` (String, Size: 1000, Required: No) - JSON string
- `newsletter` (Boolean, Default: false)
- `createdAt` (String, Size: 50, Required: Yes)
- `updatedAt` (String, Size: 50, Required: Yes)

### **Collection 4: Reservations** (You need to create this)
- **Collection ID**: Create new collection and update your .env.local
- **Name**: `Reservations`

**Attributes to add:**
- `userId` (String, Size: 50, Required: No)
- `userEmail` (String, Size: 100, Required: Yes)
- `userName` (String, Size: 100, Required: Yes)
- `firstName` (String, Size: 50, Required: Yes)
- `lastName` (String, Size: 50, Required: Yes)
- `email` (String, Size: 100, Required: Yes)
- `phone` (String, Size: 20, Required: Yes)
- `date` (String, Size: 20, Required: Yes)
- `time` (String, Size: 10, Required: Yes)
- `guests` (String, Size: 5, Required: Yes)
- `location` (String, Size: 100, Required: Yes)
- `specialRequests` (String, Size: 1000, Required: No)
- `status` (String, Size: 20, Default: "pending")
- `createdAt` (String, Size: 50, Required: Yes)

---

## 🔧 **How to Create Collections in Appwrite**

### **Step 1: Go to Your Database**
1. Open Appwrite Console
2. Go to "Databases"
3. Click on your database: `689c4c52003d0c52f495`

### **Step 2: Create Each Collection**
1. Click "Create Collection"
2. Enter the Collection ID and Name from above
3. Click "Create"

### **Step 3: Add Attributes**
For each collection:
1. Click on the collection name
2. Go to "Attributes" tab
3. Click "Create Attribute"
4. Select the type (String, Integer, Float, Boolean)
5. Enter the key name and size
6. Set required/default values as specified above
7. Click "Create"

### **Step 4: Set Permissions**
For each collection:
1. Go to "Settings" → "Permissions"
2. Add these permissions:
   - **Role**: `users` → **Permissions**: Read, Write
   - **Role**: `guests` → **Permissions**: Create (for reservations and orders)

---

## 📝 **Sample Data for Menu Items**

Once you create the Menu Items collection, add these sample items:

```json
{
  "name": "Filter Coffee",
  "description": "Traditional South Indian filter coffee with perfect blend of coffee and chicory",
  "price": 4.50,
  "category": "Coffee",
  "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  "popular": true,
  "rating": 4.8,
  "available": true
}
```

```json
{
  "name": "Masala Chai",
  "description": "Aromatic spiced tea with cardamom, ginger, and traditional Indian spices",
  "price": 3.80,
  "category": "Tea",
  "image": "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  "popular": false,
  "rating": 4.7,
  "available": true
}
```

---

## ✅ **What Your Website Will Do**

Once the database is set up:

### **User Registration:**
- ✅ Creates user account in Appwrite Auth
- ✅ Creates user profile in `User Profiles` collection
- ✅ Stores additional info (phone, preferences, newsletter)

### **Menu System:**
- ✅ Loads menu items from `Menu Items` collection
- ✅ Falls back to static data if database is empty
- ✅ Shows loading state while fetching

### **Cart & Orders:**
- ✅ Stores cart in localStorage (persists across sessions)
- ✅ When user places order, saves to `Orders` collection
- ✅ Includes user info, items, totals, and timestamp
- ✅ Shows order history for logged-in users

### **Reservations:**
- ✅ Saves reservation to `Reservations` collection
- ✅ Links to user account if logged in
- ✅ Stores all form data with timestamp
- ✅ Sets status as "pending"

---

## 🚨 **Important Notes**

1. **Collection IDs**: Use the exact IDs from your `.env.local` file
2. **Permissions**: Make sure to set proper read/write permissions
3. **Data Types**: Use the exact data types specified above
4. **Required Fields**: Mark fields as required as specified

---

## 🎯 **Testing Your Setup**

After creating collections:

1. **Test Registration**: Create a new user account
2. **Check User Profiles**: Should see new profile in collection
3. **Test Menu**: Should load items from database
4. **Test Orders**: Add items to cart and place order
5. **Test Reservations**: Make a reservation and check database

---

**🎉 Once all collections are created, your Indian Coffee House website will have full database functionality!**