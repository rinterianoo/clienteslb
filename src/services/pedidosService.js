import axios from 'axios';

// Usar la URL directa de producción siempre
const API_BASE_URL = 'https://prontodelivery.lat';

// Función para registrar un pedido
export async function registrarPedido(datosPedido) {
  try {
    console.log('📤 ENVIANDO PEDIDO A LA API:');
    console.log('🌐 URL:', `${API_BASE_URL}/midelivery/api/registrar_pedido.php`);
    console.log('📋 Datos a enviar:', JSON.stringify(datosPedido, null, 2));
    console.log('📊 Tamaño del JSON:', JSON.stringify(datosPedido).length, 'caracteres');
    
    const response = await axios.post(`${API_BASE_URL}/midelivery/api/registrar_pedido.php`, datosPedido, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000, // 30 segundos de timeout
    });

    console.log('✅ Respuesta de la API:', response.data);
    return {
      success: true,
      data: response.data,
      message: 'Pedido registrado exitosamente'
    };

  } catch (error) {
    console.error('❌ Error al registrar pedido:', error);
    
    let errorMessage = 'Error al procesar el pedido';
    
    if (error.response) {
      // Error de respuesta del servidor
      console.error('📄 DETALLES COMPLETOS DEL ERROR DEL SERVIDOR:');
      console.error('Status:', error.response.status);
      console.error('StatusText:', error.response.statusText);
      console.error('Headers:', JSON.stringify(error.response.headers, null, 2));
      console.error('Response Data:', error.response.data);
      console.error('Response Type:', typeof error.response.data);
      
      // Mostrar el texto completo si es HTML de error de PHP
      if (typeof error.response.data === 'string' && error.response.data.includes('Fatal error')) {
        console.error('🐛 ERROR DE PHP DETECTADO:', error.response.data);
      }
      
      errorMessage = error.response.data?.message || `Error del servidor: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.request) {
      // Error de red/conexión
      console.error('📡 Error de red:', error.request);
      errorMessage = 'Error de conexión. Verifica tu internet e intenta nuevamente.';
    } else {
      // Error de configuración
      console.error('⚙️ Error de configuración:', error.message);
      errorMessage = 'Error interno. Intenta nuevamente.';
    }

    return {
      success: false,
      error: error.response?.data || error.message,
      message: errorMessage
    };
  }
}

// Función para calcular el recargo de envío
export function calcularRecargoEnvio(subtotal) {
  // Si el subtotal es mayor a Q125, envío gratis
  if (subtotal > 125.00) {
    return 0;
  }
  
  // Fórmula: Q25 - (subtotal * 20%)
  const descuento = subtotal * 0.20;
  const recargo = 25.00 - descuento;
  
  // Redondear hacia arriba al próximo quetzal
  return Math.ceil(recargo);
}

// Función para formatear datos del carrito para la API
export function formatearDatosParaAPI(cartItems, clienteData, metodoPago = "efectivo", tipoEntrega = "delivery") {
  const productos = cartItems.map(item => ({
    _id: item.id || item._id || 1, // Usar '_id' como muestra tu ejemplo
    nombre: item.nombre,
    precio: parseFloat(item.precio),
    cantidad: parseInt(item.cantidad),
    subtotal: parseFloat(item.precio * item.cantidad)
  }));

  const subtotal = productos.reduce((sum, producto) => sum + producto.subtotal, 0);
  const recargo = tipoEntrega === 'delivery' ? calcularRecargoEnvio(subtotal) : 0;
  const total = subtotal + recargo;

  const datosPedido = {
    cliente: {
      nombre: clienteData.nombre,
      telefono: clienteData.telefono,
      direccion: clienteData.direccion || "",
      zona: tipoEntrega === 'pickup' ? "Zona 0" : (clienteData.zona || "")
    },
    productos,
    total: parseFloat(total.toFixed(2)),
    recargo: parseFloat(recargo.toFixed(2)),
    metodo_pago: metodoPago,
    tipo_entrega: tipoEntrega  // "delivery" o "pickup"
  };

  // Agregar datos de facturación si están presentes
  if (clienteData.nitCf && clienteData.nitCf.trim()) {
    datosPedido.nit = clienteData.nitCf;
  }
  
  if (clienteData.nombreFacturacion && clienteData.nombreFacturacion.trim()) {
    datosPedido.nombre_factura = clienteData.nombreFacturacion;
  }

  // Debug: Mostrar comparación
  console.log('🔍 FORMATO DE DATOS PARA LA API:');
  console.log('📋 Datos enviados:', JSON.stringify(datosPedido, null, 2));
  console.log('📋 Estructura esperada por la API:');
  console.log(`{
    "cliente": {
      "nombre": "${clienteData.nombre}",
      "telefono": "${clienteData.telefono}",
      "direccion": "${clienteData.direccion || ''}",
      "zona": "${clienteData.zona || ''}"
    },
    "productos": [${productos.map(p => `{
      "id_producto": ${p.id_producto},
      "nombre": "${p.nombre}",
      "precio": ${p.precio},
      "cantidad": ${p.cantidad},
      "subtotal": ${p.subtotal}
    }`).join(',\n    ')}],
    "total": ${total},
    "recargo": ${recargo},
    "metodo_pago": "${metodoPago}",
    "tipo_entrega": "${tipoEntrega}"${clienteData.nitCf ? `,\n    "nit": "${clienteData.nitCf}"` : ''}${clienteData.nombreFacturacion ? `,\n    "nombre_factura": "${clienteData.nombreFacturacion}"` : ''}
  }`);

  return datosPedido;
}
