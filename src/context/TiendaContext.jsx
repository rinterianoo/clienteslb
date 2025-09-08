import { createContext, useContext, useState } from 'react';
const TiendaContext = createContext();
export const useTienda = () => {
  const context = useContext(TiendaContext);
  if (!context) {
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
    const saved = localStorage.getItem('tiendaSeleccionada');
    // Solo parsear si existe y es válido
    let parsedTienda = null;
    if (saved) {
      try {
        parsedTienda = JSON.parse(saved);
        // Verificar que la tienda parseada tenga la estructura correcta
        if (!parsedTienda.id_restaurante || !parsedTienda.nombre) {
          localStorage.removeItem('tiendaSeleccionada');
          parsedTienda = null;
        }
      } catch (error) {
        localStorage.removeItem('tiendaSeleccionada');
        parsedTienda = null;
      }
    }
    return parsedTienda;
  });
  // El modal se muestra por defecto si no hay tienda seleccionada VÁLIDA
  const [mostrarModal, setMostrarModal] = useState(() => {
    const noHayTienda = !tienda;
    return noHayTienda;
  });
  const seleccionarTienda = (tiendaObj) => {
    setTienda(tiendaObj);
    localStorage.setItem('tiendaSeleccionada', JSON.stringify(tiendaObj));
    // Verificar que se guardó correctamente
    const verificacion = localStorage.getItem('tiendaSeleccionada');
  };
  const abrirModalCambio = () => {
    setMostrarModal(true);
  };
  const resetearTienda = () => {
    localStorage.removeItem('tiendaSeleccionada');
    setTienda(null);
    setMostrarModal(true);
  };
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
