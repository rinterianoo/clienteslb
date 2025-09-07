// ========================================
// CONFIGURACIÓN PARA DEBUGGEAR PRODUCCIÓN
// ========================================

// 🔧 DESARROLLO (localhost)
const DEVELOPMENT_CONFIG = {
  API_BASE: "http://localhost/Pronto-delivery/api",
  ENVIRONMENT: "development"
};

// 🚀 OPCIONES DE PRODUCCIÓN PARA PROBAR
const PRODUCTION_OPTIONS = {
  // Opción 1: HTTPS (recomendado)
  HTTPS: {
    API_BASE: "https://prontodelivery.lat/api",
    ENVIRONMENT: "production-https"
  },
  
  // Opción 2: HTTP (si HTTPS falla)
  HTTP: {
    API_BASE: "http://prontodelivery.lat/api",
    ENVIRONMENT: "production-http"
  },
  
  // Opción 3: Con subdirectorio específico
  SUBDIR: {
    API_BASE: "https://prontodelivery.lat/midelivery/api",
    ENVIRONMENT: "production-subdir"
  },
  
  // Opción 4: IP directa (para bypass DNS)
  DIRECT: {
    API_BASE: "https://198.54.117.200/api",
    ENVIRONMENT: "production-ip"
  }
};

// ========================================
// ⚠️  CONFIGURACIÓN ACTIVA - CAMBIAR AQUÍ
// ========================================
// Para DESARROLLO
const CURRENT_CONFIG = DEVELOPMENT_CONFIG;

// Para PRODUCCIÓN - DESCOMENTAR UNA DE ESTAS OPCIONES:
// const CURRENT_CONFIG = PRODUCTION_OPTIONS.HTTPS;   // ← Probar primero
// const CURRENT_CONFIG = PRODUCTION_OPTIONS.HTTP;    // ← Si HTTPS falla
// const CURRENT_CONFIG = PRODUCTION_OPTIONS.SUBDIR;  // ← Ruta anterior
// const CURRENT_CONFIG = PRODUCTION_OPTIONS.DIRECT;  // ← IP directa

// ========================================
// EXPORTACIONES
// ========================================
export const API_BASE = CURRENT_CONFIG.API_BASE;
export const ENVIRONMENT = CURRENT_CONFIG.ENVIRONMENT;

// Endpoints
export const ENDPOINTS = {
  GET_PRODUCTOS: `${API_BASE}/get_productos.php`,
  REGISTRAR_PEDIDO: `${API_BASE}/registrar_pedido.php`,
};

// Debug info
console.log(`🌐 API Config - Entorno: ${ENVIRONMENT}`);
console.log(`🌐 API Config - Base URL: ${API_BASE}`);
console.log(`🌐 Endpoint GET: ${ENDPOINTS.GET_PRODUCTOS}`);
console.log(`🌐 Endpoint POST: ${ENDPOINTS.REGISTRAR_PEDIDO}`);

// Headers por defecto
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};
