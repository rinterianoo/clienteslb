import { useState } from 'react';
import { useMenu } from '../../context/MenuContext';
import { useCart } from '../../context/CartContext';
import MenuProductCard from '../../components/public/MenuProductCard';
import Cart from '../../components/public/Cart';
import { MagnifyingGlassIcon, ShoppingBagIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export default function PedidosPage() {
  const { productos, loading, error } = useMenu();
  const { getCartItemsCount, toggleCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showFilters, setShowFilters] = useState(false);

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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Modern loading skeleton */}
          <div className="animate-pulse space-y-8">
            <div className="text-center">
              <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-200 rounded-2xl w-3/4 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-xl w-1/2 mx-auto"></div>
            </div>
            <div className="h-16 bg-gradient-to-r from-gray-300 to-gray-200 rounded-2xl"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
                  <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-200 rounded-2xl mb-6"></div>
                  <div className="h-6 bg-gray-300 rounded-xl mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded-lg mb-6"></div>
                  <div className="h-8 bg-gradient-to-r from-orange-300 to-orange-200 rounded-xl w-1/2"></div>
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center px-4 pt-20 sm:pt-24">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-3xl">😞</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Error al cargar el menú
          </h2>
          <p className="text-gray-600 mb-8 text-sm sm:text-base leading-relaxed">
            No pudimos cargar el menú en este momento. Por favor, intenta de nuevo.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 pt-20 sm:pt-24">
      {/* Floating Cart Button - Mobile */}
      <button
        onClick={toggleCart}
        className="fixed bottom-6 right-6 z-30 bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95"
      >
        <ShoppingBagIcon className="w-6 h-6" />
        {getCartItemsCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce font-bold">
            {getCartItemsCount() > 99 ? '99+' : getCartItemsCount()}
          </span>
        )}
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header - Modern & Beautiful */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent">
              Nuestro 
            </span>
            <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
              Menú
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 animate-fade-in-up animation-delay-400">
            Descubre los auténticos sabores de Colombia. Cada plato está preparado con ingredientes frescos y recetas tradicionales.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 animate-fade-in-up animation-delay-600">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Ingredientes frescos</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>Recetas tradicionales</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Preparado al momento</span>
            </div>
          </div>
        </div>

        {/* Search and Filters - Modern Design */}
        <div className="mb-8 sm:mb-12 space-y-6 animate-fade-in-up animation-delay-800">
          {/* Search Bar */}
          <div className="relative group">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            <input
              type="text"
              placeholder="Buscar tu plato favorito..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300 text-base bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl placeholder-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Toggle Button - Mobile */}
          <div className="flex items-center justify-between animate-fade-in-up animation-delay-1000">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-gray-700 hover:bg-orange-50 hover:border-orange-200 transition-all duration-300 sm:hidden shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              <span className="font-medium">Filtros</span>
            </button>
            
            {/* Products Count */}
            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-gray-200 shadow-lg">
              <p className="text-sm font-medium">
                <span className="text-orange-600 font-bold">{filteredProducts.length}</span> 
                <span className="text-gray-600 ml-1">platos</span>
                {selectedCategory !== 'Todos' && (
                  <span className="text-gray-500 ml-1">en {selectedCategory}</span>
                )}
              </p>
            </div>
          </div>

          {/* Category Filters - Modern Design */}
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block transition-all duration-300 animate-fade-in-up animation-delay-1200`}>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowFilters(false); // Close filters on mobile after selection
                  }}
                  className={`px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-medium transition-all duration-300 text-sm sm:text-base transform hover:scale-105 shadow-lg hover:shadow-xl animate-fade-in-up ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white shadow-orange-200'
                      : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 border-2 border-gray-200 hover:border-orange-200'
                  } shadow-md hover:shadow-lg`}
                  style={{ animationDelay: `${1400 + index * 100}ms` }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid - Modern Layout */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((producto, index) => (
                <div 
                  key={producto.id} 
                  className="transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${1600 + index * 100}ms` }}
                >
                  <MenuProductCard producto={producto} />
                </div>
              ))}
            </div>
            
            {/* Load More Button (Future Feature) */}
            {filteredProducts.length > 12 && (
              <div className="text-center mt-12 animate-fade-in-up animation-delay-2000">
                <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-gray-200 shadow-lg">
                  <span className="text-gray-600 font-medium">Mostrando {filteredProducts.length} platos</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 sm:py-20 animate-fade-in-up animation-delay-1600">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <MagnifyingGlassIcon className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              No se encontraron platos
            </h3>
            <p className="text-gray-600 mb-8 px-4 max-w-md mx-auto leading-relaxed">
              No hay platos que coincidan con tu búsqueda
              {searchTerm && (
                <span className="font-medium text-orange-600"> "{searchTerm}"</span>
              )}
              {selectedCategory !== 'Todos' && (
                <span> en la categoría <span className="font-medium text-orange-600">"{selectedCategory}"</span></span>
              )}.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todos');
                }}
                className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Ver todo el menú
              </button>
              <p className="text-sm text-gray-500">
                O prueba con otros términos de búsqueda
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cart Component */}
      <Cart />
    </div>
  );
}
