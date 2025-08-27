import { useState, useEffect } from 'react';

const Gallery = () => {
    const [activeTab, setActiveTab] = useState('fotos');
    const [selectedAlbum, setSelectedAlbum] = useState('all');
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [galleryAlbums, setGalleryAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Load gallery data
    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}data/gallery.json`)
            .then(res => res.json())
            .then(data => {
                setGalleryAlbums(data.albums || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading gallery data:', error);
                setLoading(false);
            });
    }, []);

    // Format album name for display
    const formatAlbumName = (name) => {
        return name
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())
            .replace(/De /g, 'de ')
            .replace(/Del /g, 'del ');
    };

    // Get albums by type
    const fotosAlbums = galleryAlbums.filter(a => a.type === 'fotos');
    const videosAlbums = galleryAlbums.filter(a => a.type === 'videos');

    // Get current albums based on active tab
    const currentAlbums = activeTab === 'fotos' ? fotosAlbums : videosAlbums;

    // Get filtered items
    const getFilteredItems = () => {
        if (selectedAlbum === 'all') {
            return currentAlbums.flatMap(album =>
                album.items.map(item => ({ ...item, albumName: album.name }))
            );
        } else {
            const album = currentAlbums.find(a => a.name === selectedAlbum);
            return album ? album.items.map(item => ({ ...item, albumName: album.name })) : [];
        }
    };

    const filteredItems = getFilteredItems();

    const openLightbox = (media, index = 0) => {
        setSelectedMedia(media);
        setCurrentImageIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedMedia(null);
        document.body.style.overflow = 'unset';
    };

    const navigateImage = (direction) => {
        if (!selectedMedia || activeTab === 'videos') return;

        const newIndex = currentImageIndex + direction;
        if (newIndex >= 0 && newIndex < filteredItems.length) {
            setCurrentImageIndex(newIndex);
            setSelectedMedia(filteredItems[newIndex]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            navigateImage(1);
        } else if (e.key === 'ArrowLeft') {
            navigateImage(-1);
        }
    };

    useEffect(() => {
        if (selectedMedia) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [selectedMedia, currentImageIndex]);

    // Reset album selection when changing tabs
    useEffect(() => {
        setSelectedAlbum('all');
    }, [activeTab]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Main Navigation Tabs */}
            <div className="flex justify-center mb-12">
                <div className="bg-gray-100 rounded-2xl p-1.5 flex shadow-inner">
                    <button
                        onClick={() => setActiveTab('fotos')}
                        className={`px-8 py-3 rounded-xl transition-all duration-300 font-semibold flex items-center space-x-2 ${
                            activeTab === 'fotos'
                                ? 'bg-white text-black shadow-lg transform scale-105'
                                : 'text-gray-600 hover:text-black hover:bg-gray-50'
                        }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Fotografías ({fotosAlbums.reduce((acc, album) => acc + album.items.length, 0)})</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`px-8 py-3 rounded-xl transition-all duration-300 font-semibold flex items-center space-x-2 ${
                            activeTab === 'videos'
                                ? 'bg-white text-black shadow-lg transform scale-105'
                                : 'text-gray-600 hover:text-black hover:bg-gray-50'
                        }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Vídeos ({videosAlbums.reduce((acc, album) => acc + album.items.length, 0)})</span>
                    </button>
                </div>
            </div>

            {/* Album Filter */}
            {currentAlbums.length > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mb-8 sm:gap-3 sm:mb-12">
                    <button
                        onClick={() => setSelectedAlbum('all')}
                        className={`px-4 py-2 rounded-full transition-all duration-300 text-xs font-medium ${
                            selectedAlbum === 'all'
                                ? 'bg-black text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black'
                        } sm:px-6 sm:py-2.5 sm:text-sm`}
                    >
                        Todos los álbumes
                    </button>
                    {currentAlbums.map(album => (
                        <button
                            key={album.name}
                            onClick={() => setSelectedAlbum(album.name)}
                            className={`px-4 py-2 rounded-full transition-all duration-300 text-xs font-medium whitespace-nowrap ${
                                selectedAlbum === album.name
                                    ? 'bg-black text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black'
                            } sm:px-6 sm:py-2.5 sm:text-sm`}
                        >
                            {formatAlbumName(album.name)} ({album.items.length})
                        </button>
                    ))}
                </div>
            )}

            {/* Gallery Grid */}
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item, index) => (
                        <div
                            key={`${item.albumName}-${item.id}`}
                            className="group cursor-pointer"
                            onClick={() => openLightbox(item, index)}
                        >
                            <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-[1.02] bg-white">
                                {/* Image/Video Thumbnail */}
                                <div className="aspect-square relative overflow-hidden">
                                    <img
                                        src={activeTab === 'videos' ? item.poster : item.src}
                                        alt={item.alt}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />

                                    {/* Video Play Button */}
                                    {activeTab === 'videos' && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                                            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300">
                                                <svg className="w-7 h-7 text-black ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    )}

                                    {/* Video Duration Badge */}
                                    {activeTab === 'videos' && item.duration && (
                                        <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded-full font-medium">
                                            {item.duration}
                                        </div>
                                    )}

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <h3 className="font-semibold text-sm truncate mb-1">
                                                {formatAlbumName(item.albumName)}
                                            </h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-300">{item.year}</span>
                                                <div className="flex items-center space-x-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    <span className="text-xs">Ver</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Info */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 truncate text-sm mb-1">
                                        {formatAlbumName(item.albumName)}
                                    </h3>
                                    <p className="text-xs text-gray-500 flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {item.year}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No hay contenido disponible
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Actualmente no hay {activeTab === 'fotos' ? 'fotografías' : 'vídeos'} en esta sección. Pronto añadiremos nuevo contenido.
                    </p>
                </div>
            )}

            {/* Advanced Lightbox */}
            {selectedMedia && (
                <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
                    <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="fixed top-20 right-6 z-50 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Navigation Arrows */}
                        {activeTab === 'fotos' && filteredItems.length > 1 && (
                            <>
                                <button
                                    onClick={() => navigateImage(-1)}
                                    disabled={currentImageIndex === 0}
                                    className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-30 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => navigateImage(1)}
                                    disabled={currentImageIndex === filteredItems.length - 1}
                                    className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-30 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Media Content */}
                        <div className="w-full h-full flex items-center justify-center">
                            {activeTab === 'fotos' ? (
                                <div className="max-w-full max-h-full flex flex-col items-center">
                                    <img
                                        src={selectedMedia.src}
                                        alt={selectedMedia.alt}
                                        className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                    />
                                    <div className="mt-6 text-center text-white">
                                        <h3 className="text-xl font-semibold mb-2">
                                            {formatAlbumName(selectedMedia.albumName)}
                                        </h3>
                                        <div className="flex items-center justify-center space-x-6 text-gray-300">
                                            <span className="flex items-center space-x-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>{selectedMedia.year}</span>
                                            </span>
                                            {filteredItems.length > 1 && (
                                                <span className="flex items-center space-x-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span>{currentImageIndex + 1} de {filteredItems.length}</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="max-w-full max-h-full flex flex-col items-center">
                                    <video
                                        src={selectedMedia.src}
                                        poster={selectedMedia.poster}
                                        controls
                                        className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                        autoPlay
                                    />
                                    <div className="mt-6 text-center text-white">
                                        <h3 className="text-xl font-semibold mb-2">
                                            {formatAlbumName(selectedMedia.albumName)}
                                        </h3>
                                        <div className="flex items-center justify-center space-x-6 text-gray-300">
                                            <span className="flex items-center space-x-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>{selectedMedia.year}</span>
                                            </span>
                                            {selectedMedia.duration && (
                                                <span className="flex items-center space-x-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{selectedMedia.duration}</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Click outside to close */}
                    <div
                        className="absolute inset-0 -z-10"
                        onClick={closeLightbox}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default Gallery;