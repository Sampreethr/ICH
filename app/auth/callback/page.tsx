'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../contexts/AuthContext'

export default function AuthCallback() {
  const router = useRouter()
  const { checkAuth } = useAuth()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Wait a moment for the session to be established
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Check if user is now authenticated
        const { account } = await import('../../../lib/appwrite')
        const user = await account.get()
        
        if (user) {
          // Try to create user profile if it doesn't exist
          try {
            const { dbService } = await import('../../../lib/appwrite')
            await dbService.createUserProfile(user.$id, {
              email: user.email,
              name: user.name,
              phone: '',
              preferences: {},
              newsletter: false
            })
          } catch (dbError) {
            // Profile might already exist, that's okay
            console.log('Profile creation skipped:', dbError)
          }
          
          // Redirect to menu page on successful login
          router.push('/menu')
        } else {
          // No user found, redirect to login with error
          router.push('/login?error=oauth_failed')
        }
      } catch (error) {
        console.error('OAuth callback error:', error)
        router.push('/login?error=oauth_failed')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-coffee-900 mb-2">Completing your login...</h2>
        <p className="text-coffee-600">Please wait while we set up your account.</p>
      </div>
    </div>
  )
}