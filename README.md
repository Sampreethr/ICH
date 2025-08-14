# Indian Coffee House (ICH) 🇮🇳☕

A modern, full-stack restaurant website for Indian Coffee House Australia, built with Next.js 15, TypeScript, and Appwrite.

## 🌟 Features

### 🍽️ **Complete Restaurant Experience**
- **Comprehensive Menu System** - Organized by meal times (Breakfast, Lunch, Dinner) and beverage types
- **User Authentication** - Secure login/signup with Appwrite
- **Profile Management** - User profiles with order history and preferences
- **Online Ordering** - Add to cart, quantity management, and order placement
- **Table Reservations** - Book tables with date/time selection
- **Contact System** - Multi-location contact information

### 🎨 **Modern UI/UX**
- **Responsive Design** - Works perfectly on all devices
- **Smooth Animations** - Framer Motion for elegant transitions
- **Professional Design** - Clean, modern cafe aesthetic
- **Interactive Components** - Hover effects, modals, and smooth navigation

### 🛠️ **Technical Stack**
- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom coffee-themed colors
- **Backend**: Appwrite (Database, Authentication, Storage)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API

## 📱 **Pages & Features**

### 🏠 **Home Page**
- Hero section with brand introduction
- About section with heritage story
- Opening hours and contact information
- Responsive navigation with authentication

### 🍽️ **Menu Page**
- **35+ Menu Items** organized by categories:
  - 🌅 Breakfast (6 items) - Dosa, Idli, Upma, etc.
  - 🍛 Lunch (6 items) - Thali, Biryani, Curries, etc.
  - 🍽️ Dinner (6 items) - Butter Chicken, Tandoori, etc.
  - ☕ Hot Beverages (6 items) - Filter Coffee, Masala Chai, etc.
  - 🧊 Cold Beverages (6 items) - Cold Coffee, Lassi, etc.
  - 🍰 Desserts (5 items) - Gulab Jamun, Kulfi, etc.
- **Smart Cart System** - Quantity selection modal, floating cart button
- **Category Filtering** - Easy browsing by meal type
- **High-quality Images** - Professional food photography

### 👤 **Profile Page**
- **Dashboard Overview** - Order stats, reward points, favorites
- **Order History** - Complete past orders with reorder functionality
- **Reservations** - Booking history and management
- **Favorites** - Saved menu items for quick access
- **Rewards System** - Loyalty points and available rewards
- **Account Settings** - Profile editing, notifications, security

### 📅 **Reservation Page**
- **Date/Time Selection** - Available slots and booking calendar
- **Party Size** - Guest count selection
- **Location Choice** - Multiple restaurant locations
- **Special Requests** - Dietary requirements and celebrations
- **Confirmation System** - Email confirmations and booking management

### 📞 **Contact Page**
- **Multi-location Information** - Sydney, Melbourne, Brisbane
- **Contact Form** - Subject categorization and inquiry management
- **Business Hours** - Location-specific operating hours
- **Interactive Elements** - Smooth form validation and submission

## 🔐 **Authentication System**
- **Secure Login/Signup** - Appwrite authentication
- **Password Recovery** - Forgot password functionality
- **Profile Management** - User data and preferences
- **Session Management** - Secure logout and session handling

## 🛒 **Shopping Cart Features**
- **Quantity Modal** - Clean quantity selection interface
- **Floating Cart Button** - Shows item count and total price
- **Cart Summary** - Detailed order review before placement
- **Order Placement** - Integration with Appwrite database

## 🎯 **Database Integration**
- **Menu Management** - Dynamic menu loading from Appwrite
- **Order System** - Complete order tracking and history
- **User Profiles** - Comprehensive user data management
- **Reservations** - Booking system with status tracking

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Appwrite account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sampreethr/ICH.git
   cd ICH
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Appwrite credentials:
   ```
   NEXT_PUBLIC_APPWRITE_ENDPOINT=your_endpoint
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   NEXT_PUBLIC_APPWRITE_MENU_COLLECTION_ID=your_menu_collection_id
   NEXT_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID=your_orders_collection_id
   NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID=your_profiles_collection_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 **Project Structure**

```
ICH/
├── app/                          # Next.js 13+ App Router
│   ├── contact/                  # Contact page
│   ├── login/                    # Authentication pages
│   ├── menu/                     # Menu page with cart system
│   ├── profile/                  # User profile dashboard
│   ├── reservation/              # Table booking system
│   ├── signup/                   # User registration
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Reusable components
│   ├── Logo.tsx                  # Brand logo component
│   └── Navigation.tsx            # Main navigation
├── contexts/                     # React Context providers
│   ├── AuthContext.tsx           # Authentication state
│   └── OrderContext.tsx          # Shopping cart state
├── hooks/                        # Custom React hooks
│   └── useFavorites.ts           # Favorites management
├── lib/                          # Utility libraries
│   └── appwrite.ts               # Appwrite configuration
└── public/                       # Static assets
```

## 🎨 **Design System**

### Color Palette
- **Coffee Brown**: `#8B4513` - Primary brand color
- **Cream**: `#F5F5DC` - Background and accent
- **Amber**: `#D97706` - Call-to-action buttons
- **Warm Grays**: Various shades for text and borders

### Typography
- **Headings**: Serif fonts for elegance
- **Body**: Sans-serif for readability
- **Responsive**: Fluid typography scaling

## 🔧 **Configuration**

### Appwrite Setup
1. Create Appwrite project
2. Set up authentication
3. Create database with collections:
   - `menu` - Menu items
   - `orders` - Order history
   - `profiles` - User profiles
   - `reservations` - Table bookings

### Environment Variables
All sensitive configuration is handled through environment variables for security.

## 🚀 **Deployment**

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Works with Next.js static export
- **Railway**: Full-stack deployment
- **DigitalOcean**: App Platform deployment

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Indian Coffee House** - For the authentic Indian cafe experience
- **Appwrite** - For the excellent backend-as-a-service platform
- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Unsplash** - For high-quality food photography

## 📞 **Support**

For support, email sampreethbeereddy@gmail.com or create an issue in this repository.

---

**Built with ❤️ for Indian Coffee House Australia** 🇦🇺☕