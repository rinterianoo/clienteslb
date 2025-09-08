import { useState } from 'react';
import { useMenu } from "../../context/MenuContext";
import { Link } from "react-router-dom";
import { ENVIRONMENT } from '../../config/api';
export default function ProductCard({ producto }) {
  const [imageError, setImageError] = useState(false);
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2,
    }).format(price);
  };
  // Construir URL completa de la imagen según el entorno
  const getImageUrl = (imagenUrl) => {
    if (!imagenUrl) return null;
    // Si ya es una URL completa, usarla directamente
    if (imagenUrl.startsWith('http')) {
      return imagenUrl;
    }
    // Construir URL según el entorno
    if (ENVIRONMENT === 'development') {
      return `http://localhost/Pronto-delivery/${imagenUrl}`;
    } else {
      return `https://prontodelivery.lat/midelivery/${imagenUrl}`;
    }
  };
  const imageUrl = getImageUrl(producto.imagen_url);
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      {imageUrl && !imageError ? (
        <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
          <img 
            src={imageUrl} 
            alt={producto.nombre}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            style={{ display: 'block' }}
            onError={handleImageError}
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🍽️</div>
            <p className="text-sm text-orange-600 font-medium">{producto.nombre}</p>
          </div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{producto.nombre}</h3>
        {producto.descripcion && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{producto.descripcion}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-yellow-600">
            {formatPrice(producto.precio)}
          </span>
          {producto.categoria && (
            <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
              {producto.categoria}
            </span>
          )}
        </div>
        {!producto.disponible && (
          <div className="mt-2">
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
              No disponible
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
