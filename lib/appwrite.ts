import { Client, Account, Databases, ID } from 'appwrite'

// Validate environment variables
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID

if (!endpoint || !projectId) {
  throw new Error('Missing Appwrite environment variables')
}

// Initialize Appwrite Client
const client = new Client()

// Set endpoint and project
client
  .setEndpoint(endpoint)
  .setProject(projectId)

// Initialize Appwrite services
export const account = new Account(client)
export const databases = new Databases(client)

// Export client and ID for other uses
export { client, ID }

// Database and Collection IDs from your .env.local
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
export const MENU_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_MENU_COLLECTION_ID!
export const ORDERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDERS_COLLECTION_ID!
export const PROFILES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID!

// Database service functions
export const dbService = {
  // Create user profile
  async createUserProfile(userId: string, userData: any) {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        PROFILES_COLLECTION_ID,
        ID.unique(),
        {
          userId,
          ...userData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      )
    } catch (error) {
      console.error('Error creating user profile:', error)
      throw error
    }
  },

  // Get user profile
  async getUserProfile(userId: string) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PROFILES_COLLECTION_ID,
        [
          `userId=${userId}`
        ]
      )
      return response.documents[0] || null
    } catch (error) {
      console.error('Error getting user profile:', error)
      return null
    }
  },

  // Update user profile
  async updateUserProfile(documentId: string, userData: any) {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        PROFILES_COLLECTION_ID,
        documentId,
        {
          ...userData,
          updatedAt: new Date().toISOString()
        }
      )
    } catch (error) {
      console.error('Error updating user profile:', error)
      throw error
    }
  },

  // Create order
  async createOrder(orderData: any) {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        ID.unique(),
        {
          ...orderData,
          createdAt: new Date().toISOString(),
          status: 'pending'
        }
      )
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  },

  // Get user orders
  async getUserOrders(userId: string) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        [
          `userId=${userId}`
        ]
      )
      return response.documents
    } catch (error) {
      console.error('Error getting user orders:', error)
      return []
    }
  },

  // Get menu items
  async getMenuItems() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        MENU_COLLECTION_ID
      )
      return response.documents
    } catch (error) {
      console.error('Error getting menu items:', error)
      return []
    }
  },

  // Create reservation
  async createReservation(reservationData: any) {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        'reservations', // You'll need to create this collection
        ID.unique(),
        {
          ...reservationData,
          createdAt: new Date().toISOString(),
          status: 'pending'
        }
      )
    } catch (error) {
      console.error('Error creating reservation:', error)
      throw error
    }
  },

  // Get user reservations
  async getUserReservations(userId: string) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        'reservations',
        [
          `userId=${userId}`
        ]
      )
      return response.documents
    } catch (error) {
      console.error('Error getting user reservations:', error)
      return []
    }
  }
}