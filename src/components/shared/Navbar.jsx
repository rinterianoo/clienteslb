import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import logo from "../../assets/images/logolb.jpg";

export default function Navbar() {
  const { getCartItemsCount, toggleCart } = useCart();
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
      <nav className="fixed top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 z-50 bg-white/90 backdrop-blur-2xl shadow-2xl border border-white/30 rounded-xl sm:rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
            
            {/* Left: Mobile Menu Button */}
            <div className="flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="p-2 sm:p-3 text-gray-700 hover:text-orange-600 transition-all duration-300 rounded-lg sm:rounded-xl hover:bg-orange-50 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md" />
                ) : (
                  <Bars3Icon className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md" />
                )}
              </button>
            </div>

            {/* Center: Logo and Restaurant Name */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 transition-all duration-300 hover:scale-105 absolute left-1/2 transform -translate-x-1/2">
              <img 
                src={logo} 
                alt="Logo LB Restaurant" 
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-orange-400 shadow-xl hover:shadow-2xl transition-all duration-300 drop-shadow-lg"
              />
              <span className="text-base sm:text-lg lg:text-xl text-black drop-shadow-lg">
                La Berraquera
              </span>
            </Link>

            {/* Right: Cart Button */}
            <div className="flex items-center">
              <button
                onClick={toggleCart}
                className="relative p-2 sm:p-3 text-gray-700 hover:text-orange-600 transition-all duration-300 rounded-lg sm:rounded-xl hover:bg-orange-50 hover:shadow-xl transform hover:scale-110 hover:rotate-3 shadow-lg cart-hover group"
              >
                <ShoppingBagIcon className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md transition-all duration-300 cart-icon" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-xl drop-shadow-lg transition-all duration-300 cart-counter animate-bounce group-hover:animate-ping">
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
            ? 'max-h-48 opacity-100' 
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
            <Link 
              to="/pedidos" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 ${
                isActive('/pedidos') 
                  ? 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 shadow-xl drop-shadow-md' 
                  : 'text-black hover:text-orange-600 hover:bg-orange-50 drop-shadow-sm'
              }`}
            >
              <span className="drop-shadow-sm">Pedidos</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
