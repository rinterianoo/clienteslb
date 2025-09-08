// ========================================
// CONFIGURACIÓN DE ENTORNOS
// ========================================

// 🔧 DESARROLLO (localhost) - AHORA TAMBIÉN USA LA API DE PRODUCCIÓN
const DEVELOPMENT_CONFIG = {
  API_BASE: "https://prontodelivery.lat/api",
  ENVIRONMENT: "development"
};

// 🚀 PRODUCCIÓN (servidor real)
const PRODUCTION_CONFIG = {
  API_BASE: "https://prontodelivery.lat/api",
  ENVIRONMENT: "production"
};

// ========================================
// ⚠️  CAMBIAR AQUÍ PARA PRODUCCIÓN
// ========================================
// Para DESARROLLO: usar DEVELOPMENT_CONFIG
// Para PRODUCCIÓN: cambiar a PRODUCTION_CONFIG
// const CURRENT_CONFIG = DEVELOPMENT_CONFIG; // ← Comentar para producción
const CURRENT_CONFIG = PRODUCTION_CONFIG; // ← Descomentar para producción

// ========================================
// CONFIGURACIÓN ACTUAL
// ========================================
export const API_BASE = CURRENT_CONFIG.API_BASE;
export const ENVIRONMENT = CURRENT_CONFIG.ENVIRONMENT;

// ID del restaurante (deprecado - ahora se usa dinámicamente)
export const RESTAURANT_ID = "1";

// Endpoints
export const ENDPOINTS = {
  GET_PRODUCTOS: `${API_BASE}/get_productos.php`,
  REGISTRAR_PEDIDO: `${API_BASE}/registrar_pedido.php`,
};

// Log de configuración actual
console.log(`🌐 API Config - Entorno: ${ENVIRONMENT}`);
console.log(`🌐 API Config - Base URL: ${API_BASE}`);

// Configuración por defecto para requests
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};
