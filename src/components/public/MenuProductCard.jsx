import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function MenuProductCard({ producto }) {
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCart();

  // Construir URL completa de la imagen si existe
  const imageUrl = producto.imagen_url 
    ? `https://prontodelivery.lat/${producto.imagen_url}`
    : null;

  const handleAddToCart = () => {
    addToCart(producto, cantidad);
    setCantidad(1); // Reset quantity after adding
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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
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
            <span className="text-orange-600 text-lg font-semibold">
              {producto.nombre}
            </span>
          </div>
        )}
        {producto.destacado && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Destacado
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {producto.nombre}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {producto.descripcion}
        </p>

        {/* Category */}
        {producto.categoria && (
          <div className="mb-4">
            <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs">
              {producto.categoria}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mb-6">
          <span className="text-3xl font-bold text-orange-600">
            Q{producto.precio?.toFixed(2)}
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-4">
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

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white py-3 rounded-lg font-normal transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <span>Agregar al Carrito</span>
          <span className="bg-orange-800 px-2 py-1 rounded text-sm">
            Q{(producto.precio * cantidad).toFixed(2)}
          </span>
        </button>
      </div>
    </div>
  );
}
