import { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext();
export { CartContext };
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);
  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  const addToCart = (producto, cantidad = 1) => {
    setCartItems(prevItems => {
      // Si el producto tiene comentario, tratarlo como un item único
      if (producto.comentario) {
        // Generar un ID único para productos con comentarios
        const uniqueId = `${producto._id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        return [...prevItems, { ...producto, _id: uniqueId, originalId: producto._id, cantidad }];
      }
      
      // Para productos sin comentario, usar la lógica original
      const existingItem = prevItems.find(item => 
        item._id === producto._id && !item.comentario
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item._id === producto._id && !item.comentario
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prevItems, { ...producto, cantidad }];
      }
    });
  };
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId
          ? { ...item, cantidad: newQuantity }
          : item
      )
    );
  };
  const clearCart = () => {
    setCartItems([]);
  };
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };
  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.cantidad, 0);
  };
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isCartOpen,
    toggleCart,
    setIsCartOpen
  };
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
