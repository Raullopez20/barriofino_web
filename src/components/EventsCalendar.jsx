import { useState, useEffect } from 'react';

// Iconos SVG mejorados y profesionales
const Icons = {
    WhatsApp: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
        </svg>
    ),
    Facebook: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
    ),
    Twitter: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
    ),
    Telegram: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
    ),
    Email: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
    ),
    Copy: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        </svg>
    ),
    Calendar: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
    ),
    Clock: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
    ),
    Location: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
    ),
    Close: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
        </svg>
    ),
    Share: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
        </svg>
    ),
    Info: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
    ),
    Gallery: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
    ),
    Check: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
        </svg>
    )
};

const socialLinks = [
    {
        name: 'WhatsApp',
        icon: Icons.WhatsApp,
        color: 'bg-green-500 hover:bg-green-600 text-white',
        getUrl: (eventUrl, eventTitle) => `https://wa.me/?text=${encodeURIComponent(eventTitle + ' ' + eventUrl)}`,
    },
    {
        name: 'Facebook',
        icon: Icons.Facebook,
        color: 'bg-blue-600 hover:bg-blue-700 text-white',
        getUrl: (eventUrl) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`,
    },
    {
        name: 'Twitter',
        icon: Icons.Twitter,
        color: 'bg-gray-900 hover:bg-black text-white',
        getUrl: (eventUrl, eventTitle) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(eventTitle)}`,
    },
    {
        name: 'Telegram',
        icon: Icons.Telegram,
        color: 'bg-blue-500 hover:bg-blue-600 text-white',
        getUrl: (eventUrl, eventTitle) => `https://t.me/share/url?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(eventTitle)}`,
    }
];

const EventsCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('todos');
    const [modalInfo, setModalInfo] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}data/events.json`);
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error cargando eventos:', error);
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

    // Cerrar modal con tecla Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setModalInfo(null);
                setCopied(false);
            }
        };

        if (modalInfo) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [modalInfo]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const isUpcoming = (dateString) => {
        const eventDate = new Date(dateString);
        const today = new Date();
        return eventDate >= today;
    };

    const filteredEvents = events.filter(event => {
        if (filter === 'proximos') return isUpcoming(event.date);
        if (filter === 'pasados') return !isUpcoming(event.date);
        return true;
    });

    const sortedEvents = filteredEvents.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });

    const getEventUrl = (event) => {
        return `${window.location.origin}${import.meta.env.BASE_URL}eventos#event-${event.id}`;
    };

    const handleCopyLink = async (event) => {
        try {
            await navigator.clipboard.writeText(getEventUrl(event));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Error al copiar enlace:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
                <p className="text-gray-600">Cargando eventos...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Filtros mejorados */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-1 bg-gray-100 rounded-full max-w-md mx-auto">
                {[
                    { key: 'todos', label: 'Todos' },
                    { key: 'proximos', label: 'Próximos' },
                    { key: 'pasados', label: 'Pasados' }
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setFilter(key)}
                        className={`flex-1 px-4 py-2 rounded-full transition-all duration-200 font-medium text-sm ${
                            filter === key
                                ? 'bg-black text-white shadow-lg'
                                : 'text-gray-600 hover:text-black hover:bg-gray-200'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Lista de eventos */}
            {sortedEvents.length === 0 ? (
                <div className="text-center py-16 px-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icons.Calendar />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No hay eventos {filter === 'todos' ? '' : filter}
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                        {filter === 'proximos'
                            ? 'Próximamente anunciaremos nuevos eventos. ¡Mantente atento!'
                            : 'No se encontraron eventos para mostrar'
                        }
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {sortedEvents.map((event, index) => (
                        <div
                            key={event.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                                isUpcoming(event.date) ? 'border-l-4 border-black' : 'opacity-90'
                            }`}
                            id={`event-${event.id}`}
                        >
                            {/* Imagen del evento */}
                            <div className="relative h-48 sm:h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                                {event.image ? (
                                    <img
                                        src={`${import.meta.env.BASE_URL}${event.image.replace(/^\//, '')}`}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Icons.Calendar />
                                        <span className="ml-2 text-gray-500 font-medium">{event.title}</span>
                                    </div>
                                )}

                                {/* Badge de estado mejorado */}
                                <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${
                                    isUpcoming(event.date)
                                        ? 'bg-green-100/90 text-green-800 border border-green-200'
                                        : 'bg-gray-100/90 text-gray-800 border border-gray-200'
                                }`}>
                                    {isUpcoming(event.date) ? '🎭 Próximo' : '✅ Finalizado'}
                                </div>
                            </div>

                            {/* Contenido del evento */}
                            <div className="p-6">
                                {/* Fecha y hora */}
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                                    <div className="flex items-center">
                                        <Icons.Calendar />
                                        <span className="ml-2 capitalize font-medium">{formatDate(event.date)}</span>
                                    </div>
                                    {event.time && (
                                        <div className="flex items-center">
                                            <Icons.Clock />
                                            <span className="ml-2 font-medium">{event.time}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Título */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    {event.title}
                                </h3>

                                {/* Descripción */}
                                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                                    {event.description}
                                </p>

                                {/* Ubicación */}
                                {event.location && (
                                    <div className="flex items-center text-sm text-gray-600 mb-6 p-3 bg-gray-50 rounded-lg">
                                        <Icons.Location />
                                        <span className="ml-2 font-medium">{event.location}</span>
                                    </div>
                                )}

                                {/* Botones de acción mejorados */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    {isUpcoming(event.date) ? (
                                        <>
                                            <button
                                                className="flex-1 flex items-center justify-center bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium text-sm shadow-lg hover:shadow-xl"
                                                onClick={() => setModalInfo({ type: 'info', event })}
                                            >
                                                <Icons.Info />
                                                <span className="ml-2">Más Información</span>
                                            </button>
                                            <button
                                                className="flex items-center justify-center px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all font-medium text-sm"
                                                onClick={() => setModalInfo({ type: 'share', event })}
                                            >
                                                <Icons.Share />
                                                <span className="ml-2 sm:hidden lg:inline">Compartir</span>
                                            </button>
                                        </>
                                    ) : (
                                        <a
                                            href={`${import.meta.env.BASE_URL}fotos-videos`}
                                            className="flex-1 flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm"
                                        >
                                            <Icons.Gallery />
                                            <span className="ml-2">Ver Galería</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* MODAL MEJORADO */}
            {modalInfo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Overlay con blur */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => { setModalInfo(null); setCopied(false); }}
                    ></div>

                    {/* Modal content */}
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Header del modal */}
                        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">
                                {modalInfo.type === 'info' ? 'Detalles del Evento' : 'Compartir Evento'}
                            </h2>
                            <button
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                onClick={() => { setModalInfo(null); setCopied(false); }}
                                aria-label="Cerrar"
                            >
                                <Icons.Close />
                            </button>
                        </div>

                        {/* Contenido scrolleable */}
                        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                            {modalInfo.type === 'info' && (
                                <div className="p-6">
                                    {/* Imagen del evento */}
                                    {modalInfo.event.image && (
                                        <div className="mb-6 rounded-xl overflow-hidden">
                                            <img
                                                src={`${import.meta.env.BASE_URL}${modalInfo.event.image.replace(/^\//, '')}`}
                                                alt={modalInfo.event.title}
                                                className="w-full h-64 sm:h-80 object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Información del evento */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                                {modalInfo.event.title}
                                            </h3>
                                            <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${
                                                isUpcoming(modalInfo.event.date)
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {isUpcoming(modalInfo.event.date) ? '🎭 Próximo Evento' : '✅ Evento Finalizado'}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                                <Icons.Calendar />
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-500">Fecha</p>
                                                    <p className="text-gray-900 font-semibold capitalize">
                                                        {formatDate(modalInfo.event.date)}
                                                    </p>
                                                </div>
                                            </div>

                                            {modalInfo.event.time && (
                                                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                                    <Icons.Clock />
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-500">Hora</p>
                                                        <p className="text-gray-900 font-semibold">
                                                            {modalInfo.event.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {modalInfo.event.location && (
                                                <div className="flex items-start p-4 bg-gray-50 rounded-xl sm:col-span-2">
                                                    <Icons.Location />
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-500">Ubicación</p>
                                                        <p className="text-gray-900 font-semibold">
                                                            {modalInfo.event.location}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h4>
                                            <p className="text-gray-700 leading-relaxed">
                                                {modalInfo.event.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Botones de acción */}
                                    <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                                        <button
                                            className="flex-1 flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium"
                                            onClick={() => setModalInfo({ type: 'share', event: modalInfo.event })}
                                        >
                                            <Icons.Share />
                                            <span className="ml-2">Compartir Evento</span>
                                        </button>
                                        <button
                                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all font-medium"
                                            onClick={() => setModalInfo(null)}
                                        >
                                            Cerrar
                                        </button>
                                    </div>
                                </div>
                            )}

                            {modalInfo.type === 'share' && (
                                <div className="p-6">
                                    {/* Header del evento a compartir */}
                                    <div className="text-center mb-8">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                            {modalInfo.event.image ? (
                                                <img
                                                    src={`${import.meta.env.BASE_URL}${modalInfo.event.image.replace(/^\//, '')}`}
                                                    alt={modalInfo.event.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Icons.Calendar />
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {modalInfo.event.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {formatDate(modalInfo.event.date)}
                                            {modalInfo.event.time && ` • ${modalInfo.event.time}`}
                                        </p>
                                    </div>

                                    {/* Botones de redes sociales */}
                                    <div className="space-y-4 mb-6">
                                        <h4 className="text-lg font-semibold text-gray-900 text-center mb-4">
                                            Compartir en redes sociales
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {socialLinks.map((social) => (
                                                <a
                                                    key={social.name}
                                                    href={social.getUrl(getEventUrl(modalInfo.event), modalInfo.event.title)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center justify-center px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${social.color}`}
                                                >
                                                    <social.icon />
                                                    <span className="ml-2">{social.name}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Copiar enlace */}
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                            O copia el enlace directo
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={getEventUrl(modalInfo.event)}
                                                readOnly
                                                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                            />
                                            <button
                                                onClick={() => handleCopyLink(modalInfo.event)}
                                                className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                                                    copied
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-black text-white hover:bg-gray-800'
                                                }`}
                                            >
                                                {copied ? <Icons.Check /> : <Icons.Copy />}
                                                <span className="ml-2 hidden sm:inline">
                                                    {copied ? '¡Copiado!' : 'Copiar'}
                                                </span>
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Perfecto para Instagram, TikTok o cualquier otra plataforma
                                        </p>
                                    </div>

                                    {/* Email compartir */}
                                    <div className="mt-4">
                                        <a
                                            href={`mailto:?subject=${encodeURIComponent(modalInfo.event.title)}&body=${encodeURIComponent(`¡Hola! Te comparto este evento de Peña BarrioFino:\n\n${modalInfo.event.title}\n\nFecha: ${formatDate(modalInfo.event.date)}${modalInfo.event.time ? `\nHora: ${modalInfo.event.time}` : ''}${modalInfo.event.location ? `\nUbicación: ${modalInfo.event.location}` : ''}\n\nMás información: ${getEventUrl(modalInfo.event)}`)}`}
                                            className="flex items-center justify-center w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium text-sm transition-colors"
                                        >
                                            <Icons.Email />
                                            <span className="ml-2">Compartir por Email</span>
                                        </a>
                                    </div>

                                    {/* Botón cerrar */}
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <button
                                            className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all font-medium"
                                            onClick={() => { setModalInfo(null); setCopied(false); }}
                                        >
                                            Cerrar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Sección informativa para administradores - mejorada */}
            <div className="mt-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl">💡</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            Panel de Administración
                        </h3>
                        <p className="text-gray-600">
                            Información para gestionar eventos
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Icons.Calendar />
                            <span className="ml-2">Archivo de eventos</span>
                        </h4>
                        <div className="space-y-3">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <code className="text-sm font-mono text-gray-800">/public/data/events.json</code>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Edita este archivo para añadir, modificar o eliminar eventos.
                                Los cambios se reflejarán automáticamente en la web tras recargar.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                            <Icons.Info />
                            <span className="ml-2">Estructura del evento</span>
                        </h4>
                        <pre className="bg-gray-50 p-4 rounded-lg text-xs font-mono overflow-x-auto text-gray-800 leading-relaxed">
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

                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start">
                        <span className="text-amber-600 mr-3 mt-0.5">⚠️</span>
                        <div className="text-sm text-amber-800">
                            <p className="font-semibold mb-1">Instrucciones importantes:</p>
                            <ul className="space-y-1 text-amber-700">
                                <li>• Las fechas deben estar en formato YYYY-MM-DD</li>
                                <li>• Las imágenes deben subirse a <code className="bg-amber-100 px-1 rounded">/public/assets/images/events/</code></li>
                                <li>• Cada evento debe tener un ID único</li>
                                <li>• La descripción admite texto plano (sin HTML)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsCalendar;