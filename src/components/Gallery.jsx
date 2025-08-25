import { useState, useEffect } from 'react';

const Gallery = () => {
    const [activeTab, setActiveTab] = useState('fotos');
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [galleryData, setGalleryData] = useState({ fotos: [], videos: [] });

    // Simular datos de la galería - En producción, esto vendría de archivos JSON o API
    useEffect(() => {
        // Aquí cargarías los datos reales desde /public/data/gallery.json
        const mockData = {
            fotos: [
                {
                    id: 1,
                    src: '/assets/images/gallery/foto1.jpg',
                    alt: 'Desfile Carnaval 2024',
                    title: 'Desfile Principal',
                    year: '2024'
                },
                {
                    id: 2,
                    src: '/assets/images/gallery/foto2.jpg',
                    alt: 'Ensayo General',
                    title: 'Ensayo General',
                    year: '2024'
                },
                {
                    id: 3,
                    src: '/assets/images/gallery/foto3.jpg',
                    alt: 'Concurso Regional',
                    title: 'Concurso Regional',
                    year: '2023'
                },
                {
                    id: 4,
                    src: '/assets/images/gallery/foto4.jpg',
                    alt: 'Actuación Especial',
                    title: 'Actuación Especial',
                    year: '2023'
                },
                {
                    id: 5,
                    src: '/assets/images/gallery/foto5.jpg',
                    alt: 'Premio Mejor Comparsa',
                    title: 'Premio Mejor Comparsa',
                    year: '2023'
                },
                {
                    id: 6,
                    src: '/assets/images/gallery/foto6.jpg',
                    alt: 'Ensayo Nocturno',
                    title: 'Ensayo Nocturno',
                    year: '2024'
                }
            ],
            videos: [
                {
                    id: 1,
                    src: '/assets/videos/desfile-2024.mp4',
                    poster: '/assets/images/video-thumbs/desfile-2024.jpg',
                    title: 'Desfile Carnaval 2024',
                    duration: '3:45',
                    year: '2024'
                },
                {
                    id: 2,
                    src: '/assets/videos/ensayo-general.mp4',
                    poster: '/assets/images/video-thumbs/ensayo.jpg',
                    title: 'Ensayo General Abierto',
                    duration: '2:30',
                    year: '2024'
                },
                {
                    id: 3,
                    src: '/assets/videos/concurso-2023.mp4',
                    poster: '/assets/images/video-thumbs/concurso.jpg',
                    title: 'Actuación Concurso 2023',
                    duration: '4:20',
                    year: '2023'
                }
            ]
        };
        setGalleryData(mockData);
    }, []);

    const openLightbox = (media) => {
        setSelectedMedia(media);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedMedia(null);
        document.body.style.overflow = 'unset';
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    };

    useEffect(() => {
        if (selectedMedia) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [selectedMedia]);

    return (
        <>
            {/* Tabs */}
            <div className="flex justify-center mb-8">
                <div className="bg-gray-100 rounded-lg p-1 flex">
                    <button
                        onClick={() => setActiveTab('fotos')}
                        className={`px-6 py-2 rounded-md transition-colors font-medium ${
                            activeTab === 'fotos'
                                ? 'bg-black text-white'
                                : 'text-gray-600 hover:text-black'
                        }`}
                    >
                        Fotografías
                    </button>
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`px-6 py-2 rounded-md transition-colors font-medium ${
                            activeTab === 'videos'
                                ? 'bg-black text-white'
                                : 'text-gray-600 hover:text-black'
                        }`}
                    >
                        Vídeos
                    </button>
                </div>
            </div>

            {/* Photos Grid */}
            {activeTab === 'fotos' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryData.fotos.map((foto, index) => (
                        <div
                            key={foto.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="group cursor-pointer"
                            onClick={() => openLightbox(foto)}
                        >
                            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                                {/* Placeholder para imagen real */}
                                <div className="h-64 bg-gray-300 flex items-center justify-center">
                                    <span className="text-gray-500">{foto.alt}</span>
                                </div>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                        <div className="bg-white rounded-lg p-4 text-center">
                                            <h3 className="font-semibold text-black">{foto.title}</h3>
                                            <p className="text-sm text-gray-600">{foto.year}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Videos Grid */}
            {activeTab === 'videos' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryData.videos.map((video, index) => (
                        <div
                            key={video.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="group cursor-pointer"
                            onClick={() => openLightbox(video)}
                        >
                            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                                {/* Video thumbnail placeholder */}
                                <div className="h-48 bg-gray-300 flex items-center justify-center relative">
                                    <span className="text-gray-500">{video.title}</span>

                                    {/* Play button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-black bg-opacity-70 rounded-full flex items-center justify-center group-hover:bg-opacity-90 transition-colors">
                                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                        {video.duration}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-black mb-1">{video.title}</h3>
                                    <p className="text-sm text-gray-600">{video.year}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            {selectedMedia && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
                    onClick={closeLightbox}
                >
                    <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
                        {/* Close button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Media content */}
                        {activeTab === 'fotos' ? (
                            <div className="bg-white rounded-lg overflow-hidden max-h-[80vh]">
                                <div className="h-96 bg-gray-300 flex items-center justify-center">
                                    <span className="text-gray-500">{selectedMedia.alt}</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{selectedMedia.title}</h3>
                                    <p className="text-gray-600">{selectedMedia.year}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg overflow-hidden">
                                <div className="h-96 bg-gray-800 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                                        </svg>
                                        <p>Reproductor de video</p>
                                        <p className="text-sm text-gray-400">{selectedMedia.title}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{selectedMedia.title}</h3>
                                    <div className="flex items-center gap-4 text-gray-600">
                                        <span>{selectedMedia.year}</span>
                                        <span>•</span>
                                        <span>{selectedMedia.duration}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Gallery;