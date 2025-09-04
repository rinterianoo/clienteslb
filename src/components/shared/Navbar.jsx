import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import logo from "../../assets/images/logolb.jpg";

export default function Navbar() {
  const { getCartItemsCount, toggleCart } = useCart();
  const cartItemsCount = getCartItemsCount();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-xl shadow-xl rounded-full px-6 py-3 flex gap-6 items-center border border-gray-200/20">
      <div className="flex items-center gap-6">
        <img 
          src={logo} 
          alt="Logo LB Restaurant" 
          className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
        />
        <Link 
          to="/" 
          className="text-gray-800 hover:text-orange-600 transition-all duration-300 px-4 py-2 rounded-full hover:bg-orange-50"
        >
          Inicio
        </Link>
        <Link 
          to="/pedidos" 
          className="text-gray-800 hover:text-orange-600 transition-all duration-300 px-4 py-2 rounded-full hover:bg-orange-50"
        >
          Pedidos
        </Link>
        
        {/* Cart Button */}
        <button
          onClick={toggleCart}
          className="relative p-2 text-gray-800 hover:text-orange-600 transition-all duration-300 rounded-full hover:bg-orange-50"
        >
          <ShoppingBagIcon className="w-6 h-6" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
