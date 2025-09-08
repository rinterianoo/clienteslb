import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useTienda } from "../../context/TiendaContext";
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import logo from "../../assets/images/logolb.jpg";

export default function Navbar() {
  const { getCartItemsCount, toggleCart } = useCart();
  const { tienda, abrirModalCambio } = useTienda();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const cartItemsCount = getCartItemsCount();

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Modern floating navbar with new layout */}
      <nav className="fixed top-1 left-1 right-1 sm:top-2 sm:left-2 sm:right-2 z-40 bg-white/95 backdrop-blur-2xl shadow-lg border border-white/30 rounded-lg sm:rounded-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 sm:h-12 lg:h-14">
            
            {/* Left: Mobile Menu Button */}
            <div className="flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="p-2 sm:p-3 text-gray-700 hover:text-orange-600 transition-colors duration-300 rounded-lg sm:rounded-xl hover:bg-orange-50"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Bars3Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>

            {/* Center: Logo and Restaurant Name */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 transition-transform duration-300 hover:scale-105 absolute left-1/2 transform -translate-x-1/2">
              <img 
                src={logo} 
                alt="Logo LB Restaurant" 
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-orange-400"
              />
              <span className="text-base sm:text-lg lg:text-xl text-black font-medium">
                La Berraquera
              </span>
            </Link>

            {/* Right: Store Selector + Cart Button */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Botón para seleccionar/cambiar tienda */}
              <button
                onClick={abrirModalCambio}
                className={`relative px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm transition-colors duration-300 rounded-lg sm:rounded-xl border ${
                  tienda 
                    ? 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 border-gray-200 hover:border-orange-200' 
                    : 'text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-orange-500 animate-pulse'
                }`}
                title={tienda ? `Cambiar tienda (actual: ${tienda.nombre})` : 'Selecciona tu tienda'}
              >
                {tienda ? (
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate max-w-16 sm:max-w-24">{tienda.key.toUpperCase()}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                ) : (
                  <span className="font-medium">Selecciona tu tienda</span>
                )}
              </button>
              
              {/* Botón del carrito */}
              <button
                onClick={toggleCart}
                className="relative p-2 sm:p-3 text-gray-700 hover:text-orange-600 transition-colors duration-300 rounded-lg sm:rounded-xl hover:bg-orange-50"
              >
                <ShoppingBagIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-4 sm:px-6 py-4 space-y-2 bg-white/95 backdrop-blur-2xl border-t border-gray-200/30 rounded-b-xl sm:rounded-b-2xl shadow-inner">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 shadow-xl drop-shadow-md' 
                  : 'text-black hover:text-orange-600 hover:bg-orange-50 drop-shadow-sm'
              }`}
            >
              <span className="drop-shadow-sm">Inicio</span>
            </Link>
            
            <a 
              href="/#ubicaciones" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 text-black hover:text-orange-600 hover:bg-orange-50 drop-shadow-sm"
            >
              <span className="drop-shadow-sm">Ubicaciones</span>
            </a>
            
            <a 
              href="/#eventos" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 text-black hover:text-orange-600 hover:bg-orange-50 drop-shadow-sm"
            >
              <span className="drop-shadow-sm">Eventos</span>
            </a>
            
            <a 
              href="/#productos-congelados" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 text-black hover:text-orange-600 hover:bg-orange-50 drop-shadow-sm"
            >
              <span className="drop-shadow-sm">Productos Congelados</span>
            </a>
            
            <Link 
              to="/pedidos" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 ${
                isActive('/pedidos') 
                  ? 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 shadow-xl drop-shadow-md' 
                  : 'text-black hover:text-orange-600 hover:bg-orange-50 drop-shadow-sm'
              }`}
            >
              <span className="drop-shadow-sm">Menú</span>
            </Link>
            
            {/* Botón para seleccionar/cambiar tienda en móvil */}
            <button
              onClick={() => {
                abrirModalCambio();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 text-black hover:text-orange-600 hover:bg-orange-50 drop-shadow-sm"
            >
              {tienda ? (
                <>
                  <span className="drop-shadow-sm">Cambiar tienda</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500 truncate max-w-20">{tienda.nombre}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </>
              ) : (
                <>
                  <span className="drop-shadow-sm font-medium text-orange-600">Selecciona tu tienda</span>
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
