import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { CalendarDaysIcon, UserGroupIcon, SparklesIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';

export default function EventsSection() {
  const [sectionRef, isVisible] = useIntersectionObserver();

  const handleWhatsAppClick = () => {
    const phoneNumber = "50238126696";
    const message = encodeURIComponent("¡Hola! 🎉 Me interesa cotizar catering para un evento. ¿Podrían ayudarme con información? Gracias 😊");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, "_blank");
  };

  const eventTypes = [
    {
      icon: UserGroupIcon,
      title: "Eventos Corporativos",
      description: "Reuniones, conferencias y celebraciones empresariales con el sabor único de Colombia"
    },
    {
      icon: HeartIcon,
      title: "Bodas y Celebraciones",
      description: "Matrimonios, quinceaños y fiestas familiares llenas de alegría y tradición"
    },
    {
      icon: CalendarDaysIcon,
      title: "Eventos Especiales",
      description: "Graduaciones, cumpleaños y reuniones sociales con un toque especial"
    }
  ];

  return (
    <section className="pt-6 sm:pt-8 lg:pt-12 pb-12 sm:pb-16 lg:pb-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={sectionRef}
          className={`text-center transition-all duration-1000 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-center mb-6">
           
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900">
              Atendemos <span className="text-orange-500">Eventos</span>
            </h2>
          </div>
          
          {/* Subtitle */}
          <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-200 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-700 leading-relaxed">
              Sorprende a tus invitados con algo diferente,{" "}
              <span className="font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">
                comida tradicional colombiana
              </span>
            </p>
          </div>

          {/* Event Types - Mobile Optimized */}
          <div className={`mb-12 sm:mb-16 transition-all duration-1000 delay-400 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            {/* Mobile: Stacked Cards */}
            <div className="lg:hidden space-y-4">
              {eventTypes.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                        <IconComponent className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop: Grid */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8">
              {eventTypes.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 hover:bg-orange-200 transition-colors">
                      <IconComponent className="w-10 h-10 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className={`transition-all duration-1000 delay-600 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden mb-8">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 mr-3 animate-bounce" />
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    ¡Hagamos tu evento único!
                  </h3>
                </div>
                <p className="text-lg sm:text-xl opacity-90 mb-6 max-w-3xl mx-auto">
                  Te ayudamos a planificar cada detalle con el auténtico sabor colombiano que tanto aman tus invitados
                </p>
                
                <button
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center px-8 sm:px-12 py-4 sm:py-6 bg-white text-green-600 font-semibold text-lg sm:text-xl rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-3xl"
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.569-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108"/>
                  </svg>
                  Solicita tu cotización aquí
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className={`transition-all duration-1000 delay-800 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center">
                  <SparklesIcon className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="text-gray-700">Servicio personalizado</span>
                </div>
                <div className="flex items-center">
                  <UserGroupIcon className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="text-gray-700">Para todos los tamaños</span>
                </div>
                <div className="flex items-center">
                  <CalendarDaysIcon className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="text-gray-700">Planificación completa</span>
                </div>
              </div>
              <p className="text-gray-600 text-center mt-4 text-sm sm:text-base">
                ¡Contáctanos por WhatsApp y hagamos realidad el evento de tus sueños con el mejor sabor colombiano!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
