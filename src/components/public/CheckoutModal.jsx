import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { registrarPedido, formatearDatosParaAPI } from '../../services/pedidosService';
import { useShippingCalculation, getMensajePromoEnvio } from '../../hooks/useShipping';
import { XMarkIcon, UserIcon, PhoneIcon, MapPinIcon, CreditCardIcon, TruckIcon, CheckIcon, HomeIcon, BuildingOfficeIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
// ⚠️ CONFIGURACIÓN DE ZONAS - EDITA AQUÍ PARA CAMBIAR LAS ZONAS DE COBERTURA ⚠️
const ZONAS_COBERTURA = [
  { value: '', label: 'Selecciona una zona' },
  { value: 'zona-1', label: 'Zona 1' },
  { value: 'zona-2', label: 'Zona 2' },
  { value: 'zona-4', label: 'Zona 4' },
  { value: 'zona-9', label: 'Zona 9' },
  { value: 'zona-10', label: 'Zona 10' },
  { value: 'zona-11', label: 'Zona 11' },
  { value: 'zona-12', label: 'Zona 12' },
  { value: 'zona-13', label: 'Zona 13' },
  { value: 'zona-14', label: 'Zona 14' },
  { value: 'zona-15', label: 'Zona 15' },
  { value: 'zona-16', label: 'Zona 16' },
  { value: 'zona-18', label: 'Zona 18' },
  { value: 'mixco', label: 'Mixco' },
  { value: 'villa-nueva', label: 'Villa Nueva' },
  { value: 'san-lucas', label: 'San Lucas Sacatepéquez' },
  { value: 'antigua', label: 'Antigua Guatemala' },
  { value: 'carretera-salvador', label: 'Carretera a El Salvador' },
  { value: 'otras', label: 'Otras zonas (consultar)' }
];
// ⚠️ MÉTODOS DE PAGO DISPONIBLES - EDITA AQUÍ PARA CAMBIAR OPCIONES ⚠️
const METODOS_PAGO = [
  { value: 'efectivo', label: 'Efectivo', icon: '💵' },
  { value: 'tarjeta', label: 'Tarjeta', icon: '💳' },
];
export default function CheckoutModal({ isOpen, onClose }) {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [pedidoExitoso, setPedidoExitoso] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    // Datos de envío
    tipoEntrega: 'delivery', // delivery | pickup
    zona: '',
    nombre: '',
    direccion: '',
    telefono: '',
    metodoPago: 'efectivo',
    notas: '', // Campo para comentarios adicionales
    // Datos de facturación
    nitCf: '',
    nombreFacturacion: ''
  });
  const [errores, setErrores] = useState({});
  if (!isOpen) return null;
  const subtotalCarrito = getCartTotal();
  const { subtotal, recargo, total, esEnvioGratis, mensajeRecargo } = useShippingCalculation(subtotalCarrito);
  const promoEnvio = getMensajePromoEnvio(subtotalCarrito);
  const validarFormulario = () => {
    const nuevosErrores = {};
    // Validar tipo de entrega
    if (!formData.tipoEntrega) {
      nuevosErrores.tipoEntrega = 'Selecciona un tipo de entrega';
    }
    // Validar zona (solo para delivery)
    if (formData.tipoEntrega === 'delivery' && !formData.zona) {
      nuevosErrores.zona = 'Selecciona una zona';
    }
    // Validar nombre
    if (!formData.nombre.trim() || formData.nombre.trim().length < 2) {
      nuevosErrores.nombre = 'El nombre es requerido (mínimo 2 caracteres)';
    }
    // Validar dirección (solo para delivery)
    if (formData.tipoEntrega === 'delivery' && (!formData.direccion.trim() || formData.direccion.trim().length < 10)) {
      nuevosErrores.direccion = 'La dirección es requerida (mínimo 10 caracteres)';
    }
    // Validar teléfono
    if (!formData.telefono.trim() || formData.telefono.trim().length < 8) {
      nuevosErrores.telefono = 'El teléfono es requerido (mínimo 8 dígitos)';
    }
    // Validar método de pago
    if (!formData.metodoPago) {
      nuevosErrores.metodoPago = 'Selecciona un método de pago';
    }
    // Validar datos de facturación (opcional pero si se llenan deben ser válidos)
    if (formData.nitCf && formData.nitCf.trim().toLowerCase() !== 'cf' && formData.nitCf.trim().length < 3) {
      nuevosErrores.nitCf = 'El NIT debe tener al menos 3 caracteres (o escriba "CF" si no desea factura)';
    }
    if (formData.nitCf && formData.nitCf.trim().toLowerCase() !== 'cf' && !formData.nombreFacturacion.trim()) {
      nuevosErrores.nombreFacturacion = 'Si proporcionas NIT, el nombre de facturación es requerido';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Log específico para el campo de notas
    if (name === 'notas') {
    }
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error específico cuando el usuario empieza a escribir
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }
    setIsProcessing(true);
    setError('');
    try {
      // Formatear datos para la API
      const datosParaAPI = formatearDatosParaAPI(
        cartItems,
        formData,
        formData.metodoPago,
        formData.tipoEntrega,
        formData.notas // Agregar las notas al pedido
      );
      // Enviar pedido a la API
      const resultado = await registrarPedido(datosParaAPI);
      if (resultado.success) {
        setPedidoExitoso(true);
        clearCart(); // Limpiar carrito después del éxito
        // Cerrar modal después de 3 segundos usando un ref para evitar memory leaks
        const timeoutId = setTimeout(() => {
          onClose();
          setPedidoExitoso(false);
          setFormData({
            tipoEntrega: 'delivery',
            zona: '',
            nombre: '',
            direccion: '',
            telefono: '',
            metodoPago: 'efectivo',
            notas: '', // Resetear también las notas
            nitCf: '',
            nombreFacturacion: ''
          });
        }, 3000);
        // Limpiar timeout si el componente se desmonta
        return () => clearTimeout(timeoutId);
      } else {
        throw new Error(resultado.message || 'Error al procesar el pedido');
      }
    } catch (error) {
      // Manejo específico de errores CORS
      if (error.message?.includes('CORS') || error.message?.includes('Network Error')) {
        setError('Error de conexión con el servidor. Por favor, verifica que el servidor esté funcionando correctamente.');
      } else if (error.response) {
        setError(`Error del servidor: ${error.response.status} - ${error.response.data?.message || 'Error desconocido'}`);
      } else if (error.request) {
        setError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      } else {
        setError(error.message || 'Error al procesar el pedido. Intenta nuevamente.');
      }
    } finally {
      setIsProcessing(false);
    }
  };
  if (pedidoExitoso) {
    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Pedido Enviado!
            </h2>
            <p className="text-gray-600 mb-6">
              Tu pedido ha sido registrado exitosamente. Nos pondremos en contacto contigo pronto.
            </p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
        <div className="bg-white w-full h-full overflow-y-auto">
          {/* Header fijo */}
          <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Finalizar Pedido</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-6 space-y-6 max-w-4xl mx-auto">
            {/* Tipo de Entrega */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TruckIcon className="w-5 h-5 mr-2 text-orange-500" />
                Seleccione su tipo de entrega *
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${
                  formData.tipoEntrega === 'delivery' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="tipoEntrega"
                    value="delivery"
                    checked={formData.tipoEntrega === 'delivery'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center w-full">
                    <TruckIcon className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                    <span className="font-medium">Enviar a mi Domicilio</span>
                    <p className="text-xs text-gray-500 mt-1">Disponible para recoger en 30 minutos</p>
                  </div>
                </label>
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${
                  formData.tipoEntrega === 'pickup' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="tipoEntrega"
                    value="pickup"
                    checked={formData.tipoEntrega === 'pickup'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center w-full">
                    <HomeIcon className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                    <span className="font-medium">Recoger en Restaurante</span>
                    <p className="text-xs text-gray-500 mt-1">📍 Dirección: km 18.5 caes, Arrazola 1, Plaza Vía Pronto</p>
                  </div>
                </label>
              </div>
              {errores.tipoEntrega && <p className="text-red-500 text-sm mt-1">{errores.tipoEntrega}</p>}
            </div>
            {/* Datos de Envío */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPinIcon className="w-5 h-5 mr-2 text-orange-500" />
                Datos de envío
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Zona - Solo para delivery */}
                {formData.tipoEntrega === 'delivery' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zona *
                    </label>
                    <select
                      name="zona"
                      value={formData.zona}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errores.zona ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      {ZONAS_COBERTURA.map((zona) => (
                        <option key={zona.value} value={zona.value}>
                          {zona.label}
                        </option>
                      ))}
                    </select>
                    {errores.zona && <p className="text-red-500 text-sm mt-1">{errores.zona}</p>}
                    <p className="text-xs text-gray-500 mt-1">
                      ⚠️ Si tu zona no aparece, selecciona "Otras zonas" para consultar disponibilidad
                    </p>
                  </div>
                )}
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errores.nombre ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ingrese su nombre"
                  />
                  {errores.nombre && <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>}
                </div>
                {/* Dirección - Solo para delivery */}
                {formData.tipoEntrega === 'delivery' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección completa con referencias * <span className="text-xs text-gray-500">(incluir código de acceso)</span>
                    </label>
                    <textarea
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        errores.direccion ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ingrese su dirección completa con referencias y código de acceso si aplica"
                    />
                    {errores.direccion && <p className="text-red-500 text-sm mt-1">{errores.direccion}</p>}
                  </div>
                )}
                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errores.telefono ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ingrese su número telefónico"
                  />
                  {errores.telefono && <p className="text-red-500 text-sm mt-1">{errores.telefono}</p>}
                </div>
                {/* Método de Pago */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Método de pago *
                  </label>
                  <select
                    name="metodoPago"
                    value={formData.metodoPago}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errores.metodoPago ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {METODOS_PAGO.map((metodo) => (
                      <option key={metodo.value} value={metodo.value}>
                        {metodo.icon} {metodo.label}
                      </option>
                    ))}
                  </select>
                  {errores.metodoPago && <p className="text-red-500 text-sm mt-1">{errores.metodoPago}</p>}
                </div>
                {/* Comentarios/Notas adicionales */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <ChatBubbleLeftEllipsisIcon className="w-4 h-4 mr-2 text-orange-500" />
                    Comentarios adicionales <span className="text-gray-500 ml-1">(opcional)</span>
                  </label>
                  <textarea
                    name="notas"
                    value={formData.notas}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                    placeholder="Ejemplo: Sin cebolla, sin picante, punto de cocción, etc..."
                    maxLength={200}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.notas.length}/200 caracteres
                  </p>
                </div>
              </div>
            </div>
            {/* Datos de Facturación */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BuildingOfficeIcon className="w-5 h-5 mr-2 text-orange-500" />
                Datos de facturación <span className="text-sm font-normal text-gray-500">(opcional)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIT * o CF si no desea
                  </label>
                  <input
                    type="text"
                    name="nitCf"
                    value={formData.nitCf}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errores.nitCf ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ej: 12345678-9 o CF"
                  />
                  {errores.nitCf && <p className="text-red-500 text-sm mt-1">{errores.nitCf}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    A nombre de *
                  </label>
                  <input
                    type="text"
                    name="nombreFacturacion"
                    value={formData.nombreFacturacion}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errores.nombreFacturacion ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ingrese su nombre"
                  />
                  {errores.nombreFacturacion && <p className="text-red-500 text-sm mt-1">{errores.nombreFacturacion}</p>}
                </div>
              </div>
            </div>
            {/* Resumen del Pedido */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen del Pedido</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>Q{subtotal.toFixed(2)}</span>
                </div>
                {/* Mostrar línea de envío solo para delivery */}
                {formData.tipoEntrega === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Recargo por envío:</span>
                    <span className={recargo === 0 ? 'text-green-600 font-medium' : ''}>
                      {recargo === 0 ? 'GRATIS' : `Q${recargo.toFixed(2)}`}
                    </span>
                  </div>
                )}
                {/* Para pickup, mostrar mensaje informativo */}
                {formData.tipoEntrega === 'pickup' && (
                  <div className="flex justify-between">
                    <span>Recogida en restaurante:</span>
                    <span className="text-green-600 font-medium">SIN COSTO</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-orange-600">
                    Q{(formData.tipoEntrega === 'delivery' ? total : subtotal).toFixed(2)}
                  </span>
                </div>
              </div>
              {/* Mensaje para pickup */}
              {formData.tipoEntrega === 'pickup' && (
                <div className="mt-3 p-3 rounded-lg text-sm text-center bg-green-50 text-green-700 border border-green-200">
                  <span className="mr-2">📍</span>
                  Recogida sin costo adicional en nuestro restaurante
                </div>
              )}
            </div>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing || cartItems.length === 0}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:transform-none flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Procesando Pedido...
                </>
              ) : (
                <>
                  <TruckIcon className="w-5 h-5 mr-2" />
                  Confirmar Pedido
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
