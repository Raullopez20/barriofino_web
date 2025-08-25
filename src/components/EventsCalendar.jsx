import { useState, useEffect } from 'react';

const EventsCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('todos'); // 'todos', 'proximos', 'pasados'

    useEffect(() => {
        // Cargar eventos desde el archivo JSON
        const loadEvents = async () => {
            try {
                const response = await fetch('/data/events.json');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error cargando eventos:', error);
                // Fallback con datos de ejemplo
                setEvents([
                    {
                        id: 1,
                        title: "Desfile de Carnaval 2025",
                        date: "2025-02-15",
                        time: "18:00",
                        location: "Plaza Mayor",
                        description: "Salida oficial de la comparsa Barrio Fino en el gran desfile de carnaval.",
                        image: "/assets/images/events/desfile-2025.jpg"
                    },
                    {
                        id: 2,
                        title: "Ensayo General",
                        date: "2025-02-10",
                        time: "20:00",
                        location: "Local de la Comparsa",
                        description: "Ensayo abierto al público. Ven a conocer nuestras coreografías.",
                        image: "/assets/images/events/ensayo.jpg"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    // Función para formatear fechas
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Función para determinar si un evento es próximo o pasado
    const isUpcoming = (dateString) => {
        const eventDate = new Date(dateString);
        const today = new Date();
        return eventDate >= today;
    };

    // Filtrar eventos según el filtro seleccionado
    const filteredEvents = events.filter(event => {
        if (filter === 'proximos') return isUpcoming(event.date);
        if (filter === 'pasados') return !isUpcoming(event.date);
        return true; // 'todos'
    });

    // Ordenar eventos por fecha
    const sortedEvents = filteredEvents.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-4">
                <button
                    onClick={() => setFilter('todos')}
                    className={`px-6 py-2 rounded-lg transition-colors font-medium ${
                        filter === 'todos'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Todos los Eventos
                </button>
                <button
                    onClick={() => setFilter('proximos')}
                    className={`px-6 py-2 rounded-lg transition-colors font-medium ${
                        filter === 'proximos'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Próximos
                </button>
                <button
                    onClick={() => setFilter('pasados')}
                    className={`px-6 py-2 rounded-lg transition-colors font-medium ${
                        filter === 'pasados'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Pasados
                </button>
            </div>

            {/* Lista de eventos */}
            {sortedEvents.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">📅</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No hay eventos {filter === 'todos' ? '' : filter}
                    </h3>
                    <p className="text-gray-600">
                        {filter === 'proximos'
                            ? 'Próximamente anunciaremos nuevos eventos'
                            : 'No se encontraron eventos para mostrar'
                        }
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sortedEvents.map((event, index) => (
                        <div
                            key={event.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
                                isUpcoming(event.date) ? 'border-l-4 border-black' : 'opacity-75'
                            }`}
                        >
                            {/* Imagen del evento */}
                            <div className="h-48 bg-gray-300 relative flex items-center justify-center">
                                {/* Placeholder para imagen real */}
                                <span className="text-gray-500">{event.title}</span>

                                {/* Badge de estado */}
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                                    isUpcoming(event.date)
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {isUpcoming(event.date) ? 'Próximo' : 'Finalizado'}
                                </div>
                            </div>

                            {/* Contenido del evento */}
                            <div className="p-6">
                                {/* Fecha y hora */}
                                <div className="flex items-center text-sm text-gray-600 mb-3">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="capitalize">{formatDate(event.date)}</span>
                                    {event.time && (
                                        <>
                                            <span className="mx-2">•</span>
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{event.time}</span>
                                        </>
                                    )}
                                </div>

                                {/* Título */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {event.title}
                                </h3>

                                {/* Descripción */}
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {event.description}
                                </p>

                                {/* Ubicación */}
                                {event.location && (
                                    <div className="flex items-center text-sm text-gray-600 mb-4">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{event.location}</span>
                                    </div>
                                )}

                                {/* Botones de acción */}
                                <div className="flex flex-wrap gap-3">
                                    {isUpcoming(event.date) && (
                                        <>
                                            <button className="flex-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm">
                                                Más Información
                                            </button>
                                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                                                Compartir
                                            </button>
                                        </>
                                    )}
                                    {!isUpcoming(event.date) && (
                                        <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
                                            Ver Galería
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Sección informativa para administradores */}
            <div className="mt-16 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    💡 Para administradores: Cómo actualizar eventos
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Archivo de eventos:</h4>
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">/public/data/events.json</code>
                        <p className="text-gray-600 mt-2">
                            Edita este archivo para añadir, modificar o eliminar eventos.
                            Los cambios se reflejarán automáticamente en la web.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-2">Estructura del evento:</h4>
                        <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`{
  "id": 1,
  "title": "Nombre del evento",
  "date": "2025-02-15",
  "time": "18:00",
  "location": "Ubicación",
  "description": "Descripción...",
  "image": "/assets/images/..."
}`}
            </pre>
                    </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-800">
                        <strong>Importante:</strong> Las fechas deben estar en formato YYYY-MM-DD.
                        Las imágenes deben subirse a <code>/public/assets/images/events/</code>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EventsCalendar;