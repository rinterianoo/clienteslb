import axios from 'axios';
import { DEFAULT_HEADERS } from '../config/api';

// Función para hacer peticiones seguras
export const hacerPeticionSegura = async (url, data = null, options = {}) => {
  try {
    const config = {
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
      timeout: 10000, // 10 segundos timeout
      ...options,
    };

    let response;
    
    if (data) {
      // POST request
      response = await axios.post(url, data, config);
    } else {
      // GET request
      response = await axios.get(url, config);
    }

    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error('Error en petición:', error);
    
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Error en la petición',
      status: error.response?.status || 500,
    };
  }
};
