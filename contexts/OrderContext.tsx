'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { dbService } from '../lib/appwrite'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface OrderContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (itemId: number) => void
  updateQuantity: (itemId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  placeOrder: () => Promise<void>
  orderHistory: any[]
  loadOrderHistory: () => Promise<void>
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [cart, setCart] = useState<CartItem[]>([])
  const [orderHistory, setOrderHistory] = useState<any[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('coffee-house-cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('coffee-house-cart', JSON.stringify(cart))
  }, [cart])

  // Load order history when user logs in
  useEffect(() => {
    if (user) {
      loadOrderHistory()
    } else {
      setOrderHistory([])
    }
  }, [user])

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const placeOrder = async () => {
    if (!user) {
      throw new Error('Please login to place an order')
    }

    if (cart.length === 0) {
      throw new Error('Your cart is empty')
    }

    try {
      const orderData = {
        userId: user.$id,
        userEmail: user.email,
        userName: user.name,
        items: cart,
        totalItems: getTotalItems(),
        totalPrice: getTotalPrice(),
        orderDate: new Date().toISOString(),
        status: 'pending'
      }

      await dbService.createOrder(orderData)
      clearCart()
      await loadOrderHistory() // Refresh order history
    } catch (error) {
      console.error('Error placing order:', error)
      throw error
    }
  }

  const loadOrderHistory = async () => {
    if (!user) return

    try {
      const orders = await dbService.getUserOrders(user.$id)
      setOrderHistory(orders)
    } catch (error) {
      console.error('Error loading order history:', error)
    }
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    placeOrder,
    orderHistory,
    loadOrderHistory
  }

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider')
  }
  return context
}