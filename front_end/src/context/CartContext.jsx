import { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product, quantity = 1) => {
    if (product.stock === 0) {
      toast.error('Producto sin stock disponible')
      return false
    }
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + quantity, product.stock)
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        )
      }
      return [...prevCart, { ...product, quantity }]
    })
    toast.success(`${product.name} agregado al carrito!`)
    return true
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(item => item.id === productId)
      if (itemToRemove) {
        toast.info(`${itemToRemove.name} eliminado del carrito`)
      }
      return prevCart.filter(item => item.id !== productId)
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
    toast.info('Cantidad actualizada')
  }

  const clearCart = () => {
    setCart([])
    toast.info('Carrito vaciado')
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
