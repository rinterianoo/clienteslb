import { ENDPOINTS } from '../config/api';
import { hacerPeticionSegura } from '../utils/apiHelpers';

// Servicio para manejar pedidos
export const pedidosService = {
  // Registrar un nuevo pedido
  async registrarPedido(datosPedido) {
    try {
      // Validar datos mínimos requeridos
      if (!datosPedido.cliente || !datosPedido.productos || datosPedido.productos.length === 0) {
        throw new Error('Datos del pedido incompletos');
      }

      // Estructura del pedido en formato JSON
      const pedido = {
        cliente: {
          nombre: datosPedido.cliente.nombre,
          telefono: datosPedido.cliente.telefono,
          email: datosPedido.cliente.email,
          direccion: datosPedido.cliente.direccion,
        },
        productos: datosPedido.productos.map(item => ({
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad,
          observaciones: item.observaciones || '',
        })),
        total: datosPedido.total,
        metodo_pago: datosPedido.metodoPago || 'efectivo',
        tipo_entrega: datosPedido.tipoEntrega || 'domicilio', // domicilio | recogida
        observaciones: datosPedido.observaciones || '',
        fecha: new Date().toISOString(),
      };

      const response = await hacerPeticionSegura(ENDPOINTS.REGISTRAR_PEDIDO, pedido);
      
      if (response.success) {
        return {
          success: true,
          pedido: response.data,
          mensaje: 'Pedido registrado exitosamente',
        };
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Error al registrar pedido:', error);
      return {
        success: false,
        error: error.message || 'Error al procesar el pedido',
      };
    }
  },

  // Calcular el total del pedido
  calcularTotal(productos) {
    return productos.reduce((total, item) => {
      return total + (item.precio * item.cantidad);
    }, 0);
  },

  // Validar datos del cliente
  validarCliente(cliente) {
    const errores = [];

    if (!cliente.nombre || cliente.nombre.trim().length < 2) {
      errores.push('El nombre es requerido (mínimo 2 caracteres)');
    }

    if (!cliente.telefono || cliente.telefono.trim().length < 7) {
      errores.push('El teléfono es requerido (mínimo 7 dígitos)');
    }

    if (cliente.email && !/\S+@\S+\.\S+/.test(cliente.email)) {
      errores.push('El email debe tener un formato válido');
    }

    if (!cliente.direccion || cliente.direccion.trim().length < 10) {
      errores.push('La dirección es requerida (mínimo 10 caracteres)');
    }

    return {
      esValido: errores.length === 0,
      errores,
    };
  },

  // Formatear pedido para mostrar
  formatearPedido(pedido) {
    return {
      ...pedido,
      totalFormateado: new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
      }).format(pedido.total),
      fechaFormateada: new Date(pedido.fecha).toLocaleString('es-CO'),
    };
  },
};
