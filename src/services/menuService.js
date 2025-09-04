import { API_BASE, RESTAURANT_ID, ENDPOINTS } from '../config/api';
import { hacerPeticionSegura } from '../utils/apiHelpers';

// Servicio para obtener productos del menú
export const menuService = {
  // Obtener todos los productos del restaurante
  async getProductos() {
    try {
      const url = `${ENDPOINTS.GET_PRODUCTOS}?restaurante=${RESTAURANT_ID}`;
      const response = await hacerPeticionSegura(url);
      
      if (response.success) {
        // La API devuelve un objeto con estructura: { success, productos: [...] }
        const productos = response.data?.productos || [];
        const restaurante = response.data?.restaurante || {};
        
        console.log('Datos de la API:', response.data); // Para debug
        console.log('Productos encontrados:', productos.length);
        
        return {
          success: true,
          productos: Array.isArray(productos) ? productos : [],
          restaurante,
        };
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
      return {
        success: false,
        error: error.message || 'Error al cargar el menú',
        productos: [],
      };
    }
  },

  // Filtrar productos por categoría
  filtrarPorCategoria(productos, categoria) {
    if (!Array.isArray(productos)) return [];
    if (!categoria || categoria === 'todos') {
      return productos;
    }
    return productos.filter(producto => 
      producto.categoria?.toLowerCase() === categoria.toLowerCase()
    );
  },

  // Buscar productos por nombre
  buscarProductos(productos, termino) {
    if (!Array.isArray(productos)) return [];
    if (!termino) return productos;
    
    const terminoLower = termino.toLowerCase();
    return productos.filter(producto =>
      producto.nombre?.toLowerCase().includes(terminoLower) ||
      producto.descripcion?.toLowerCase().includes(terminoLower)
    );
  },
};
