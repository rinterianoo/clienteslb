import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { PlusIcon, MinusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function MenuProductCard({ producto }) {
  const [cantidad, setCantidad] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  // Construir URL completa de la imagen si existe
  const imageUrl = producto.imagen_url 
    ? `https://prontodelivery.lat/${producto.imagen_url}`
    : null;

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(producto, cantidad);
    
    // Feedback visual
    setTimeout(() => {
      setIsAdding(false);
      setCantidad(1); // Reset quantity after adding
    }, 500);
  };

  const incrementQuantity = () => {
    setCantidad(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={producto.nombre}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              console.error('Error cargando imagen:', imageUrl);
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
            <span className="text-orange-600 text-lg font-semibold text-center px-4">
              {producto.nombre}
            </span>
          </div>
        )}
        {producto.destacado && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
            ⭐ Destacado
          </div>
        )}
        
        {/* Quick add button for mobile */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center sm:hidden"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {producto.nombre}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
          {producto.descripcion}
        </p>

        {/* Category */}
        {producto.categoria && (
          <div className="mb-3 sm:mb-4">
            <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs">
              {producto.categoria}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mb-4 sm:mb-6">
          <span className="text-2xl sm:text-3xl font-bold text-orange-600">
            Q{producto.precio?.toFixed(2)}
          </span>
        </div>

        {/* Quantity Selector - Desktop/Tablet only */}
        <div className="hidden sm:flex items-center justify-between mb-4">
          <span className="text-gray-700">Cantidad:</span>
          <div className="flex items-center space-x-3">
            <button
              onClick={decrementQuantity}
              disabled={cantidad <= 1}
              className="p-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-full transition-colors"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            <span className="text-lg w-8 text-center">
              {cantidad}
            </span>
            <button
              onClick={incrementQuantity}
              className="p-2 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-full transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button - Desktop/Tablet */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`hidden sm:flex w-full items-center justify-center space-x-2 py-3 sm:py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            isAdding 
              ? 'bg-green-500 text-white' 
              : 'bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white'
          }`}
        >
          {isAdding ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Agregado!</span>
            </>
          ) : (
            <>
              <ShoppingBagIcon className="w-5 h-5" />
              <span>Agregar Q{(producto.precio * cantidad).toFixed(2)}</span>
            </>
          )}
        </button>

        {/* Mobile quantity and add section */}
        <div className="sm:hidden space-y-3">
          {/* Quantity selector for mobile */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 text-sm">Cantidad:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={decrementQuantity}
                disabled={cantidad <= 1}
                className="p-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 rounded-full transition-colors"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="text-lg w-8 text-center font-medium">
                {cantidad}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-2 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-full transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add button for mobile */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full flex items-center justify-center space-x-2 py-3 rounded-2xl font-medium transition-all duration-300 transform active:scale-95 ${
              isAdding 
                ? 'bg-green-500 text-white' 
                : 'bg-gradient-to-r from-orange-500 to-orange-700 text-white'
            }`}
          >
            {isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>¡Agregado!</span>
              </>
            ) : (
              <>
                <ShoppingBagIcon className="w-4 h-4" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
