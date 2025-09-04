import { createContext, useContext, useState, useEffect } from 'react';
import { menuService } from '../services/menuService';

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu debe ser usado dentro de MenuProvider');
  }
  return context;
};

export const MenuProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // Cargar productos al inicializar
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await menuService.getProductos();
      
      if (response.success) {
        // Asegurar que siempre tenemos un array
        setProductos(Array.isArray(response.productos) ? response.productos : []);
      } else {
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
