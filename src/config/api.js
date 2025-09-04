// Configuración de API
export const API_BASE = "https://prontodelivery.lat/midelivery/api";

// ID del restaurante
export const RESTAURANT_ID = "1";

// Endpoints
export const ENDPOINTS = {
  GET_PRODUCTOS: `${API_BASE}/get_productos.php`,
  REGISTRAR_PEDIDO: `${API_BASE}/registrar_pedido.php`,
};

// Configuración por defecto para requests
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};
