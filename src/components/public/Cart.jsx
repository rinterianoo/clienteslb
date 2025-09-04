import { useCart } from '../../context/CartContext';
import { XMarkIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

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

  if (!isCartOpen) return null;

  const total = getCartTotal();

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={toggleCart}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <ShoppingBagIcon className="w-6 h-6 mr-2 text-orange-500" />
              Tu Pedido
            </h2>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                <p className="text-gray-400 text-sm mt-2">Agrega algunos productos para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => {
                  // Construir URL completa de la imagen
                  const imageUrl = item.imagen_url 
                    ? `https://prontodelivery.lat/${item.imagen_url}`
                    : null;
                    
                  return (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start space-x-4">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={item.nombre}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                            <span className="text-orange-600 text-xs font-semibold text-center leading-tight">
                              {item.nombre?.substring(0, 8)}
                            </span>
                          </div>
                        )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg text-gray-900 truncate">
                          {item.nombre}
                        </h3>
                        <p className="text-orange-600 font-bold text-lg">
                          Q{item.precio?.toFixed(2)}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center mt-3 space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                            className="p-1 hover:bg-orange-100 rounded-full transition-colors"
                          >
                            <MinusIcon className="w-4 h-4 text-orange-600" />
                          </button>
                          <span className="text-lg w-8 text-center">
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                            className="p-1 hover:bg-orange-100 rounded-full transition-colors"
                          >
                            <PlusIcon className="w-4 h-4 text-orange-600" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Subtotal */}
                    <div className="mt-3 text-right">
                      <p className="text-gray-600">
                        Subtotal: <span className="text-gray-900">Q{(item.precio * item.cantidad).toFixed(2)}</span>
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
            <div className="border-t border-gray-200 p-6 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-gray-900">Total:</span>
                <span className="text-orange-600">Q{total.toFixed(2)}</span>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white py-4 rounded-lg font-normal text-lg transition-all duration-300 transform hover:scale-105">
                  Proceder al Pago
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-normal transition-colors"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
