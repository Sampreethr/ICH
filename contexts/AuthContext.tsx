'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Models, OAuthProvider } from 'appwrite'

interface AuthContextType {
  user: Models.User<Models.Preferences> | null
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  register: (email: string, password: string, name: string, additionalData?: any) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { account } = await import('../lib/appwrite')
      const currentUser = await account.get()
      setUser(currentUser)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const { account } = await import('../lib/appwrite')
      
      // Create email session
      const session = await account.createEmailPasswordSession(email, password)
      console.log('Session created:', session)
      
      // Get current user
      const currentUser = await account.get()
      console.log('User retrieved:', currentUser)
      
      setUser(currentUser)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (email: string, password: string, name: string, additionalData?: any) => {
    try {
      const { account, ID } = await import('../lib/appwrite')
      
      // Create user account
      const newUser = await account.create(ID.unique(), email, password, name)
      
      // Create session
      await account.createEmailPasswordSession(email, password)
      
      // Get current user
      const currentUser = await account.get()
      setUser(currentUser)

      // Create user profile in database
      try {
        const { dbService } = await import('../lib/appwrite')
        await dbService.createUserProfile(currentUser.$id, {
          email: currentUser.email,
          name: currentUser.name,
          phone: additionalData?.phone || '',
          preferences: additionalData?.preferences || {},
          newsletter: additionalData?.newsletter || false
        })
      } catch (dbError) {
        console.error('Error creating user profile:', dbError)
        // Don't throw error here as user account is already created
      }
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const loginWithGoogle = async () => {
    try {
      const { account } = await import('../lib/appwrite')
      
      // Create OAuth2 session with Google
      // This will redirect to Google's OAuth page
      account.createOAuth2Session(
        OAuthProvider.Google,
        `${window.location.origin}/auth/callback`, // Success redirect
        `${window.location.origin}/login?error=oauth_failed` // Failure redirect
      )
    } catch (error) {
      console.error('Google OAuth error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      const { account } = await import('../lib/appwrite')
      await account.deleteSession('current')
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  const value = {
    user,
    login,
    loginWithGoogle,
    register,
    logout,
    checkAuth,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}