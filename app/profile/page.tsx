'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  User, 
  Menu, 
  X,
  Edit3,
  MapPin,
  Clock,
  Star,
  Coffee,
  Calendar,
  Gift,
  Settings,
  Heart,
  ShoppingBag,
  Bell,
  CreditCard,
  LogOut,
  Camera,
  Save
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useOrder } from '../../contexts/OrderContext'
import { dbService } from '../../lib/appwrite'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { orderHistory, loadOrderHistory } = useOrder()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    preferences: {
      favoriteLocation: '',
      dietaryRestrictions: '',
      newsletterSubscription: false
    }
  })

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Contact Us', href: '/contact' },
  ]

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'orders', name: 'Order History', icon: ShoppingBag },
    { id: 'reservations', name: 'Reservations', icon: Calendar },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'rewards', name: 'Rewards', icon: Gift },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  useEffect(() => {
    if (user) {
      loadUserProfile()
      loadOrderHistory()
    }
  }, [user])

  const loadUserProfile = async () => {
    try {
      setLoading(true)
      const profile = await dbService.getUserProfile(user.$id)
      setUserProfile(profile)
      
      if (profile) {
        setEditForm({
          name: user.name || '',
          phone: profile.phone || '',
          preferences: {
            favoriteLocation: profile.preferences?.favoriteLocation || '',
            dietaryRestrictions: profile.preferences?.dietaryRestrictions || '',
            newsletterSubscription: profile.newsletter || false
          }
        })
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      if (userProfile) {
        await dbService.updateUserProfile(userProfile.$id, {
          phone: editForm.phone,
          preferences: editForm.preferences,
          newsletter: editForm.preferences.newsletterSubscription
        })
        await loadUserProfile()
        setIsEditing(false)
        alert('Profile updated successfully!')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <Coffee className="h-16 w-16 text-coffee-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-coffee-900 mb-4">Please Login</h2>
          <p className="text-coffee-600 mb-6">You need to be logged in to view your profile.</p>
          <Link href="/login" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300">
            Login Now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Coffee className="h-5 w-5 text-amber-700" />
                  </div>
                </div>
                <div>
                  <span className="font-serif text-xl font-bold text-coffee-900 block leading-tight">
                    Indian Coffee House
                  </span>
                  <span className="text-xs text-coffee-600 uppercase tracking-wide">
                    Restaurant
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-medium transition-colors duration-200 text-coffee-600 hover:text-amber-600"
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/reservation" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300">
                Reservation
              </Link>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-coffee-600" />
                  <span className="text-coffee-600 font-medium">
                    {user.name || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-coffee-600 hover:text-red-600 font-medium transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="container-custom py-4 space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-3 text-coffee-600 hover:text-amber-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-coffee-100 pt-4 space-y-2">
                  <Link
                    href="/reservation"
                    className="block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Reservation
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full bg-red-100 hover:bg-red-200 text-red-700 px-6 py-3 rounded-full font-medium transition-all duration-300 text-center"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Profile Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-coffee-900 to-coffee-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <User className="h-12 w-12 text-coffee-700" />
              </div>
              <button className="absolute bottom-0 right-0 bg-amber-600 hover:bg-amber-700 p-2 rounded-full shadow-lg transition-colors">
                <Camera className="h-4 w-4 text-white" />
              </button>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              Welcome back, {user.name?.split(' ')[0] || 'Coffee Lover'}!
            </h1>
            <p className="text-cream-100 text-lg">
              {user.email}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-amber-100 text-amber-700 font-medium'
                            : 'text-coffee-600 hover:bg-coffee-50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      {/* Quick Stats */}
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                          <ShoppingBag className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                          <h3 className="text-2xl font-bold text-coffee-900">{orderHistory.length}</h3>
                          <p className="text-coffee-600">Total Orders</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                          <Gift className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                          <h3 className="text-2xl font-bold text-coffee-900">250</h3>
                          <p className="text-coffee-600">Reward Points</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                          <Heart className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                          <h3 className="text-2xl font-bold text-coffee-900">5</h3>
                          <p className="text-coffee-600">Favorite Items</p>
                        </div>
                      </div>

                      {/* Profile Information */}
                      <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="font-serif text-2xl font-bold text-coffee-900">Profile Information</h2>
                          <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-medium"
                          >
                            <Edit3 className="h-4 w-4" />
                            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                          </button>
                        </div>

                        {isEditing ? (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-coffee-900 font-medium mb-2">Full Name</label>
                              <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </div>
                            <div>
                              <label className="block text-coffee-900 font-medium mb-2">Phone Number</label>
                              <input
                                type="tel"
                                value={editForm.phone}
                                onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                              />
                            </div>
                            <div>
                              <label className="block text-coffee-900 font-medium mb-2">Favorite Location</label>
                              <select
                                value={editForm.preferences.favoriteLocation}
                                onChange={(e) => setEditForm({
                                  ...editForm, 
                                  preferences: {...editForm.preferences, favoriteLocation: e.target.value}
                                })}
                                className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                              >
                                <option value="">Select Location</option>
                                <option value="sydney">Sydney - George Street</option>
                                <option value="melbourne">Melbourne - Collins Street</option>
                                <option value="brisbane">Brisbane - Queen Street</option>
                              </select>
                            </div>
                            <div className="flex space-x-4">
                              <button
                                onClick={handleSaveProfile}
                                className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                              >
                                <Save className="h-4 w-4" />
                                <span>Save Changes</span>
                              </button>
                              <button
                                onClick={() => setIsEditing(false)}
                                className="flex items-center space-x-2 bg-coffee-100 hover:bg-coffee-200 text-coffee-700 px-6 py-3 rounded-lg font-medium transition-all duration-300"
                              >
                                <X className="h-4 w-4" />
                                <span>Cancel</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-coffee-600 text-sm font-medium mb-1">Full Name</label>
                              <p className="text-coffee-900 font-medium">{user.name || 'Not provided'}</p>
                            </div>
                            <div>
                              <label className="block text-coffee-600 text-sm font-medium mb-1">Email</label>
                              <p className="text-coffee-900 font-medium">{user.email}</p>
                            </div>
                            <div>
                              <label className="block text-coffee-600 text-sm font-medium mb-1">Phone</label>
                              <p className="text-coffee-900 font-medium">{userProfile?.phone || 'Not provided'}</p>
                            </div>
                            <div>
                              <label className="block text-coffee-600 text-sm font-medium mb-1">Favorite Location</label>
                              <p className="text-coffee-900 font-medium">
                                {userProfile?.preferences?.favoriteLocation || 'Not selected'}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'orders' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h2 className="font-serif text-2xl font-bold text-coffee-900 mb-6">Order History</h2>
                      {orderHistory.length > 0 ? (
                        <div className="space-y-4">
                          {orderHistory.map((order) => (
                            <div key={order.$id} className="border border-coffee-100 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <p className="font-medium text-coffee-900">Order #{order.$id.slice(-8)}</p>
                                  <p className="text-sm text-coffee-600">
                                    {new Date(order.orderDate).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-amber-600">${order.totalPrice.toFixed(2)}</p>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {order.status}
                                  </span>
                                </div>
                              </div>
                              <div className="text-sm text-coffee-600">
                                {order.totalItems} item{order.totalItems !== 1 ? 's' : ''}
                              </div>
                              <button className="mt-3 text-amber-600 hover:text-amber-700 font-medium text-sm">
                                Reorder
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <ShoppingBag className="h-16 w-16 text-coffee-300 mx-auto mb-4" />
                          <h3 className="text-xl font-medium text-coffee-900 mb-2">No orders yet</h3>
                          <p className="text-coffee-600 mb-6">Start exploring our delicious menu!</p>
                          <Link href="/menu" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300">
                            Browse Menu
                          </Link>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'reservations' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h2 className="font-serif text-2xl font-bold text-coffee-900 mb-6">Reservations</h2>
                      <div className="text-center py-12">
                        <Calendar className="h-16 w-16 text-coffee-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-coffee-900 mb-2">No reservations</h3>
                        <p className="text-coffee-600 mb-6">Book a table for your next visit!</p>
                        <Link href="/reservation" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300">
                          Make Reservation
                        </Link>
                      </div>
                    </div>
                  )}

                  {activeTab === 'favorites' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h2 className="font-serif text-2xl font-bold text-coffee-900 mb-6">Favorite Items</h2>
                      <div className="text-center py-12">
                        <Heart className="h-16 w-16 text-coffee-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-coffee-900 mb-2">No favorites yet</h3>
                        <p className="text-coffee-600 mb-6">Save your favorite items for quick ordering!</p>
                        <Link href="/menu" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300">
                          Browse Menu
                        </Link>
                      </div>
                    </div>
                  )}

                  {activeTab === 'rewards' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h2 className="font-serif text-2xl font-bold text-coffee-900 mb-6">Rewards & Loyalty</h2>
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white mb-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-xl font-bold mb-2">Your Points</h3>
                            <p className="text-3xl font-bold">250</p>
                          </div>
                          <Gift className="h-12 w-12 opacity-80" />
                        </div>
                        <div className="mt-4 bg-white/20 rounded-full h-2">
                          <div className="bg-white rounded-full h-2 w-1/2"></div>
                        </div>
                        <p className="text-sm mt-2 opacity-90">250 more points to next reward!</p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="border border-coffee-100 rounded-lg p-4">
                          <h4 className="font-medium text-coffee-900 mb-2">Free Coffee</h4>
                          <p className="text-sm text-coffee-600 mb-3">500 points required</p>
                          <button className="w-full bg-coffee-100 text-coffee-700 py-2 rounded-lg font-medium">
                            250 points to go
                          </button>
                        </div>
                        <div className="border border-coffee-100 rounded-lg p-4">
                          <h4 className="font-medium text-coffee-900 mb-2">Free Pastry</h4>
                          <p className="text-sm text-coffee-600 mb-3">300 points required</p>
                          <button className="w-full bg-coffee-100 text-coffee-700 py-2 rounded-lg font-medium">
                            50 points to go
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'settings' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h2 className="font-serif text-2xl font-bold text-coffee-900 mb-6">Account Settings</h2>
                      <div className="space-y-6">
                        <div className="border-b border-coffee-100 pb-6">
                          <h3 className="font-medium text-coffee-900 mb-4">Notifications</h3>
                          <div className="space-y-3">
                            <label className="flex items-center justify-between">
                              <span className="text-coffee-600">Email notifications</span>
                              <input type="checkbox" className="toggle" defaultChecked />
                            </label>
                            <label className="flex items-center justify-between">
                              <span className="text-coffee-600">Order updates</span>
                              <input type="checkbox" className="toggle" defaultChecked />
                            </label>
                            <label className="flex items-center justify-between">
                              <span className="text-coffee-600">Promotional offers</span>
                              <input type="checkbox" className="toggle" />
                            </label>
                          </div>
                        </div>
                        
                        <div className="border-b border-coffee-100 pb-6">
                          <h3 className="font-medium text-coffee-900 mb-4">Security</h3>
                          <button className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-medium">
                            <Settings className="h-4 w-4" />
                            <span>Change Password</span>
                          </button>
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-coffee-900 mb-4">Account Actions</h3>
                          <button 
                            onClick={handleLogout}
                            className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}