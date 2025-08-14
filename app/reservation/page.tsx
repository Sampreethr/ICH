'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Coffee,
  Menu,
  X,
  Calendar,
  Clock,
  Users,
  MapPin,
  Check
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import Navigation from '../../components/Navigation'

export default function ReservationPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [reservationData, setReservationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    location: '',
    specialRequests: ''
  })

  const locations = [
    { value: 'sydney', label: 'Sydney - George Street' },
    { value: 'melbourne', label: 'Melbourne - Collins Street' },
    { value: 'brisbane', label: 'Brisbane - Queen Street' }
  ]

  const timeSlots = [
    '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM',
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const { useAuth } = await import('../../contexts/AuthContext')
      const { dbService } = await import('../../lib/appwrite')
      
      // Get current user (if logged in)
      const authModule = await import('../../contexts/AuthContext')
      
      const reservationPayload = {
        ...reservationData,
        userId: user ? user.$id : null,
        userEmail: user ? user.email : reservationData.email,
        userName: user ? user.name : `${reservationData.firstName} ${reservationData.lastName}`,
        createdAt: new Date().toISOString(),
        status: 'pending'
      }

      await dbService.createReservation(reservationPayload)
      
      alert('Thank you for your reservation! We will confirm your booking shortly.')
      setReservationData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        location: '',
        specialRequests: ''
      })
    } catch (error: any) {
      console.error('Reservation error:', error)
      alert(error.message || 'Failed to make reservation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <Navigation currentPage="Reservation" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-coffee-900 to-coffee-800">
        <div className="container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
              Make a Reservation
            </h1>
            <p className="text-xl text-cream-100 max-w-2xl mx-auto">
              Reserve your table and experience the authentic taste of Indian coffee culture
              in a warm and welcoming atmosphere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl font-bold text-coffee-900 mb-4">
                Book Your Table
              </h2>
              <p className="text-coffee-600">
                Fill in the details below to secure your reservation. We'll confirm your booking within 30 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-coffee-900 font-medium mb-2">
                    <Users className="inline h-4 w-4 mr-2" />
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={reservationData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-coffee-900 font-medium mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={reservationData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-coffee-900 font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={reservationData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-coffee-900 font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={reservationData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="+61 xxx xxx xxx"
                  />
                </div>
              </div>

              {/* Reservation Details */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-coffee-900 font-medium mb-2">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={reservationData.date}
                    onChange={handleInputChange}
                    min={today}
                    required
                    className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-coffee-900 font-medium mb-2">
                    <Clock className="inline h-4 w-4 mr-2" />
                    Time *
                  </label>
                  <select
                    name="time"
                    value={reservationData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-coffee-900 font-medium mb-2">
                    <Users className="inline h-4 w-4 mr-2" />
                    Guests *
                  </label>
                  <select
                    name="guests"
                    value={reservationData.guests}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-coffee-900 font-medium mb-2">
                  <MapPin className="inline h-4 w-4 mr-2" />
                  Location *
                </label>
                <select
                  name="location"
                  value={reservationData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select location</option>
                  {locations.map((location) => (
                    <option key={location.value} value={location.value}>
                      {location.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-coffee-900 font-medium mb-2">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={reservationData.specialRequests}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Any special dietary requirements, celebrations, or other requests..."
                ></textarea>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Reservation Policy:</p>
                    <ul className="space-y-1">
                      <li>• Reservations are held for 15 minutes past the booking time</li>
                      <li>• For groups of 8 or more, please call us directly</li>
                      <li>• Cancellations can be made up to 2 hours before your reservation</li>
                      <li>• We'll send you a confirmation email within 30 minutes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 text-lg"
              >
                <Calendar className="h-5 w-5" />
                <span>Confirm Reservation</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Why Reserve Section */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl font-bold text-coffee-900 mb-6">
              Why Reserve with Us?
            </h2>
            <p className="text-lg text-coffee-600 max-w-3xl mx-auto">
              Secure your spot at Indian Coffee House and enjoy these exclusive benefits.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Check className="h-8 w-8" />,
                title: "Guaranteed Seating",
                description: "Skip the wait and enjoy guaranteed seating at your preferred time and location."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Group Accommodations",
                description: "Perfect for family gatherings, business meetings, or special celebrations."
              },
              {
                icon: <Coffee className="h-8 w-8" />,
                title: "Premium Service",
                description: "Enjoy priority service and personalized attention from our dedicated staff."
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
                  {benefit.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-coffee-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-coffee-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-coffee-900 text-white section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="https://i.imgur.com/YourLogoId.png"
                  alt="Indian Coffee House Logo"
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='95' fill='%23f5f5dc' stroke='%23654321' stroke-width='10'/%3E%3Ctext x='100' y='70' text-anchor='middle' font-family='serif' font-size='24' font-weight='bold' fill='%23654321'%3EINDIAN%3C/text%3E%3Ctext x='100' y='95' text-anchor='middle' font-family='serif' font-size='20' font-weight='bold' fill='%23654321'%3ECOFFEE%3C/text%3E%3Ctext x='100' y='120' text-anchor='middle' font-family='serif' font-size='20' font-weight='bold' fill='%23654321'%3EHOUSE%3C/text%3E%3Ctext x='100' y='150' text-anchor='middle' font-family='serif' font-size='14' fill='%23654321'%3ERESTAURANT%3C/text%3E%3Ccircle cx='100' cy='100' r='75' fill='none' stroke='%23b22222' stroke-width='4'/%3E%3C/svg%3E"
                  }}
                />
                <span className="font-serif text-xl font-bold">Indian Coffee House</span>
              </div>
              <p className="text-cream-200 mb-4">
                Bringing authentic Indian coffee culture to Australia with premium quality and traditional hospitality.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-cream-200 hover:text-cream-100 transition-colors">Home</Link></li>
                <li><Link href="/menu" className="text-cream-200 hover:text-cream-100 transition-colors">Menu</Link></li>
                <li><Link href="/contact" className="text-cream-200 hover:text-cream-100 transition-colors">Contact Us</Link></li>
                <li><Link href="/reservation" className="text-cream-200 hover:text-cream-100 transition-colors">Reservation</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-cream-200 hover:text-cream-100 transition-colors">Online Ordering</a></li>
                <li><a href="#" className="text-cream-200 hover:text-cream-100 transition-colors">Catering</a></li>
                <li><a href="#" className="text-cream-200 hover:text-cream-100 transition-colors">Corporate Events</a></li>
                <li><a href="#" className="text-cream-200 hover:text-cream-100 transition-colors">Franchising</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-cream-200">
                <li>+61 1800 COFFEE</li>
                <li>hello@indiancoffeehouse.com.au</li>
                <li>Level 10, 100 Collins Street<br />Melbourne VIC 3000</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-coffee-700 pt-8 text-center">
            <p className="text-cream-200">
              © 2024 Indian Coffee House Australia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}