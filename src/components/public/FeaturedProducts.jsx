import { useMenu } from "../../context/MenuContext";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export default function FeaturedProducts() {
  const { productos, loading, error } = useMenu();
  const [sectionRef, isVisible] = useIntersectionObserver();

  // Mostrar solo los primeros 4 productos
  const productosDestacados = productos.slice(0, 4);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Platos</h2>
            <div className="animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Platos</h2>
          <p className="text-gray-600 mb-8">No pudimos cargar el menú en este momento.</p>
          <Link
            to="/pedidos"
            className="inline-flex items-center px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors"
          >
            Ver Menú
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20">
        <div className={`text-center mb-12 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Nuestros Platos
          </h2>
          <p className="text-lg text-gray-600">
            Descubre algunos de nuestros deliciosos platos tradicionales
          </p>
        </div>

        {productosDestacados.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {productosDestacados.map((producto, index) => (
                <div 
                  key={producto.id} 
                  className={`transition-all duration-500 ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{ 
                    transitionDelay: isVisible ? `${400 + (index * 150)}ms` : '0ms'
                  }}
                >
                  <ProductCard producto={producto} />
                </div>
              ))}
            </div>
            
            <div className={`text-center transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: isVisible ? '1000ms' : '0ms' }}>
              <Link
                to="/pedidos"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white text-lg rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Ver Menú Completo
                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-8">Estamos preparando nuestro menú para ti.</p>
            <Link
              to="/pedidos"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Ver Menú
              <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
