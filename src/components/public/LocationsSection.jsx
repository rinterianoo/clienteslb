import { MapPinIcon, PhoneIcon, ClockIcon, GlobeAltIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useState } from 'react';

export default function LocationsSection() {
  const [sectionRef, isVisible] = useIntersectionObserver();
  const [activeLocation, setActiveLocation] = useState(0);
  
  const locations = [
    {
      id: 1,
      nombre: "La Berraquera CAES",
      direccion: "Km. 18.5 Carretera Al Salvador, Arrazola 1, Plaza Vía Pronto",
      telefono: "+502 3067-8426",
      googleMapsUrl: "https://maps.app.goo.gl/vtxNA58SrFXu7tZG6",
      horarios: "Lun - Dom: 11:30 AM - 8:00 PM",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.1037024720704!2d-90.4610534!3d14.5360604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a50002e3c405%3A0xd929d308a9eca393!2sLa%20Berraquera%20CAES!5e0!3m2!1ses-419!2sgt!4v1756975592142!5m2!1ses-419!2sgt",
      features: ["Parqueo Amplio", "Terraza", "WiFi", "Ambiente Familiar"]
    },
    {
      id: 2,
      nombre: "La Berraquera Cayibel",
      direccion: "Boulevard Austriaco 35-70 Local 103 Cayalá, Cayibel, Mercado Gastronómico",
      telefono: "+502 3812-6696",
      googleMapsUrl: "https://maps.app.goo.gl/8GYwaG2f3QwykLGB7",
      horarios: "Dom - Mié: 12:00 PM - 9:00 PM | Jue: 12:00 PM - 10:00 PM | Vie: 12:00 PM - 11:00 PM | Sáb: 12:00 AM - 12:00 PM",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.8092864681275!2d-90.4843125!3d14.6099375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a3eb8b08d5a3%3A0xd2cb5384c1972513!2sLa%20Berraquera!5e0!3m2!1ses-419!2sgt!4v1756975636741!5m2!1ses-419!2sgt",
      features: ["Mercado Gastronómico", "Música Ambiente", "Estacionamiento", "Eventos Especiales"]
    }
  ];

  const handleOpenMaps = (url) => {
    window.open(url, '_blank');
  };

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16 lg:py-20 pb-6 sm:pb-8 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center mb-4">
            <MapPinIcon className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500 mr-3" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Nuestras <span className="text-orange-500">Ubicaciones</span>
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Visítanos en cualquiera de nuestras sucursales y disfruta de la auténtica 
            experiencia <span className="text-orange-600 font-semibold">La Berraquera</span>
          </p>
        </div>

        {/* Mobile Location Selector */}
        <div className="mt-8 sm:mt-12 lg:hidden">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {locations.map((location, index) => (
              <button
                key={location.id}
                onClick={() => setActiveLocation(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeLocation === index
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300'
                }`}
              >
                {location.nombre.replace('La Berraquera ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Locations Grid - Desktop */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 max-w-6xl mx-auto">
          {locations.map((location, index) => (
            <LocationCard 
              key={location.id} 
              location={location} 
              index={index} 
              isVisible={isVisible} 
              onOpenMaps={handleOpenMaps}
            />
          ))}
        </div>

        {/* Mobile Location Display */}
        <div className="lg:hidden mt-6">
          <LocationCard 
            location={locations[activeLocation]} 
            index={activeLocation} 
            isVisible={isVisible}
            onOpenMaps={handleOpenMaps}
            isMobile={true}
          />
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-12 sm:mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  ¡Te Esperamos!
                </h3>
              </div>
              <p className="text-lg sm:text-xl opacity-90 mb-6 max-w-3xl mx-auto">
                Cada ubicación tiene su propio encanto, pero todas comparten el mismo sabor auténtico colombiano
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="tel:+50230678426"
                  className="bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 flex items-center"
                >
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  Llamar Ahora
                </a>
                <a
                  href="#pedidos"
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 flex items-center"
                >
                  <UserGroupIcon className="w-5 h-5 mr-2" />
                  Hacer Pedido
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationCard({ location, index, isVisible, onOpenMaps, isMobile = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-700 hover:shadow-2xl transform hover:-translate-y-2 flex flex-col h-full ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isMobile ? 'w-full' : ''}`}
      style={{ transitionDelay: `${300 + (index * 200)}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Map */}
      <div className="relative h-48 sm:h-64 lg:h-56 overflow-hidden">
        <iframe
          src={location.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={`w-full h-full transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div 
          className="absolute inset-0 bg-transparent cursor-pointer group hover:bg-black/10 transition-colors duration-200"
          onClick={() => onOpenMaps(location.googleMapsUrl)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-sm font-medium text-gray-700 flex items-center">
              <MapPinIcon className="w-4 h-4 mr-1 text-orange-500" />
              Ver en Mapa
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-3 h-3 bg-orange-500 rounded-full mr-3 animate-pulse"></span>
          {location.nombre}
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3 text-gray-600">
            <MapPinIcon className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <span className="text-base leading-relaxed">{location.direccion}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-gray-600">
            <PhoneIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
            <a 
              href={`tel:${location.telefono}`}
              className="text-base hover:text-orange-600 transition-colors"
            >
              {location.telefono}
            </a>
          </div>
          
          <div className="flex items-start space-x-3 text-gray-600">
            <ClockIcon className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <span className="text-base leading-relaxed">{location.horarios}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <GlobeAltIcon className="w-4 h-4 mr-2 text-orange-500" />
            Características
          </h4>
          <div className="flex flex-wrap gap-2">
            {location.features.map((feature, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full border border-orange-100"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-6">
          <button
            onClick={() => onOpenMaps(location.googleMapsUrl)}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white py-3 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
          >
            <MapPinIcon className="w-5 h-5 mr-2" />
            Abrir en Maps
          </button>
          
          <button
            onClick={() => window.location.href = `tel:${location.telefono}`}
            className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white py-3 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
          >
            <PhoneIcon className="w-5 h-5 mr-2" />
            Llamar
          </button>
        </div>
      </div>
    </div>
  );
}
