import { useState } from 'react';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';

export default function BandejaPaisaOptionsModal({ isOpen, onClose, bandejaProduct, cantidad = 1 }) {
  const { addToCart } = useCart();
  const [selectedOption, setSelectedOption] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Opciones disponibles para Bandeja Paisa
  const opcionesBandeja = [
    {
      id: 'doble-chorizo',
      nombre: 'Doble Chorizo',
      descripcion: 'Bandeja paisa con doble porción de chorizo antioqueño'
    },
    {
      id: 'chorizo-morcilla',
      nombre: 'Chorizo y Morcilla',
      descripcion: 'Bandeja paisa con chorizo y morcilla negra'
    }
  ];

  const handleSelectOption = (option) => {
    setSelectedOption(option.id);
  };

  const handleAddBandeja = async () => {
    if (!selectedOption) return;

    try {
      setIsAdding(true);

      // Encontrar la opción seleccionada
      const opcionSeleccionada = opcionesBandeja.find(op => op.id === selectedOption);

      // Crear producto con comentario
      const productoConComentario = {
        ...bandejaProduct,
        comentario: `${opcionSeleccionada.nombre}`,
        cantidad: cantidad
      };

      addToCart(productoConComentario, cantidad);

      // Feedback visual
      setTimeout(() => {
        setIsAdding(false);
        setSelectedOption('');
        onClose(); // Cerrar modal después de agregar
      }, 800);

    } catch (e) {
      setIsAdding(false);
      setSelectedOption('');
      onClose();
    }
  };

  const handleSkip = () => {
    // Simplemente cerrar el modal sin agregar nada
    setSelectedOption('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Container */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2">
        <div 
          className="bg-white flex flex-col max-w-lg w-full max-h-[70vh] animate-scale-in rounded-xl overflow-hidden shadow-xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-2 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base ">
                  ¡Personaliza tu Bandeja Paisa!
                </h2>
                <p className="text-yellow-100 text-xs">
                  Selecciona cómo quieres tu {bandejaProduct?.nombre}
                </p>
              </div>
              <button
                onClick={handleSkip}
                className="text-white hover:text-yellow-200 transition-colors p-1 rounded-full hover:bg-yellow-600"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3">
            <div className="space-y-3">
              {opcionesBandeja.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  className={`border-2 rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                    selectedOption === option.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {option.nombre}
                      </h3>
                      <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                        {option.descripcion}
                      </p>
                    </div>
                    <div className={`ml-3 flex-shrink-0 ${
                      selectedOption === option.id ? 'text-orange-600' : 'text-gray-400'
                    }`}>
                      {selectedOption === option.id ? (
                        <CheckIcon className="w-5 h-5" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t bg-gray-50 p-3 flex-shrink-0">
            <button
              onClick={handleAddBandeja}
              disabled={!selectedOption || isAdding}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedOption && !isAdding
                  ? 'bg-orange-600 text-white hover:bg-orange-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAdding ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Agregando...
                </div>
              ) : (
                'Agregar al Carrito'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
