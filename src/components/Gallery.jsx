import { useState, useEffect } from 'react';

const Gallery = () => {
    const [activeTab, setActiveTab] = useState('fotos');
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [galleryAlbums, setGalleryAlbums] = useState([]);

    // Cargar datos reales desde gallery.json
    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}data/gallery.json`)
            .then(res => res.json())
            .then(data => {
                setGalleryAlbums(data.albums || []);
            });
    }, []);

    // Agrupar álbumes por tipo
    const fotosAlbums = galleryAlbums.filter(a => a.type === 'fotos');
    const videosAlbums = galleryAlbums.filter(a => a.type === 'videos');

    const resolveImagePath = (path) => `${import.meta.env.BASE_URL}${path}`;

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

            {/* Fotos por álbum */}
            {activeTab === 'fotos' && fotosAlbums.length > 0 && (
                fotosAlbums.map(album => (
                    <div key={album.name} className="mb-12">
                        <h2 className="text-xl font-bold mb-4 text-black capitalize">{album.name.replace(/_/g, ' ')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {album.items.map((foto, index) => (
                                <div
                                    key={foto.id}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                    className="group cursor-pointer"
                                    onClick={() => openLightbox(foto)}
                                >
                                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                                        <img src={resolveImagePath(foto.src)} alt={foto.alt} className="h-64 w-full object-cover" />
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
                    </div>
                ))
            )}

            {/* Vídeos por álbum */}
            {activeTab === 'videos' && videosAlbums.length > 0 && (
                videosAlbums.map(album => (
                    <div key={album.name} className="mb-12">
                        <h2 className="text-xl font-bold mb-4 text-black capitalize">{album.name.replace(/_/g, ' ')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {album.items.map((video, index) => (
                                <div
                                    key={video.id}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                    className="group cursor-pointer"
                                    onClick={() => openLightbox(video)}
                                >
                                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                                        <img src={resolveImagePath(video.poster)} alt={video.title} className="h-48 w-full object-cover" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-black bg-opacity-70 rounded-full flex items-center justify-center group-hover:bg-opacity-90 transition-colors">
                                                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                            {video.duration}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-black mb-1">{video.title}</h3>
                                        <p className="text-sm text-gray-600">{video.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
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
                                <img src={selectedMedia.src} alt={selectedMedia.alt} className="h-96 w-full object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{selectedMedia.title}</h3>
                                    <p className="text-gray-600">{selectedMedia.year}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg overflow-hidden">
                                <video src={selectedMedia.src} poster={selectedMedia.poster} controls className="h-96 w-full object-cover" />
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
