'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
    Coffee,
    Menu,
    X,
    Star,
    ShoppingCart,
    Plus,
    Minus
} from 'lucide-react'
import { useOrder } from '../../contexts/OrderContext'
import { dbService } from '../../lib/appwrite'
import Navigation from '../../components/Navigation'

// Quantity Selector Component
function QuantitySelector({ initialQuantity, onConfirm, onCancel, onRemove }: {
    initialQuantity: number
    onConfirm: (quantity: number) => void
    onCancel: () => void
    onRemove?: () => void
}) {
    const [quantity, setQuantity] = useState(initialQuantity > 0 ? initialQuantity : 1)

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleIncrease = () => {
        setQuantity(quantity + 1)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-center space-x-4">
                <button
                    onClick={handleDecrease}
                    disabled={quantity <= 1}
                    className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Minus className="h-5 w-5" />
                </button>
                <span className="text-2xl font-bold text-coffee-900 min-w-[3rem] text-center">
                    {quantity}
                </span>
                <button
                    onClick={handleIncrease}
                    className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                </button>
            </div>

            <div className="space-y-3">
                {/* Remove button for existing items */}
                {initialQuantity > 0 && onRemove && (
                    <button
                        onClick={onRemove}
                        className="w-full bg-red-100 hover:bg-red-200 text-red-700 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                        <X className="h-4 w-4" />
                        <span>Remove from Cart</span>
                    </button>
                )}

                <div className="flex space-x-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(quantity)}
                        className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                        {initialQuantity > 0 ? 'Update Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function MenuPage() {
    const { cart, addToCart, removeFromCart, updateQuantity, getTotalItems, placeOrder } = useOrder()
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [menuItems, setMenuItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedItem, setSelectedItem] = useState<any>(null)
    const [showQuantityModal, setShowQuantityModal] = useState(false)

    // Load menu items from database
    useEffect(() => {
        loadMenuItems()
    }, [])

    // Debug cart state changes
    useEffect(() => {
        console.log('[DEBUG] Cart state changed:', {
            cartLength: cart.length,
            cartItems: cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity }))
        })
    }, [cart])

    // Create a simple test function to verify cart logic
    const testCartLogic = () => {
        console.log('=== CART LOGIC TEST ===')
        const testItems = [
            { $id: '1', name: 'Filter Coffee' },
            { $id: '2', name: 'Masala Chai' },
            { $id: '5', name: 'Cappuccino' }
        ]

        testItems.forEach(item => {
            const quantity = getCartItemQuantity(item.$id)
            console.log(`${item.name} (ID: ${item.$id}): ${quantity > 0 ? `IN CART (${quantity})` : 'NOT IN CART'}`)
        })
        console.log('=== END TEST ===')
    }

    // Add test functions temporarily
    useEffect(() => {
        // Add a global test function for debugging
        (window as any).testCart = testCartLogic;
        (window as any).testDatabase = async () => {
            console.log('=== DATABASE CONNECTION TEST ===')
            try {
                console.log('Testing Appwrite connection...')
                console.log('Endpoint:', process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
                console.log('Project ID:', process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
                console.log('Database ID:', process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID)

                const items = await dbService.getMenuItems()
                console.log('✅ Database connection successful!')
                console.log('Menu items found:', items.length)
                console.log('Sample items:', items.slice(0, 3).map(item => ({ id: item.$id, name: item.name })))

                const { account } = await import('../../lib/appwrite')
                try {
                    const user = await account.get()
                    console.log('✅ User authenticated:', user.name, user.email)
                } catch {
                    console.log('ℹ️ No user currently logged in')
                }

            } catch (error) {
                console.log('❌ Database connection failed:', error)
            }
            console.log('=== END DATABASE TEST ===')
        }
        console.log('Added window.testDatabase() function for debugging')
    }, [cart])

    const loadMenuItems = async () => {
        try {
            setLoading(true)
            console.log('[DEBUG] Loading menu items...')

            // Test database connection
            console.log('[DEBUG] Testing database connection...')
            const items = await dbService.getMenuItems()
            console.log('[DEBUG] Database response:', items.length, 'items found')

            if (items.length > 0) {
                console.log('[DEBUG] ✅ Database connected! Using database items')
                setMenuItems(items)
            } else {
                console.log('[DEBUG] ⚠️ Database empty, using static data')
                setMenuItems(staticMenuData)
            }
        } catch (error) {
            console.error('Error loading menu items:', error)
            console.log('[DEBUG] Error occurred, using static data')
            setMenuItems(staticMenuData)
        } finally {
            setLoading(false)
            console.log('[DEBUG] Menu loading complete')
        }
    }

    // Static menu data organized by meal times and beverage types
    const staticMenuData = [
        // BREAKFAST SECTION (6:00 AM - 11:00 AM)
        {
            $id: '1',
            name: "Masala Dosa",
            description: "Crispy rice crepe filled with spiced potatoes, served with sambar and coconut chutney",
            price: 6.50,
            category: "Breakfast",
            image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.9
        },
        {
            $id: '2',
            name: "Idli Sambar",
            description: "Steamed rice cakes served with lentil curry and coconut chutney",
            price: 5.80,
            category: "Breakfast",
            image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.7
        },
        {
            $id: '3',
            name: "Upma",
            description: "Savory semolina porridge with vegetables and spices",
            price: 4.20,
            category: "Breakfast",
            image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.3
        },
        {
            $id: '4',
            name: "Poha",
            description: "Flattened rice with onions, peanuts, and curry leaves",
            price: 3.90,
            category: "Breakfast",
            image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.4
        },
        {
            $id: '5',
            name: "Uttapam",
            description: "Thick pancake made with rice and lentil batter, topped with vegetables",
            price: 5.50,
            category: "Breakfast",
            image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.5
        },
        {
            $id: '6',
            name: "Paratha with Curd",
            description: "Stuffed flatbread served with fresh yogurt and pickle",
            price: 4.80,
            category: "Breakfast",
            image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.6
        },

        // LUNCH SECTION (11:00 AM - 4:00 PM)
        {
            $id: '7',
            name: "Thali Meal",
            description: "Complete Indian meal with rice, dal, vegetables, roti, and dessert",
            price: 12.50,
            category: "Lunch",
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.8
        },
        {
            $id: '8',
            name: "Biryani",
            description: "Fragrant basmati rice with spiced vegetables and aromatic herbs",
            price: 9.80,
            category: "Lunch",
            image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.9
        },
        {
            $id: '9',
            name: "Chole Bhature",
            description: "Spiced chickpeas served with deep-fried bread",
            price: 7.50,
            category: "Lunch",
            image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.6
        },
        {
            $id: '10',
            name: "Rajma Rice",
            description: "Kidney bean curry served with steamed basmati rice",
            price: 8.20,
            category: "Lunch",
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.4
        },
        {
            $id: '11',
            name: "Paneer Butter Masala",
            description: "Cottage cheese in rich tomato and butter gravy with naan",
            price: 10.50,
            category: "Lunch",
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.7
        },
        {
            $id: '12',
            name: "Dal Tadka with Rice",
            description: "Tempered lentils served with steamed rice and papad",
            price: 6.80,
            category: "Lunch",
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.3
        },

        // DINNER SECTION (4:00 PM - 10:00 PM)
        {
            $id: '13',
            name: "Butter Chicken",
            description: "Tender chicken in creamy tomato sauce served with naan and rice",
            price: 14.50,
            category: "Dinner",
            image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.9
        },
        {
            $id: '14',
            name: "Lamb Curry",
            description: "Slow-cooked lamb in aromatic spices with basmati rice",
            price: 16.80,
            category: "Dinner",
            image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.8
        },
        {
            $id: '15',
            name: "Fish Curry",
            description: "Fresh fish cooked in coconut curry with rice",
            price: 13.20,
            category: "Dinner",
            image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.6
        },
        {
            $id: '16',
            name: "Tandoori Platter",
            description: "Mixed grilled meats and vegetables from the tandoor oven",
            price: 18.50,
            category: "Dinner",
            image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.9
        },
        {
            $id: '17',
            name: "Vegetable Korma",
            description: "Mixed vegetables in creamy cashew and coconut sauce",
            price: 11.80,
            category: "Dinner",
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.5
        },
        {
            $id: '18',
            name: "Samosa Chat",
            description: "Crispy samosas topped with yogurt, chutneys, and spices",
            price: 5.50,
            category: "Dinner",
            image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.7
        },

        // HOT BEVERAGES SECTION
        {
            $id: '19',
            name: "Filter Coffee",
            description: "Traditional South Indian filter coffee with perfect blend of coffee and chicory",
            price: 4.50,
            category: "Hot Beverages",
            image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.8
        },
        {
            $id: '20',
            name: "Masala Chai",
            description: "Aromatic spiced tea with cardamom, ginger, and traditional Indian spices",
            price: 3.80,
            category: "Hot Beverages",
            image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.7
        },
        {
            $id: '21',
            name: "Cappuccino",
            description: "Classic cappuccino with perfectly steamed milk and rich foam",
            price: 4.80,
            category: "Hot Beverages",
            image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.8
        },
        {
            $id: '22',
            name: "Espresso",
            description: "Rich and bold espresso shot made from premium Arabica beans",
            price: 3.50,
            category: "Hot Beverages",
            image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.9
        },
        {
            $id: '23',
            name: "Latte",
            description: "Smooth and creamy latte with perfectly steamed milk",
            price: 4.60,
            category: "Hot Beverages",
            image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.5
        },
        {
            $id: '24',
            name: "Green Tea",
            description: "Light and refreshing green tea with antioxidants",
            price: 3.40,
            category: "Hot Beverages",
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.2
        },

        // COLD BEVERAGES SECTION
        {
            $id: '25',
            name: "Cold Coffee",
            description: "Refreshing iced coffee with milk and a touch of vanilla",
            price: 5.20,
            category: "Cold Beverages",
            image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.6
        },
        {
            $id: '26',
            name: "Mango Lassi",
            description: "Traditional Indian yogurt drink with fresh mango",
            price: 4.50,
            category: "Cold Beverages",
            image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.8
        },
        {
            $id: '27',
            name: "Iced Latte",
            description: "Chilled espresso with cold milk and ice",
            price: 4.80,
            category: "Cold Beverages",
            image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.4
        },
        {
            $id: '28',
            name: "Fresh Lime Soda",
            description: "Sparkling water with fresh lime juice and mint",
            price: 3.80,
            category: "Cold Beverages",
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.3
        },
        {
            $id: '29',
            name: "Iced Tea",
            description: "Refreshing iced tea with lemon and mint",
            price: 3.20,
            category: "Cold Beverages",
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.1
        },
        {
            $id: '30',
            name: "Coconut Water",
            description: "Fresh tender coconut water served chilled",
            price: 3.50,
            category: "Cold Beverages",
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.2
        },

        // DESSERTS SECTION
        {
            $id: '31',
            name: "Gulab Jamun",
            description: "Traditional Indian sweet dumplings in rose syrup",
            price: 4.50,
            category: "Desserts",
            image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.8
        },
        {
            $id: '32',
            name: "Rasmalai",
            description: "Soft cottage cheese dumplings in sweetened milk",
            price: 5.20,
            category: "Desserts",
            image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.7
        },
        {
            $id: '33',
            name: "Kulfi",
            description: "Traditional Indian ice cream with cardamom and pistachios",
            price: 3.80,
            category: "Desserts",
            image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: true,
            rating: 4.6
        },
        {
            $id: '34',
            name: "Chocolate Brownie",
            description: "Rich chocolate brownie served warm with vanilla ice cream",
            price: 5.50,
            category: "Desserts",
            image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.5
        },
        {
            $id: '35',
            name: "Kheer",
            description: "Traditional rice pudding with cardamom and nuts",
            price: 4.20,
            category: "Desserts",
            image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            popular: false,
            rating: 4.4
        }
    ]

    const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Hot Beverages', 'Cold Beverages', 'Desserts']

    const filteredItems = selectedCategory === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === selectedCategory)

    // Debug filtered items
    useEffect(() => {
        console.log('[DEBUG] Filtered items changed:', {
            selectedCategory,
            totalMenuItems: menuItems.length,
            filteredCount: filteredItems.length,
            filteredItems: filteredItems.map(item => ({ id: item.$id, name: item.name, category: item.category }))
        })
    }, [filteredItems, selectedCategory])

    // Debug menu items structure
    useEffect(() => {
        console.log('[DEBUG] Menu items state changed:', {
            totalItems: menuItems.length,
            loading: loading,
            itemIds: menuItems.length > 0 ? menuItems.map(item => ({ id: item.$id, name: item.name })) : 'No items'
        })
    }, [menuItems, loading])

    const handleAddToCart = (item: any) => {
        setSelectedItem(item)
        setShowQuantityModal(true)
    }

    const handleRemoveFromCart = (itemId: string) => {
        updateQuantity(parseInt(itemId), getCartItemQuantity(itemId) - 1)
    }

    const handleIncreaseQuantity = (itemId: string) => {
        updateQuantity(parseInt(itemId), getCartItemQuantity(itemId) + 1)
    }

    /**
     * Get the quantity of a specific item in the cart
     * @param itemId - String ID from menu item (e.g., '1', '2', '3')
     * @returns number - Quantity of item in cart, 0 if not found
     */
    const getCartItemQuantity = (itemId: string) => {
        const numericId = parseInt(itemId)
        const cartItem = cart.find(item => item.id === numericId)

        // Debug logging to trace the issue
        console.log(`[DEBUG] Checking item ${itemId}:`, {
            itemId,
            numericId,
            cartItem,
            cartLength: cart.length,
            cartIds: cart.map(item => item.id),
            result: cartItem ? cartItem.quantity : 0
        })

        return cartItem ? cartItem.quantity : 0
    }

    const handleModalAddToCart = (quantity: number) => {
        if (selectedItem && quantity > 0) {
            const itemId = parseInt(selectedItem.$id)
            const existingQuantity = getCartItemQuantity(selectedItem.$id)

            if (existingQuantity > 0) {
                // Update existing item
                updateQuantity(itemId, quantity)
            } else {
                // Add new item with correct quantity
                addToCart({
                    id: itemId,
                    name: selectedItem.name,
                    price: selectedItem.price,
                    image: selectedItem.image
                })
                // Only update if quantity is different from 1
                if (quantity !== 1) {
                    updateQuantity(itemId, quantity)
                }
            }
        }
        setShowQuantityModal(false)
        setSelectedItem(null)
    }

    const handleModalClose = () => {
        setShowQuantityModal(false)
        setSelectedItem(null)
    }

    const handleModalRemove = () => {
        if (selectedItem) {
            // Remove item completely from cart
            const currentQuantity = getCartItemQuantity(selectedItem.$id)
            if (currentQuantity > 0) {
                updateQuantity(parseInt(selectedItem.$id), 0)
            }
        }
        setShowQuantityModal(false)
        setSelectedItem(null)
    }

    const handlePlaceOrder = async () => {
        try {
            await placeOrder()
            alert('Order placed successfully! Thank you for your order.')
        } catch (error: any) {
            alert(error.message || 'Failed to place order. Please try again.')
        }
    }

    return (
        <div className="min-h-screen bg-cream-50">
            {/* Navigation */}
            <Navigation currentPage="Menu" showCart={false} cartItems={0} />

            {/* Hero Section */}
            <section className="relative pt-20 pb-16 bg-gradient-to-br from-coffee-900 to-coffee-800">
                <div className="container-custom text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
                            Our Menu
                        </h1>
                        <p className="text-xl text-cream-100 max-w-2xl mx-auto">
                            Discover our carefully curated selection of premium coffees, traditional Indian beverages,
                            and delicious accompaniments.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8 bg-white">
                <div className="container-custom">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-amber-600 text-white'
                                    : 'bg-cream-100 text-coffee-600 hover:bg-amber-100'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Menu Items */}
            <section className="section-padding">
                <div className="container-custom">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
                            <p className="mt-4 text-coffee-600">Loading delicious menu items...</p>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    key={item.$id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover relative"
                                >
                                    {item.popular && (
                                        <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                                            Popular
                                        </div>
                                    )}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-serif text-xl font-bold text-coffee-900">{item.name}</h3>
                                            <span className="text-amber-600 font-bold text-lg">${item.price.toFixed(2)}</span>
                                        </div>

                                        <div className="flex items-center mb-3">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${i < Math.floor(item.rating)
                                                            ? 'text-amber-400 fill-current'
                                                            : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-coffee-600 ml-2">({item.rating})</span>
                                        </div>

                                        <p className="text-coffee-600 mb-4">{item.description}</p>

                                        <div className="flex items-center justify-between">
                                            {getCartItemQuantity(item.$id) > 0 ? (
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2"
                                                >
                                                    <span>In Cart: {getCartItemQuantity(item.$id)}</span>
                                                    <span className="text-xs opacity-75">Click to edit</span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    <span>Add to Cart</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Cart Summary */}
            {cart.length > 0 && (
                <section className="section-padding bg-amber-50 cart-summary-section">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h3 className="font-serif text-2xl font-bold text-coffee-900 mb-6 text-center">
                                    Your Order Summary
                                </h3>

                                <div className="space-y-4 mb-6">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center py-2 border-b border-coffee-100">
                                            <div>
                                                <h4 className="font-medium text-coffee-900">{item.name}</h4>
                                                <p className="text-sm text-coffee-600">Quantity: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold text-coffee-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-coffee-200 pt-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-coffee-900">Total:</span>
                                        <span className="text-xl font-bold text-amber-600">
                                            ${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-coffee-600 mt-2">
                                        {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart
                                    </p>
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Place Order
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

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

            {/* Floating Cart Button */}
            {cart.length > 0 && (
                <div className="fixed bottom-6 right-6 z-50">
                    <button
                        onClick={() => {
                            // Scroll to cart summary section
                            const cartSection = document.querySelector('.cart-summary-section')
                            if (cartSection) {
                                cartSection.scrollIntoView({ behavior: 'smooth' })
                            }
                        }}
                        className="bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg hover:shadow-xl transition-colors duration-200 flex items-center space-x-3 px-4 py-3"
                    >
                        <div className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            {/* Cart count badge */}
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                {getTotalItems()}
                            </div>
                        </div>
                        <div className="text-sm font-medium">
                            ${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                        </div>
                    </button>
                </div>
            )}

            {/* Quantity Selection Modal */}
            <AnimatePresence>
                {showQuantityModal && selectedItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                        >
                            <div className="text-center mb-6">
                                <img
                                    src={selectedItem.image}
                                    alt={selectedItem.name}
                                    className="w-20 h-20 object-cover rounded-xl mx-auto mb-4"
                                />
                                <h3 className="font-serif text-xl font-bold text-coffee-900 mb-2">
                                    {selectedItem.name}
                                </h3>
                                <p className="text-amber-600 font-bold text-lg">
                                    ${selectedItem.price.toFixed(2)}
                                </p>
                            </div>

                            <QuantitySelector
                                initialQuantity={getCartItemQuantity(selectedItem.$id)}
                                onConfirm={handleModalAddToCart}
                                onCancel={handleModalClose}
                                onRemove={handleModalRemove}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}