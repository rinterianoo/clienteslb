import axios from 'axios';
import { getTiendaSeleccionada } from '../utils/tiendaHelpers';
import { ENDPOINTS, ENVIRONMENT } from '../config/api';

// Función para registrar un pedido
export async function registrarPedido(datosPedido) {
  try {
    console.log(`📤 ENVIANDO PEDIDO A LA API [${ENVIRONMENT}]:`);
    console.log(`📤 URL: ${ENDPOINTS.REGISTRAR_PEDIDO}`);
    console.log('📋 Datos a enviar:', JSON.stringify(datosPedido, null, 2));
    console.log('📊 Tamaño del JSON:', JSON.stringify(datosPedido).length, 'caracteres');
    
    const response = await axios.post(ENDPOINTS.REGISTRAR_PEDIDO, datosPedido, {
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
export function formatearDatosParaAPI(cartItems, clienteData, metodoPago = "efectivo", tipoEntrega = "delivery", notas = "") {
  console.log('📝 Notas recibidas para el pedido:', notas);
  
  const productos = cartItems.map(item => {
    return {
      id_producto: item.id || item._id || 1,
      nombre: item.nombre, // Usar siempre el nombre original
      precio: parseFloat(item.precio),
      cantidad: parseInt(item.cantidad),
      subtotal: parseFloat(item.precio * item.cantidad)
    };
  });

  // Recopilar comentarios de productos con opciones especiales
  const comentariosProductos = cartItems
    .filter(item => item.comentario)
    .map(item => item.comentario);

  const subtotal = productos.reduce((sum, producto) => sum + producto.subtotal, 0);
  const recargo = tipoEntrega === 'delivery' ? calcularRecargoEnvio(subtotal) : 0;
  const total = subtotal + recargo;

  // Obtener id_restaurante de la tienda seleccionada
  const tienda = getTiendaSeleccionada();
  const restaurant_id = tienda?.id_restaurante || 1;

  const datosPedido = {
    restaurant_id,
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

  // Agregar notas si están presentes (usar "notas" en lugar de "comentarios")
  let notasFinales = notas ? notas.trim() : '';
  
  // Agregar comentarios de productos con opciones especiales
  if (comentariosProductos.length > 0) {
    const comentariosTexto = comentariosProductos.join('; ');
    notasFinales = notasFinales 
      ? `${notasFinales}. ${comentariosTexto}` 
      : comentariosTexto;
  }
  
  if (notasFinales) {
    datosPedido.notas = notasFinales; // Cambiar de 'comentarios' a 'notas'
  }

  // Agregar datos de facturación si están presentes
  if (clienteData.nitCf && clienteData.nitCf.trim()) {
    datosPedido.nit = clienteData.nitCf;
  }
  
  if (clienteData.nombreFacturacion && clienteData.nombreFacturacion.trim()) {
    datosPedido.nombre_factura = clienteData.nombreFacturacion;
  }

  // Debug: Mostrar datos finales
  console.log('🔍 DATOS FINALES PARA LA API:');
  console.log('📋 JSON enviado:', JSON.stringify(datosPedido, null, 2));
  
  if (comentariosProductos.length > 0) {
    console.log('💬 Comentarios de productos encontrados:', comentariosProductos);
    console.log('💬 Notas finales que se envían:', notasFinales);
  } else {
    console.log('⚠️ No se encontraron comentarios de productos en el carrito');
  }

  // Verificar que todos los campos requeridos estén presentes
  console.log('✅ Verificación de campos requeridos:');
  console.log('   - restaurant_id:', datosPedido.restaurant_id);
  console.log('   - cliente:', !!datosPedido.cliente);
  console.log('   - productos:', datosPedido.productos.length);
  console.log('   - total:', datosPedido.total);
  console.log('   - recargo:', datosPedido.recargo);
  console.log('   - metodo_pago:', datosPedido.metodo_pago);
  console.log('   - tipo_entrega:', datosPedido.tipo_entrega);
  console.log('   - notas:', !!datosPedido.notas, datosPedido.notas || '(vacío)');
  console.log('   - nit:', !!datosPedido.nit, datosPedido.nit || '(no especificado)');
  console.log('   - nombre_factura:', !!datosPedido.nombre_factura, datosPedido.nombre_factura || '(no especificado)');

  // Verificar cada item del carrito para debug
  cartItems.forEach((item, index) => {
    console.log(`🛒 Item ${index + 1}:`, {
      nombre: item.nombre,
      comentario: item.comentario,
      tieneComentario: !!item.comentario
    });
  });

  return datosPedido;
}
