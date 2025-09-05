import { createContext, useContext, useState } from 'react';
import { registrarPedido } from '../services/pedidosService';

const PedidoContext = createContext();

export const usePedido = () => {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error('usePedido debe ser usado dentro de PedidoProvider');
  }
  return context;
};

export const PedidoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [cliente, setCliente] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
  });
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [tipoEntrega, setTipoEntrega] = useState('domicilio');
  const [observaciones, setObservaciones] = useState('');
  const [procesandoPedido, setProcesandoPedido] = useState(false);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto, cantidad = 1, observaciones = '') => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad, observaciones }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad, observaciones }]);
    }
  };

  // Remover producto del carrito
  const removerDelCarrito = (productId) => {
    setCarrito(carrito.filter(item => item.id !== productId));
  };

  // Actualizar cantidad de producto
  const actualizarCantidad = (productId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      removerDelCarrito(productId);
      return;
    }

    setCarrito(carrito.map(item =>
      item.id === productId
        ? { ...item, cantidad: nuevaCantidad }
        : item
    ));
  };

  // Limpiar carrito
  const limpiarCarrito = () => {
    setCarrito([]);
  };

  // Calcular total
  // Función para calcular el total del carrito
  const calcularTotal = (items) => {
    return items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  // Función para validar datos del cliente  
  const validarCliente = (clienteData) => {
    const errores = {};
    
    if (!clienteData.nombre?.trim()) {
      errores.nombre = 'El nombre es requerido';
    }
    
    if (!clienteData.telefono?.trim()) {
      errores.telefono = 'El teléfono es requerido';
    }
    
    if (!clienteData.direccion?.trim()) {
      errores.direccion = 'La dirección es requerida';
    }
    
    return {
      esValido: Object.keys(errores).length === 0,
      errores
    };
  };

  const total = calcularTotal(carrito);

  // Procesar pedido
  const procesarPedido = async () => {
    setProcesandoPedido(true);

    try {
      // Validar cliente
      const validacionCliente = validarCliente(cliente);
      if (!validacionCliente.esValido) {
        throw new Error(validacionCliente.errores.join(', '));
      }

      // Validar carrito
      if (carrito.length === 0) {
        throw new Error('El carrito está vacío');
      }

      // Crear pedido
      const datosPedido = {
        cliente,
        productos: carrito,
        total,
        metodoPago,
        tipoEntrega,
        observaciones,
      };

      const response = await registrarPedido(datosPedido);

      if (response.success) {
        // Limpiar estado después del pedido exitoso
        limpiarCarrito();
        setObservaciones('');
        
        return response;
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    } finally {
      setProcesandoPedido(false);
    }
  };

  const value = {
    carrito,
    cliente,
    setCliente,
    metodoPago,
    setMetodoPago,
    tipoEntrega,
    setTipoEntrega,
    observaciones,
    setObservaciones,
    procesandoPedido,
    total,
    agregarAlCarrito,
    removerDelCarrito,
    actualizarCantidad,
    limpiarCarrito,
    procesarPedido,
    cantidadItems: carrito.reduce((sum, item) => sum + item.cantidad, 0),
  };

  return (
    <PedidoContext.Provider value={value}>
      {children}
    </PedidoContext.Provider>
  );
};
