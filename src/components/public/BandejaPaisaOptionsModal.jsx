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
      descripcion: 'Bandeja paisa con doble porción de chorizo'
    },
    {
      id: 'chorizo-morcilla',
      nombre: 'Chorizo y Morcilla',
      descripcion: 'Bandeja paisa con chorizo y morcilla'
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
        comentario: `Opción seleccionada: ${opcionSeleccionada.nombre}`,
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
                <h2 className="text-base font-bold">
                  ¡Elige tu opción!
                </h2>
                <p className="text-yellow-100 text-xs">
                  Selecciona el tipo de {bandejaProduct?.nombre} que prefieres
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
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 text-center">
                <span className="text-red-600">*</span> Selección obligatoria
              </h3>
              <div className="space-y-3">
                {opcionesBandeja.map((opcion) => {
                  const isSelected = selectedOption === opcion.id;
                  return (
                    <div
                      key={opcion.id}
                      onClick={() => handleSelectOption(opcion)}
                      className={`bg-white rounded-lg p-3 border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                        isSelected 
                          ? 'border-yellow-500 bg-yellow-50 shadow-lg' 
                          : 'border-gray-200 hover:border-yellow-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded"></div>
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-gray-900">{opcion.nombre}</h4>
                            <p className="text-xs text-gray-600">{opcion.descripcion}</p>
                          </div>
                        </div>
                        {/* Indicador de selección */}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isSelected 
                            ? 'border-yellow-500 bg-yellow-500' 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <CheckIcon className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="bg-white p-3 border-t border-gray-200 flex-shrink-0">
            <div className="flex gap-2">
              <button
                onClick={handleSkip}
                className="flex-1 px-3 py-2 text-gray-600 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddBandeja}
                disabled={!selectedOption || isAdding}
                className={`flex-1 px-3 py-2 rounded-md font-medium transition-all duration-300 flex items-center justify-center space-x-1 text-xs ${
                  !selectedOption
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : isAdding
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white'
                }`}
              >
                {isAdding ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>¡Agregado!</span>
                  </>
                ) : (
                  <span>Agregar al carrito</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
