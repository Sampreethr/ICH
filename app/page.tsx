'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Award,
  Users,
  Leaf
} from 'lucide-react'
import Logo from '../components/Logo'
import Navigation from '../components/Navigation'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation currentPage="Home" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Coffee background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-2xl p-2">
                <Logo size="xl" />
              </div>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4 text-shadow">
              Indian Coffee House
            </h1>
            <p className="text-lg md:text-xl mb-2 text-amber-200 uppercase tracking-widest font-medium">
              Restaurant
            </p>
            <p className="text-xl md:text-2xl mb-8 text-cream-100 max-w-3xl mx-auto leading-relaxed">
              Bringing the authentic taste of India to Australia since our establishment. 
              Experience premium coffee with traditional hospitality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Explore Our Menu
              </Link>
              <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-coffee-900 px-8 py-3 rounded-full font-medium transition-all duration-300">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-coffee-900 mb-6">
              Our Heritage
            </h2>
            <p className="text-lg text-coffee-600 max-w-3xl mx-auto">
              A legacy of exceptional coffee and warm hospitality, now proudly serving Australia 
              with the same passion and authenticity that has defined us for generations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Coffee beans"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-6 rounded-2xl">
                  <Award className="h-8 w-8 mb-2" />
                  <p className="font-semibold">Premium Quality</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="font-serif text-3xl font-bold text-coffee-900">
                Authentic Indian Coffee Experience
              </h3>
              <p className="text-coffee-600 leading-relaxed">
                Our journey began with a simple mission: to bring the rich, authentic flavors 
                of Indian coffee culture to Australia. Every cup we serve carries the tradition 
                of generations, crafted with premium beans and served with genuine hospitality.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-cream-50 rounded-xl">
                  <Users className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-coffee-900">10,000+</h4>
                  <p className="text-sm text-coffee-600">Happy Customers</p>
                </div>
                <div className="text-center p-4 bg-cream-50 rounded-xl">
                  <Leaf className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-coffee-900">100%</h4>
                  <p className="text-sm text-coffee-600">Organic Beans</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Opening Hours Section */}
      <section className="section-padding relative overflow-hidden">
        {/* Background with modern gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(217,119,6,0.1),transparent_50%)]"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-block mb-6">
              <span className="text-amber-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">
                Visit Us
              </span>
              <h2 className="font-black text-5xl md:text-7xl bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
                Opening Hours
              </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl"
            >
              {/* Elegant header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Weekly Schedule
                </h3>
                <p className="text-gray-400 text-sm font-medium tracking-wide">
                  We're here to serve you exceptional coffee
                </p>
              </div>
              
              {/* Modern schedule list */}
              <div className="space-y-1">
                {[
                  { day: 'Monday', hours: 'Closed', closed: true },
                  { day: 'Tuesday', hours: '9 AM - 2 PM', closed: false },
                  { day: 'Wednesday', hours: '9 AM - 2 PM', closed: false },
                  { day: 'Thursday', hours: '9 AM - 2 PM', closed: false },
                  { day: 'Friday', hours: '9 AM - 2 PM', closed: false },
                  { day: 'Saturday', hours: '9 AM - 2 PM', closed: false },
                  { day: 'Sunday', hours: 'Closed', closed: true }
                ].map((item, index) => (
                  <motion.div
                    key={item.day}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group flex justify-between items-center py-5 px-6 rounded-2xl transition-all duration-300 hover:bg-white/5 ${
                      !item.closed ? 'border-l-4 border-amber-500' : 'border-l-4 border-gray-600'
                    }`}
                  >
                    <span className="text-white font-semibold text-lg tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {item.day}
                    </span>
                    <div className="flex items-center space-x-3">
                      {!item.closed && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      )}
                      <span className={`font-bold text-lg tracking-wide ${
                        item.closed 
                          ? 'text-red-400' 
                          : 'text-amber-400'
                      }`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {item.hours}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Modern contact section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-16 pt-10 border-t border-white/10"
              >
                <div className="text-center mb-8">
                  <h4 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Ready to Experience Authentic Coffee?
                  </h4>
                  <p className="text-gray-400 font-medium">
                    Reserve your table or give us a call
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a 
                    href="tel:0243152100" 
                    className="group flex items-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-amber-500/50 px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Call Now</p>
                      <p className="text-white font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>02 43 15 21 00</p>
                    </div>
                  </a>
                  
                  <div className="hidden sm:block w-px h-12 bg-white/20"></div>
                  
                  <Link 
                    href="/reservation" 
                    className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <span className="flex items-center space-x-2">
                      <span>Reserve Table</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-coffee-900 text-white section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Logo size="sm" />
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