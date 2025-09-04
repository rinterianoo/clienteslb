// Este archivo será movido a components/shared/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md shadow-lg rounded-full px-8 py-3 flex gap-8 items-center border border-gray-200">
      <Link to="/" className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">Inicio</Link>
      <Link to="/pedidos" className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">Pedidos</Link>
    </nav>
  );
}
