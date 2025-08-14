'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Mail, 
  ArrowLeft,
  CheckCircle,
  Clock
} from 'lucide-react'
import Logo from '../../components/Logo'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log('Password reset request for:', email)
      setIsEmailSent(true)
      setIsLoading(false)
    }, 2000)
  }

  const handleResendEmail = () => {
    setIsLoading(true)
    setTimeout(() => {
      console.log('Resending email to:', email)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-amber-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-5"></div>
      
      <div className="relative w-full max-w-md">
        {/* Back to Login Link */}
        <Link 
          href="/login" 
          className="inline-flex items-center space-x-2 text-coffee-600 hover:text-amber-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Login</span>
        </Link>

        {/* Forgot Password Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-8 border border-cream-200"
        >
          {!isEmailSent ? (
            <>
              {/* Logo and Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <Logo size="lg" />
                </div>
                <h1 className="font-serif text-3xl font-bold text-coffee-900 mb-2">
                  Forgot Password?
                </h1>
                <p className="text-coffee-600">
                  No worries! Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {/* Reset Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-coffee-900 font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-coffee-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-coffee-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending reset link...</span>
                    </div>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>

              {/* Additional Help */}
              <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="font-medium text-coffee-900 mb-2">Need help?</h3>
                <p className="text-sm text-coffee-600 mb-3">
                  If you're having trouble accessing your account, you can:
                </p>
                <ul className="text-sm text-coffee-600 space-y-1">
                  <li>• Contact our support team at support@indiancoffeehouse.com.au</li>
                  <li>• Call us at +61 1800 COFFEE</li>
                  <li>• Visit any of our locations for assistance</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                </div>
                <h1 className="font-serif text-3xl font-bold text-coffee-900 mb-2">
                  Check Your Email
                </h1>
                <p className="text-coffee-600 mb-4">
                  We've sent a password reset link to:
                </p>
                <p className="font-medium text-coffee-900 bg-cream-50 px-4 py-2 rounded-lg">
                  {email}
                </p>
              </div>

              {/* Instructions */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-900 mb-1">What's next?</h3>
                    <p className="text-sm text-blue-700">
                      Click the link in your email to reset your password. The link will expire in 24 hours for security reasons.
                    </p>
                  </div>
                </div>

                <div className="text-sm text-coffee-600 space-y-2">
                  <p>• Check your spam/junk folder if you don't see the email</p>
                  <p>• The email may take a few minutes to arrive</p>
                  <p>• Make sure you entered the correct email address</p>
                </div>
              </div>

              {/* Resend Email */}
              <div className="space-y-4">
                <button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  className="w-full bg-white border border-coffee-200 text-coffee-700 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-cream-50 hover:border-coffee-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-coffee-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Resending...</span>
                    </div>
                  ) : (
                    'Resend Email'
                  )}
                </button>

                <Link 
                  href="/login"
                  className="block w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition-all duration-300 text-center"
                >
                  Back to Login
                </Link>
              </div>
            </>
          )}

          {/* Login Link */}
          {!isEmailSent && (
            <div className="mt-8 text-center">
              <p className="text-coffee-600">
                Remember your password?{' '}
                <Link 
                  href="/login" 
                  className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-coffee-500">
          <p>© 2024 Indian Coffee House Australia. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}