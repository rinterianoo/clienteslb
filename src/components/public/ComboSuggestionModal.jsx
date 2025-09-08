import { useState } from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';
import { useMenu } from '../../context/MenuContext';
import { ENVIRONMENT } from '../../config/api';

export default function ComboSuggestionModal({ isOpen, onClose, arepaProduct, cantidad = 1 }) {
  // Solo renderizar logs y ejecutar hooks si el modal está abierto
  if (!isOpen) {
    return null;
  }
  
  const { addToCart, cartItems } = useCart();
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
      return `https://prontodelivery.lat/${imagenUrl}`;
    }
  };

  const handleAddCombo = async (combo) => {
    console.log('🚨 PROBLEMA: Modal enviando combo:', combo.nombre, 'ID:', combo._id);
    
    try {
      setIsAdding(true);
      setSelectedCombo(combo.id);
      
      console.log('🚨 ANTES addToCart - combo.nombre:', combo.nombre);
      console.log('🚨 ANTES addToCart - combo._id:', combo._id);
      
      addToCart(combo, 1);
      
      console.log('🚨 DESPUÉS addToCart ejecutado');
      
      // Feedback visual
      setTimeout(() => {
        setIsAdding(false);
        setSelectedCombo(null);
        onClose(); // Cerrar modal después de agregar
      }, 800);
    } catch (e) {
      console.error('Error en handleAddCombo:', e);
      setIsAdding(false);
      setSelectedCombo(null);
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <>
      {/* Modal Container */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2">
        <div 
          className="bg-white flex flex-col max-w-lg w-full max-h-[70vh] animate-scale-in rounded-xl overflow-hidden shadow-xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base">
                  ¡Perfecto! 
                </h2>
                <p className="text-orange-100 text-xs">
                  ¿Quieres agregar un combo para acompañar tu {arepaProduct?.nombre}?
                </p>
              </div>
              <button
                onClick={handleSkip}
                className="text-white hover:text-orange-200 transition-colors p-1 rounded-full hover:bg-orange-600"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content scrolleable */}
          <div className="flex-1 overflow-y-auto p-2 bg-gray-50">
            {/* Combos disponibles */}
            {combosDisponibles.length > 0 ? (
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  Combos disponibles:
                </h3>
                
                <div className="grid grid-cols-1 gap-2">
                  {combosDisponibles.map((combo) => {
                    const imageUrl = getImageUrl(combo.imagen_url);
                    const isAddingThis = selectedCombo === combo.id && isAdding;
                    
                    return (
                      <div
                        key={combo.id}
                        className="bg-white rounded-lg p-2 border border-gray-200 hover:shadow-md transition-all duration-300 flex items-center space-x-3"
                      >
                        {/* Imagen del combo - Square */}
                        {imageUrl ? (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={imageUrl}
                              alt={combo.nombre}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <div className="text-center">
                              <div className="text-lg">🥤</div>
                            </div>
                          </div>
                        )}
                        
                        {/* Información del combo */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-gray-900 truncate">{combo.nombre}</h4>
                          {combo.descripcion && (
                            <p className="text-xs text-gray-600 line-clamp-1">{combo.descripcion}</p>
                          )}
                          <span className="text-sm font-bold text-orange-600">
                            Q{combo.precio?.toFixed(2)}
                          </span>
                        </div> 

                        {/* Botón de agregar */}
                        <button
                          onClick={() => handleAddCombo(combo)}
                          disabled={isAdding}
                          className={`px-3 py-1 rounded-md font-medium transition-all duration-300 flex items-center justify-center space-x-1 text-xs flex-shrink-0 ${
                            isAddingThis
                              ? 'bg-green-500 text-white'
                              : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
                          }`}
                        >
                          {isAddingThis ? (
                            <>
                              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>¡Agregado!</span>
                            </>
                          ) : (
                            <>
                              <PlusIcon className="w-3 h-3" />
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
              <div className="text-center py-4">
                <div className="text-2xl mb-2">😔</div>
                <p className="text-sm text-gray-600">No hay combos disponibles en este momento.</p>
              </div>
            )}
          </div>

          {/* Footer con botones de acción */}
          <div className="bg-white p-2 border-t border-gray-200 flex-shrink-0">
            <div className="flex gap-2">
              <button
                onClick={handleSkip}
                className="flex-1 px-3 py-2 text-gray-600 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors text-xs"
              >
                No, gracias
              </button>
              {combosDisponibles.length > 0 && (
                <button
                  onClick={handleSkip}
                  className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700 transition-colors text-xs"
                >
                  Continuar sin combo
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
