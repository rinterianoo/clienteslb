
import { Link } from "react-router-dom";
import fondoImage from "../../assets/images/fondo.jpg";
import FeaturedProducts from "../../components/public/FeaturedProducts";
import LocationsSection from "../../components/public/LocationsSection";
import EventsSection from "../../components/public/EventsSection";
import FloatingParticles from "../../components/public/FloatingParticles";

function FrozenProductsSection() {
  return (
    <section className="py-6 sm:py-8 lg:py-12 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Mobile-optimized title with animations */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 leading-tight animate-fade-in-up">
          Solicita nuestros productos{" "}
          <span className="text-orange-500 block sm:inline animate-fade-in-up animation-delay-200">congelados</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
          Lleva el auténtico sabor colombiano a tu casa y disfruta cuando quieras.
        </p>
        
        {/* Mobile-first button with enhanced animations */}
        <div className="animate-fade-in-up animation-delay-600">
          <Link
            to="/pedidos"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-lg sm:text-xl text-white font-medium rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-2xl group"
          >
            <span>Solicita tu pedido aquí</span>
            <svg className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden pt-16 sm:pt-20">
      {/* Hero Section - Mobile First */}
      <section className="relative flex items-center min-h-screen w-full overflow-hidden -mt-16 sm:-mt-20">
        <img
          src={fondoImage}
          alt="Comida tradicional colombiana"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/60 sm:to-black/40" />
        
        {/* Efecto de brillo sutil - adaptado para móvil */}
        <div className="absolute inset-0 opacity-10 sm:opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-radial from-orange-400/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 sm:w-80 sm:h-80 bg-gradient-radial from-yellow-400/20 to-transparent rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        </div>
        
        {/* Partículas flotantes sutiles */}
        <FloatingParticles />
        
        {/* Content - Mobile First Layout */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center sm:justify-start">
          <div className="flex flex-col items-center sm:items-start justify-center max-w-4xl text-center sm:text-left">
            {/* Mobile badge */}
            <span className="text-white text-sm sm:text-lg lg:text-xl tracking-wider mb-4 sm:mb-6 drop-shadow-lg uppercase opacity-90 animate-fade-in-up animation-delay-200 ">
               Abierto para envío y recogida
            </span>
            
            {/* Mobile-optimized title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white drop-shadow-2xl mb-6 sm:mb-8 lg:mb-12 leading-none">
              <span className="inline-block animate-fade-in-up animation-delay-400">Comida</span>
              <br className="block sm:hidden" /><span className="sm:hidden"> </span>
              <span className="inline-block animate-fade-in-up animation-delay-600">Tradicional</span>
              <br />
              <span className="inline-block text-yellow-400 animate-fade-in-up animation-delay-800">Colombiana</span>
            </h1>
            
            {/* Mobile CTA button */}
            <Link
              to="/pedidos"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-lg sm:text-xl text-white font-medium rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 animate-fade-in-up animation-delay-1000 min-w-[280px] sm:min-w-0"
            >
              <span>Pedir online</span>
              <svg className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            {/* Mobile trust indicators */}
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center sm:justify-start gap-4 text-white/80 text-xs sm:text-sm animate-fade-in-up animation-delay-1200">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Entrega rápida</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Pago seguro</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Comida fresca</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator - only on larger screens */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Locations Section */}
      <LocationsSection />
      
      {/* Events Section */}
      <EventsSection />
      
      {/* Frozen Products Section */}
      <FrozenProductsSection />
    </div>
  );
}
