import { useTienda, TIENDAS } from '../../context/TiendaContext';
import { useCart } from '../../context/CartContext';
import { useEffect, useState } from 'react';
export default function TiendaSelectorModal() {
  const { tienda, seleccionarTienda, mostrarModal, setMostrarModal } = useTienda();
  const { clearCart, cartItems } = useCart();
  // El modal se muestra si NO hay tienda seleccionada O si mostrarModal es true
  const shouldShow = !tienda || mostrarModal;
  const handleSeleccionarTienda = (tiendaSeleccionada) => {
    // Si hay productos en el carrito y se está cambiando de tienda, limpiar el carrito
    if (cartItems.length > 0 && tienda && tienda.id_restaurante !== tiendaSeleccionada.id_restaurante) {
      clearCart();
    }
    seleccionarTienda(tiendaSeleccionada);
    setMostrarModal(false); // Ocultar el modal después de seleccionar
  };
  // SIEMPRE renderizar el modal si debe mostrarse
  if (!shouldShow) {
    return null;
  }
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 sm:px-6"
      onClick={(e) => e.stopPropagation()} // Prevenir cierre accidental
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 max-w-sm sm:max-w-md w-full text-center animate-fade-in-up overflow-hidden">
        {/* Header con icono */}
        <div className="mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 leading-tight">
            ¡Bienvenido a La Berraquera!
          </h2>
          <p className="text-sm text-gray-600 px-2">
            Selecciona tu tienda preferida para comenzar
          </p>
        </div>
        {/* Grid responsive de tiendas */}
        <div className="flex flex-col sm:flex-col gap-3 sm:gap-4">
          {TIENDAS.map((t, idx) => (
            <button
              key={t.id_restaurante}
              className={`w-full text-left p-4 sm:p-4 rounded-xl border shadow-lg border-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98] ${
                idx === 0 
                  ? 'bg-gradient-to-br from-orange-50 to-white hover:from-orange-100 hover:to-orange-50 border-orange-100' 
                  : 'bg-gradient-to-br from-yellow-50 to-white hover:from-yellow-100 hover:to-yellow-50 border-yellow-100'
              }`}
              onClick={() => handleSeleccionarTienda(t)}
            >
              {/* Nombre de la tienda */}
              <div className="text-base sm:text-lg font-bold mb-2 text-gray-800 leading-tight">
                {t.nombre}
              </div>
              {/* Dirección */}
              <div className="text-xs sm:text-sm text-gray-600 mb-2 flex items-start gap-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="leading-relaxed">{t.direccion}</span>
              </div>
              {/* Teléfono */}
              <div className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{t.telefono}</span>
              </div>
              {/* Indicador visual para móvil */}
              <div className="flex justify-end mt-2">
                <div className={`w-2 h-2 rounded-full ${
                  idx === 0 ? 'bg-orange-400' : 'bg-yellow-400'
                }`}></div>
              </div>
            </button>
          ))}
        </div>
        {/* Footer responsive */}
        <p className="mt-4 sm:mt-5 text-gray-500 text-xs sm:text-sm px-2 leading-relaxed">
          Puedes cambiar de tienda usando el botón en la barra de navegación.
        </p>
      </div>
    </div>
  );
}
