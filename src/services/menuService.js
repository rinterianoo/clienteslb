
import { API_BASE, ENDPOINTS, ENVIRONMENT } from '../config/api';
import { hacerPeticionSegura } from '../utils/apiHelpers';
import { getTiendaSeleccionada } from '../utils/tiendaHelpers';

// Servicio para obtener productos del menú
export const menuService = {
  // Obtener todos los productos del restaurante
  async getProductos() {
    try {
      // Obtener restaurant_id dinámicamente
      const tienda = getTiendaSeleccionada();
      const restaurant_id = tienda?.id_restaurante || 1;
      console.log(`🌐 menuService [${ENVIRONMENT}] - Tienda seleccionada:`, tienda);
      console.log(`🌐 menuService [${ENVIRONMENT}] - Restaurant ID:`, restaurant_id);
      
      // Construir URL con parámetro GET según funciona en Postman
      const url = `${ENDPOINTS.GET_PRODUCTOS}?restaurant_id=${restaurant_id}`;
      console.log(`🌐 menuService [${ENVIRONMENT}] - URL GET:`, url);
      
      // Enviar como GET (sin payload en el body)
      const response = await hacerPeticionSegura(url);
      console.log(`🌐 menuService [${ENVIRONMENT}] - Respuesta cruda:`, response);
      
      if (response.success) {
        // La API devuelve un objeto con estructura: { success, productos: [...] }
        const productos = response.data?.productos || [];
        const restaurante = response.data?.restaurante || {};
        
        console.log(`🌐 menuService [${ENVIRONMENT}] - Datos de la API:`, response.data);
        console.log(`🌐 menuService [${ENVIRONMENT}] - Productos encontrados:`, productos.length);
        console.log(`🌐 menuService [${ENVIRONMENT}] - Restaurante API:`, restaurante);
        
        return {
          success: true,
          productos: Array.isArray(productos) ? productos : [],
          restaurante,
        };
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error(`🌐 menuService [${ENVIRONMENT}] - Error al obtener productos:`, error);
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
