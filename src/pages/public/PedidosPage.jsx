import { useState } from 'react';
import { useMenu } from '../../context/MenuContext';
import { useCart } from '../../context/CartContext';
import MenuProductCard from '../../components/public/MenuProductCard';
import Cart from '../../components/public/Cart';
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function PedidosPage() {
  const { productos, loading, error } = useMenu();
  const { getCartItemsCount, toggleCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Get unique categories
  const categories = ['Todos', ...new Set(productos.map(p => p.categoria).filter(Boolean))];

  // Filter products
  const filteredProducts = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || producto.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Error al cargar el menú</h2>
          <p className="text-gray-600 mb-8">No pudimos cargar el menú en este momento. Por favor, intenta de nuevo.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white px-8 py-3 rounded-lg font-normal transition-all duration-300"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Fixed Cart Button */}
      <button
        onClick={toggleCart}
        className="fixed top-24 right-6 z-30 bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
      >
        <ShoppingBagIcon className="w-6 h-6" />
        {getCartItemsCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {getCartItemsCount()}
          </span>
        )}
      </button>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Nuestro <span className="text-orange-500">Menú</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre los auténticos sabores de Colombia. Cada plato está preparado con ingredientes frescos y recetas tradicionales.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar platos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-normal transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-orange-700 text-white transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                } shadow-md hover:shadow-lg`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-8 text-center">
          <p className="text-gray-600">
            Mostrando <span className="text-orange-600">{filteredProducts.length}</span> platos
            {selectedCategory !== 'Todos' && (
              <span> en <span className="">{selectedCategory}</span></span>
            )}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(producto => (
              <MenuProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron platos</h3>
            <p className="text-gray-600 mb-6">
              No hay platos que coincidan con tu búsqueda "{searchTerm}" 
              {selectedCategory !== 'Todos' && ` en la categoría "${selectedCategory}"`}.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todos');
              }}
              className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white px-6 py-3 rounded-lg font-normal transition-all duration-300"
            >
              Ver todo el menú
            </button>
          </div>
        )}
      </div>

      {/* Cart Component */}
      <Cart />
    </div>
  );
}
