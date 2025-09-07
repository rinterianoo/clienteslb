import { createContext, useContext, useState } from 'react';

const TiendaContext = createContext();

export const useTienda = () => {
  const context = useContext(TiendaContext);
  console.log('🏪 useTienda - Context disponible:', !!context);
  console.log('🏪 useTienda - Context value:', context);
  
  if (!context) {
    console.error('🏪 useTienda - ERROR: useTienda debe ser usado dentro de TiendaProvider');
    throw new Error('useTienda debe ser usado dentro de TiendaProvider');
  }
  return context;
};

export const TIENDAS = [
  {
    id_restaurante: 1, // Coincide con "La Berraquera" en la API
    nombre: 'La Berraquera CAES',
    key: 'caes',
    direccion: 'Km. 18.5 Carretera Al Salvador, Arrazola 1, Plaza Vía Pronto',
    telefono: '+502 3067-8426',
    googleMapsUrl: 'https://maps.app.goo.gl/vtxNA58SrFXu7tZG6',
    horarios: 'Lun - Dom: 11:30 AM - 8:00 PM',
    features: ['Parqueo Amplio', 'Terraza', 'WiFi', 'Ambiente Familiar']
  },
  {
    id_restaurante: 2, // Corregido: La Berraquera Cayibel
    nombre: 'La Berraquera Cayalá',
    key: 'cayala',
    direccion: 'Boulevard Austriaco 35-70 Local 103 Cayalá, Cayibel, Mercado Gastronómico',
    telefono: '+502 3812-6696',
    googleMapsUrl: 'https://maps.app.goo.gl/8GYwaG2f3QwykLGB7',
    horarios: 'Dom - Mié: 12:00 PM - 9:00 PM | Jue: 12:00 PM - 10:00 PM | Vie: 12:00 PM - 11:00 PM | Sáb: 12:00 AM - 12:00 PM',
    features: ['Mercado Gastronómico', 'Música Ambiente', 'Estacionamiento', 'Eventos Especiales', 'Pet Friendly']
  },
];

export const TiendaProvider = ({ children }) => {
  const [tienda, setTienda] = useState(() => {
    console.log('🏪 TiendaProvider - Inicializando...');
    const saved = localStorage.getItem('tiendaSeleccionada');
    console.log('🏪 TiendaProvider - localStorage value:', saved);
    
    // Solo parsear si existe y es válido
    let parsedTienda = null;
    if (saved) {
      try {
        parsedTienda = JSON.parse(saved);
        console.log('🏪 TiendaProvider - Tienda parseada:', parsedTienda);
        
        // Verificar que la tienda parseada tenga la estructura correcta
        if (!parsedTienda.id_restaurante || !parsedTienda.nombre) {
          console.log('🏪 TiendaProvider - Tienda inválida, limpiando localStorage');
          localStorage.removeItem('tiendaSeleccionada');
          parsedTienda = null;
        }
      } catch (error) {
        console.error('🏪 TiendaProvider - Error al parsear tienda:', error);
        localStorage.removeItem('tiendaSeleccionada');
        parsedTienda = null;
      }
    }
    
    console.log('🏪 TiendaProvider - Estado inicial tienda:', parsedTienda);
    return parsedTienda;
  });

  // El modal se muestra por defecto si no hay tienda seleccionada VÁLIDA
  const [mostrarModal, setMostrarModal] = useState(() => {
    const noHayTienda = !tienda;
    console.log('🏪 TiendaProvider - mostrarModal inicial:', noHayTienda);
    return noHayTienda;
  });

  const seleccionarTienda = (tiendaObj) => {
    console.log('🏪 TiendaProvider - Seleccionando tienda:', tiendaObj);
    console.log('🏪 TiendaProvider - ID de restaurante:', tiendaObj.id_restaurante);
    
    setTienda(tiendaObj);
    localStorage.setItem('tiendaSeleccionada', JSON.stringify(tiendaObj));
    console.log('🏪 TiendaProvider - Tienda guardada en localStorage');
    
    // Verificar que se guardó correctamente
    const verificacion = localStorage.getItem('tiendaSeleccionada');
    console.log('🏪 TiendaProvider - Verificación localStorage:', verificacion);
  };

  const abrirModalCambio = () => {
    console.log('🏪 TiendaProvider - Abriendo modal para cambiar tienda');
    setMostrarModal(true);
  };

  const resetearTienda = () => {
    console.log('🏪 TiendaProvider - Reseteando tienda');
    localStorage.removeItem('tiendaSeleccionada');
    setTienda(null);
    setMostrarModal(true);
  };

  console.log('🏪 TiendaProvider - Render, tienda actual:', tienda);
  console.log('🏪 TiendaProvider - restaurant_id actual:', tienda?.id_restaurante);

  return (
    <TiendaContext.Provider value={{ 
      tienda, 
      seleccionarTienda, 
      mostrarModal, 
      setMostrarModal, 
      abrirModalCambio,
      resetearTienda // Para debugging
    }}>
      {children}
    </TiendaContext.Provider>
  );
};
