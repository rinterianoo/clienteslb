import { useState } from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';
import { useMenu } from '../../context/MenuContext';
import { ENVIRONMENT } from '../../config/api';

export default function ComboSuggestionModal({ isOpen, onClose, arepaProduct }) {
  const { addToCart } = useCart();
  const { todosLosProductos } = useMenu();
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Filtrar productos de la categoría "Combos" que estén disponibles
  const combosDisponibles = todosLosProductos.filter(producto => 
    producto.categoria?.toLowerCase() === 'combos' && producto.disponible === true
  );

  // Construir URL de imagen
  const getImageUrl = (imagenUrl) => {
    if (!imagenUrl) return null;
    
    if (imagenUrl.startsWith('http')) {
      return imagenUrl;
    }
    
    if (ENVIRONMENT === 'development') {
      return `http://localhost/Pronto-delivery/${imagenUrl}`;
    } else {
      return `https://prontodelivery.lat/midelivery/${imagenUrl}`;
    }
  };

  const handleAddCombo = async (combo) => {
    try {
      setIsAdding(true);
      setSelectedCombo(combo.id);
      addToCart(combo, 1);
      
      // Feedback visual
      setTimeout(() => {
        setIsAdding(false);
        setSelectedCombo(null);
        onClose(); // Cerrar modal después de agregar
      }, 800);
    } catch (e) {
      console.log('Combo agregado');
      setIsAdding(false);
      setSelectedCombo(null);
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Container sin overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Modal Container */}
        <div className="bg-white flex flex-col max-w-4xl w-full max-h-[90vh] animate-scale-in rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 sm:p-6 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3">
                  ¡Perfecto! 
                </h2>
                <p className="text-orange-100 mt-2 text-sm sm:text-base md:text-lg">
                  ¿Quieres agregar un combo para acompañar tu {arepaProduct?.nombre}?
                </p>
              </div>
              <button
                onClick={handleSkip}
                className="text-white hover:text-orange-200 transition-colors p-2 rounded-full hover:bg-orange-600"
              >
                <XMarkIcon className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </div>
          </div>

          {/* Content scrolleable */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
            {/* Combos disponibles */}
            {combosDisponibles.length > 0 ? (
              <div className="max-w-6xl mx-auto">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
                  Combos disponibles:
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {combosDisponibles.map((combo) => {
                    const imageUrl = getImageUrl(combo.imagen_url);
                    const isAddingThis = selectedCombo === combo.id && isAdding;
                    
                    return (
                      <div
                        key={combo.id}
                        className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        {/* Imagen del combo */}
                        {imageUrl ? (
                          <div className="h-40 sm:h-48 w-full bg-gray-200 rounded-2xl overflow-hidden mb-4">
                            <img
                              src={imageUrl}
                              alt={combo.nombre}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                          </div>
                        ) : (
                          <div className="h-40 sm:h-48 w-full bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-4">
                            <div className="text-center">
                              <div className="text-4xl sm:text-5xl mb-2">🥤</div>
                              <p className="text-sm text-orange-600 font-medium">{combo.nombre}</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Información del combo */}
                        <div className="mb-4">
                          <h4 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 line-clamp-2">{combo.nombre}</h4>
                          {combo.descripcion && (
                            <p className="text-sm sm:text-base text-gray-600 line-clamp-3 leading-relaxed">{combo.descripcion}</p>
                          )}
                        </div>
                        
                        {/* Precio */}
                        <div className="mb-4">
                          <span className="text-2xl sm:text-3xl font-bold text-orange-600">
                            Q{combo.precio?.toFixed(2)}
                          </span>
                        </div>

                        {/* Botón de agregar */}
                        <button
                          onClick={() => handleAddCombo(combo)}
                          disabled={isAdding}
                          className={`w-full py-3 sm:py-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95 ${
                            isAddingThis
                              ? 'bg-green-500 text-white'
                              : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                          }`}
                        >
                          {isAddingThis ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>¡Agregado!</span>
                            </>
                          ) : (
                            <>
                              <PlusIcon className="w-5 h-5" />
                              <span>Agregar</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16">
                <div className="text-6xl sm:text-8xl mb-6">😔</div>
                <p className="text-lg sm:text-xl text-gray-600">No hay combos disponibles en este momento.</p>
              </div>
            )}
          </div>

          {/* Footer con botones de acción */}
          <div className="bg-white p-4 sm:p-6 border-t border-gray-200 flex-shrink-0 shadow-lg">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleSkip}
                  className="flex-1 px-6 py-3 sm:py-4 text-gray-600 border-2 border-gray-300 rounded-2xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-base sm:text-lg"
                >
                  No, gracias
                </button>
                {combosDisponibles.length > 0 && (
                  <button
                    onClick={handleSkip}
                    className="flex-1 px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 text-base sm:text-lg"
                  >
                    Continuar sin combo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
