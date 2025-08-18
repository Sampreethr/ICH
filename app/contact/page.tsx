'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Coffee, 
  Menu, 
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send
} from 'lucide-react'
import Navigation from '../../components/Navigation'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const locations = [
    {
      city: "Sydney",
      address: "123 George Street, Sydney NSW 2000",
      phone: "+61 2 9876 5432",
      email: "sydney@indiancoffeehouse.com.au",
      hours: "6:00 AM - 10:00 PM",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      city: "Melbourne",
      address: "456 Collins Street, Melbourne VIC 3000",
      phone: "+61 3 9876 5432",
      email: "melbourne@indiancoffeehouse.com.au",
      hours: "6:00 AM - 10:00 PM",
      image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      city: "Brisbane",
      address: "789 Queen Street, Brisbane QLD 4000",
      phone: "+61 7 9876 5432",
      email: "brisbane@indiancoffeehouse.com.au",
      hours: "6:00 AM - 10:00 PM",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Navigation */}
      <Navigation currentPage="Contact Us" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-coffee-900 to-coffee-800">
        <div className="container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-cream-100 max-w-2xl mx-auto">
              We'd love to hear from you. Get in touch with us for any questions, 
              feedback, or to learn more about our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl font-bold text-coffee-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-coffee-900 font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
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
                      value={formData.lastName}
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
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-coffee-900 font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="+61 xxx xxx xxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-coffee-900 font-medium mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="reservation">Reservation</option>
                    <option value="catering">Catering Services</option>
                    <option value="feedback">Feedback</option>
                    <option value="franchise">Franchise Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-coffee-900 font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-serif text-3xl font-bold text-coffee-900 mb-6">
                  Get in Touch
                </h2>
                <p className="text-coffee-600 mb-8">
                  We're here to help and answer any questions you might have. 
                  We look forward to hearing from you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee-900 mb-1">Phone</h3>
                    <p className="text-coffee-600">+61 1800 COFFEE</p>
                    <p className="text-coffee-600">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee-900 mb-1">Email</h3>
                    <p className="text-coffee-600">hello@indiancoffeehouse.com.au</p>
                    <p className="text-coffee-600">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee-900 mb-1">Head Office</h3>
                    <p className="text-coffee-600">Level 10, 100 Collins Street</p>
                    <p className="text-coffee-600">Melbourne VIC 3000</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee-900 mb-1">Business Hours</h3>
                    <p className="text-coffee-600">Monday - Sunday: 6:00 AM - 10:00 PM</p>
                    <p className="text-coffee-600">All locations</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-coffee-900 mb-6">
              Visit Our Locations
            </h2>
            <p className="text-lg text-coffee-600 max-w-3xl mx-auto">
              Find your nearest Indian Coffee House location and experience the authentic taste 
              of Indian coffee culture right here in Australia.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.city}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-coffee-900 mb-4">
                    {location.city}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-coffee-600">{location.address}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-amber-600 flex-shrink-0" />
                      <p className="text-coffee-600">{location.phone}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-amber-600 flex-shrink-0" />
                      <p className="text-coffee-600">{location.email}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-amber-600 flex-shrink-0" />
                      <p className="text-coffee-600">{location.hours}</p>
                    </div>
                  </div>
                  <button className="w-full bg-amber-100 text-amber-600 hover:bg-amber-200 px-6 py-2 rounded-lg font-medium transition-all duration-300 mt-6">
                    Get Directions
                  </button>
                </div>
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
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-amber-100 shadow-sm">
                    <img 
                        src="/logo.png" 
                        alt="Indian Coffee House Logo"
                        className="w-full h-full object-cover"
                    />
                </div>
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