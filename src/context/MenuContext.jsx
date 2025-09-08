import { createContext, useContext, useState, useEffect } from 'react';
import { menuService } from '../services/menuService';
import { useTienda } from './TiendaContext';

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  console.log('🍽️ useMenu - Context disponible:', !!context);
  console.log('🍽️ useMenu - Context value:', context);
  
  if (!context) {
    console.error('🍽️ useMenu - ERROR: useMenu debe ser usado dentro de MenuProvider');
    throw new Error('useMenu debe ser usado dentro de MenuProvider');
  }
  return context;
};

export const MenuProvider = ({ children }) => {
  console.log('🍽️ MenuProvider - Inicializando...');
  
  const { tienda } = useTienda();
  console.log('🍽️ MenuProvider - Tienda desde useTienda:', tienda);
  
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // Cargar productos cuando cambie la tienda
  useEffect(() => {
    console.log('🍽️ MenuContext - useEffect, tienda cambiada a:', tienda);
    if (tienda) {
      console.log('🍽️ MenuContext - Cargando productos para tienda:', tienda.nombre, 'ID:', tienda.id_restaurante);
      cargarProductos();
    } else {
      console.log('🍽️ MenuContext - No hay tienda seleccionada, limpiando productos');
      setProductos([]);
      setLoading(false);
    }
  }, [tienda]); // Dependencia en tienda

  const cargarProductos = async () => {
    console.log('🍽️ MenuContext - Iniciando carga de productos...');
    setLoading(true);
    setError(null);
    
    try {
      console.log('🍽️ MenuContext - Llamando a menuService.getProductos()');
      const response = await menuService.getProductos();
      console.log('🍽️ MenuContext - Respuesta del servicio:', response);
      
      if (response.success) {
        // Asegurar que siempre tenemos un array
        setProductos(Array.isArray(response.productos) ? response.productos : []);
        console.log('🍽️ MenuContext - Productos cargados exitosamente:', response.productos.length);
      } else {
        console.error('🍽️ MenuContext - Error en respuesta:', response.error);
        setError(response.error);
        setProductos([]); // Asegurar array vacío en caso de error
      }
    } catch (err) {
      setError('Error al cargar el menú');
    } finally {
      setLoading(false);
    }
  };

  // Productos filtrados
  const productosFiltrados = () => {
    // Asegurar que productos es un array antes de filtrar
    if (!Array.isArray(productos)) return [];
    
    let resultado = productos;
    console.log('🍽️ MenuContext - Productos antes de filtrar por disponibilidad:', resultado.length);

    // PRIMERO: Filtrar solo productos DISPONIBLES (disponible = true)
    resultado = resultado.filter(producto => {
      // El campo disponible indica si el producto está activo/disponible
      const disponible = producto.disponible;
      
      console.log('🍽️ MenuContext - Producto:', producto.nombre, 'Disponible:', disponible, 'Tipo:', typeof disponible);
      
      // Aceptar tanto boolean true como string "1" 
      const estaDisponible = disponible === true || disponible === 1 || disponible === "1";
      
      if (!estaDisponible) {
        console.log('🍽️ MenuContext - Producto NO DISPONIBLE filtrado:', producto.nombre, 'Disponible:', disponible);
      }
      
      return estaDisponible;
    });
    
    console.log('🍽️ MenuContext - Productos DISPONIBLES después del filtro:', resultado.length);

    // Filtrar por categoría
    resultado = menuService.filtrarPorCategoria(resultado, categoriaSeleccionada);

    // Filtrar por búsqueda
    resultado = menuService.buscarProductos(resultado, terminoBusqueda);

    return resultado;
  };

  // Obtener categorías únicas
  const categorias = () => {
    if (!Array.isArray(productos)) return ['todos'];
    const categoriasUnicas = [...new Set(productos.map(p => p.categoria))];
    return ['todos', ...categoriasUnicas];
  };

  const value = {
    productos: productosFiltrados(),
    todosLosProductos: productos,
    loading,
    error,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    terminoBusqueda,
    setTerminoBusqueda,
    categorias: categorias(),
    recargarProductos: cargarProductos,
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};
