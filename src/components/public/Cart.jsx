import { useCart } from '../../context/CartContext';
import { XMarkIcon, MinusIcon, PlusIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';
import { useShippingCalculation, getMensajePromoEnvio } from '../../hooks/useShipping';

export default function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    isCartOpen, 
    toggleCart,
    clearCart
  } = useCart();

  const [isClearing, setIsClearing] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isCartOpen) return null;

  const subtotalCarrito = getCartTotal();
  const { subtotal, recargo, total, esEnvioGratis } = useShippingCalculation(subtotalCarrito);
  const promoEnvio = getMensajePromoEnvio(subtotalCarrito);

  const handleClearCart = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
    }, 300);
  };

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={toggleCart}
      />
      
      {/* Cart Sidebar - Mobile Optimized */}
      <div className="fixed right-0 top-0 h-full w-full sm:max-w-md lg:max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
            <ShoppingBagIcon className="w-6 h-6 mr-2 text-orange-500" />
            Tu Pedido
            {cartItems.length > 0 && (
              <span className="ml-2 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                {cartItems.reduce((total, item) => total + item.cantidad, 0)}
              </span>
            )}
          </h2>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 sm:py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBagIcon className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-gray-500 text-lg mb-2">Tu carrito está vacío</p>
              <p className="text-gray-400 text-sm">Agrega algunos productos para comenzar</p>
              <button
                onClick={toggleCart}
                className="mt-6 bg-gradient-to-r from-orange-500 to-orange-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
              >
                Explorar Menú
              </button>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {cartItems.map((item) => {
                // Construir URL completa de la imagen
                const imageUrl = item.imagen_url 
                  ? `https://prontodelivery.lat/${item.imagen_url}`
                  : null;
                  
                return (
                  <div key={item.id} className="bg-gray-50 rounded-2xl p-3 sm:p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start space-x-3">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={item.nombre}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                            <span className="text-orange-600 text-xs font-medium text-center leading-tight px-1">
                              {item.nombre?.substring(0, 8)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                          {item.nombre}
                        </h3>
                        <p className="text-orange-600 font-bold text-lg">
                          Q{item.precio?.toFixed(2)}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                              className="p-1.5 hover:bg-orange-100 rounded-full transition-colors"
                            >
                              <MinusIcon className="w-4 h-4 text-orange-600" />
                            </button>
                            <span className="text-lg font-bold w-8 text-center">
                              {item.cantidad}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                              className="p-1.5 hover:bg-orange-100 rounded-full transition-colors"
                            >
                              <PlusIcon className="w-4 h-4 text-orange-600" />
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Subtotal */}
                    <div className="mt-3 text-right">
                      <p className="text-gray-600 text-sm">
                        Subtotal: <span className="font-bold text-gray-900">Q{(item.precio * item.cantidad).toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-4 sm:p-6 space-y-4 bg-white">
            {/* Total */}
            <div className="space-y-2">
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">Q{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">{esEnvioGratis ? 'Envío:' : 'Recargo por envío:'}</span>
                <span className={esEnvioGratis ? 'text-green-600 font-medium' : 'text-gray-900'}>
                  {esEnvioGratis ? 'GRATIS' : `Q${recargo.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold border-t border-gray-200 pt-2">
                <span className="text-gray-900">Total:</span>
                <span className="text-orange-600">Q{total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white py-4 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Proceder al Pago
              </button>
              <button
                onClick={handleClearCart}
                disabled={isClearing}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
              >
                {isClearing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Vaciando...</span>
                  </>
                ) : (
                  <>
                    <TrashIcon className="w-4 h-4" />
                    <span>Vaciar Carrito</span>
                  </>
                )}
              </button>
            </div>

            
          </div>
        )}
      </div>
      
      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={handleCloseCheckout}
      />
    </>
  );
}