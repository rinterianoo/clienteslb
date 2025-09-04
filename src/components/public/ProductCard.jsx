import { useMenu } from "../../context/MenuContext";
import { Link } from "react-router-dom";

export default function ProductCard({ producto }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ',
      minimumFractionDigits: 2,
    }).format(price);
  };

  // Construir URL completa de la imagen si existe
  const imageUrl = producto.imagen_url 
    ? `https://prontodelivery.lat/${producto.imagen_url}`
    : null;

  console.log('Imagen URL construida:', imageUrl); // Para debug

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      {imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={producto.nombre}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              console.error('Error cargando imagen:', imageUrl);
              e.target.style.display = 'none';
            }}
            onLoad={() => {
              console.log('Imagen cargada exitosamente:', imageUrl);
            }}
          />
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
