import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export default function LocationsSection() {
  const [sectionRef, isVisible] = useIntersectionObserver();
  
  const locations = [
    {
      id: 1,
      nombre: "La Berraquera CAES",
      direccion: "Km. 18.5 Carretera Al Salvador, Arrazola 1, Plaza Vía Pronto",
      telefono: "+502 3067-8426",
      googleMapsUrl: "https://maps.app.goo.gl/vtxNA58SrFXu7tZG6",
      horarios: "Lun - Dom: 11:30 AM - 8:00 PM",
      // URL real de embed de Google Maps para La Berraquera CAES
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.1037024720704!2d-90.4610534!3d14.5360604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a50002e3c405%3A0xd929d308a9eca393!2sLa%20Berraquera%20CAES!5e0!3m2!1ses-419!2sgt!4v1756975592142!5m2!1ses-419!2sgt"
    },
    {
      id: 2,
      nombre: "La Berraquera Cayibel",
      direccion: "Boulevard Austriaco 35-70 Local 103 Cayalá, Cayibel, Mercado Gastronómico",
      telefono: "+502 3812-6696",
      googleMapsUrl: "https://maps.app.goo.gl/8GYwaG2f3QwykLGB7",
      horarios: "Dom - Mié: 12:00 PM - 9:00 PM | Jue: 12:00 PM - 10:00 PM | Vie: 12:00 PM - 11:00 PM | Sáb: 12:00 AM - 12:00 PM",
      // URL real de embed de Google Maps para La Berraquera Cayibel
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.8092864681275!2d-90.4843125!3d14.6099375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a3eb8b08d5a3%3A0xd2cb5384c1972513!2sLa%20Berraquera!5e0!3m2!1ses-419!2sgt!4v1756975636741!5m2!1ses-419!2sgt"
    }
  ];

  const handleOpenMaps = (url) => {
    window.open(url, '_blank');
  };

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestras <span className="text-yellow-600">Ubicaciones</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visítanos en cualquiera de nuestras sucursales y disfruta de la auténtica comida tradicional colombiana
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {locations.map((location, index) => (
            <div 
              key={location.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${300 + (index * 200)}ms` : '0ms'
              }}
            >
              {/* Mini Mapa */}
              <div className="h-48 relative overflow-hidden">
                <iframe
                  src={location.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
                {/* Overlay para hacer clic y abrir en Google Maps */}
                <div 
                  className="absolute inset-0 bg-transparent cursor-pointer group hover:bg-black/10 transition-colors duration-200"
                  onClick={() => handleOpenMaps(location.googleMapsUrl)}
                >
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-sm text-gray-700 flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      Ver más grande
                    </span>
                  </div>
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Header de la tarjeta */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {location.nombre}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start text-gray-600">
                      <MapPinIcon className="h-5 w-5 mr-3 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{location.direccion}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <PhoneIcon className="h-5 w-5 mr-3 text-yellow-600 flex-shrink-0" />
                      <span className="font-medium">{location.telefono}</span>
                    </div>
                  </div>
                </div>

                {/* Horarios */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Horarios de Atención</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{location.horarios}</p>
                </div>

                {/* Botones de acción - Fijos al final */}
                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <button
                    onClick={() => handleOpenMaps(location.googleMapsUrl)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    Abrir en Maps
                  </button>
                  
                  <button
                    onClick={() => window.location.href = `tel:${location.telefono}`}
                    className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <PhoneIcon className="h-5 w-5 mr-2" />
                    Llamar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
