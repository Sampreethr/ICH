'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react'
import Logo from './Logo'
import { useAuth } from '../contexts/AuthContext'

interface NavigationProps {
  currentPage?: string
  showCart?: boolean
  cartItems?: number
}

export default function Navigation({ currentPage = '', showCart = false, cartItems = 0 }: NavigationProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      alert('Logged out successfully!')
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Contact Us', href: '/contact' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <Logo size="md" />
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
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-medium transition-colors duration-300 py-2 group ${
                  item.name === currentPage
                    ? 'text-amber-600'
                    : 'text-coffee-600 hover:text-amber-600'
                }`}
              >
                {item.name}
                {/* Animated underline */}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full ${
                  item.name === currentPage ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}
            
            {/* Reservation Button */}
            <Link 
              href="/reservation" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Reservation
            </Link>
            
            {/* Cart */}
            {showCart && (
              <div className="relative">
                <button className="bg-coffee-100 hover:bg-coffee-200 text-coffee-700 px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 transform hover:scale-105">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart ({cartItems})</span>
                </button>
              </div>
            )}
            
            {/* User Profile or Login */}
            {user ? (
              <div className="relative ml-4">
                {/* Profile Icon with Dropdown */}
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="group relative"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110">
                    <User className="h-5 w-5 text-white" />
                  </div>
                </button>
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-coffee-100 py-2 z-50"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-coffee-100">
                        <p className="text-sm font-medium text-coffee-900">
                          {user.name || 'User'}
                        </p>
                        <p className="text-xs text-coffee-600 truncate">
                          {user.email}
                        </p>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          href="/profile"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-coffee-700 hover:bg-coffee-50 hover:text-amber-600 transition-colors duration-200"
                        >
                          <User className="h-4 w-4" />
                          <span>My Profile</span>
                        </Link>
                        
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false)
                            handleLogout()
                          }}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-coffee-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 w-full text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Backdrop to close dropdown */}
                {isProfileDropdownOpen && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  />
                )}
              </div>
            ) : (
              <Link 
                href="/login" 
                className="bg-coffee-100 hover:bg-coffee-200 text-coffee-700 px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ml-4"
              >
                Login/Sign up
              </Link>
            )}
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
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-3 font-medium transition-all duration-300 ${
                    item.name === currentPage
                      ? 'text-amber-600 border-l-4 border-amber-600 pl-4'
                      : 'text-coffee-600 hover:text-amber-600 hover:border-l-4 hover:border-amber-600 hover:pl-4'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-coffee-100 pt-4 space-y-3">
                <Link
                  href="/reservation"
                  className="block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 text-center transform hover:scale-105"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reservation
                </Link>
                
                {showCart && (
                  <button 
                    className="block w-full bg-coffee-100 hover:bg-coffee-200 text-coffee-700 px-4 py-3 rounded-full font-medium transition-all duration-300 text-center transform hover:scale-105"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cart ({cartItems})
                  </button>
                )}
                
                {user ? (
                  <div className="space-y-3 pt-2 border-t border-coffee-100">
                    <div className="flex items-center justify-center space-x-3 py-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-coffee-700 font-medium">
                        {user.name?.split(' ')[0] || 'User'}
                      </span>
                    </div>
                    <Link
                      href="/profile"
                      className="block bg-coffee-100 hover:bg-coffee-200 text-coffee-700 px-6 py-3 rounded-full font-medium transition-all duration-300 text-center transform hover:scale-105"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full bg-red-100 hover:bg-red-200 text-red-700 px-6 py-3 rounded-full font-medium transition-all duration-300 text-center transform hover:scale-105"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block bg-coffee-100 hover:bg-coffee-200 text-coffee-700 px-6 py-3 rounded-full font-medium transition-all duration-300 text-center transform hover:scale-105"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login/Sign up
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}