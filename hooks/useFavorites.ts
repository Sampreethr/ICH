'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

export function useFavorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<number[]>([])

  // Load favorites from localStorage
  useEffect(() => {
    if (user) {
      const savedFavorites = localStorage.getItem(`favorites-${user.$id}`)
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
    }
  }, [user])

  // Save favorites to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites-${user.$id}`, JSON.stringify(favorites))
    }
  }, [favorites, user])

  const addToFavorites = (itemId: number) => {
    setFavorites(prev => [...prev, itemId])
  }

  const removeFromFavorites = (itemId: number) => {
    setFavorites(prev => prev.filter(id => id !== itemId))
  }

  const toggleFavorite = (itemId: number) => {
    if (favorites.includes(itemId)) {
      removeFromFavorites(itemId)
    } else {
      addToFavorites(itemId)
    }
  }

  const isFavorite = (itemId: number) => {
    return favorites.includes(itemId)
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite
  }
}