const fs = require('fs');
const path = require('path');

const galleryPath = path.join(__dirname, '../assets/images/gallery');
const videosPath = path.join(__dirname, '../assets/videos');
const thumbsPath = path.join(__dirname, '../assets/images/video-thumbs');
const outputPath = path.join(__dirname, 'gallery.json');

function getAlbums(dir) {
    return fs.readdirSync(dir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);
}

function getImages(albumDir, albumName) {
    const files = fs.readdirSync(albumDir);
    return files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).map((file, idx) => ({
        src: `/barriofino_web/assets/images/gallery/${albumName}/${file}`,
        alt: file,
        title: file,
        year: albumName.match(/\d{4}/) ? albumName.match(/\d{4}/)[0] : '',
        id: idx + 1
    }));
}

function getVideos(albumDir, albumName) {
    const files = fs.readdirSync(albumDir);
    return files.filter(f => /\.(mp4)$/i.test(f)).map((file, idx) => {
        const thumb = `/barriofino_web/assets/images/video-thumbs/${albumName}/${file.replace(/\.mp4$/, '.jpg')}`;
        return {
            src: `/barriofino_web/assets/videos/${albumName}/${file}`,
            poster: thumb,
            title: file,
            year: albumName.match(/\d{4}/) ? albumName.match(/\d{4}/)[0] : '',
            duration: '',
            id: idx + 1
        };
    });
}

function main() {
    const albums = [];
    // Fotos
    if (fs.existsSync(galleryPath)) {
        getAlbums(galleryPath).forEach(albumName => {
            const albumDir = path.join(galleryPath, albumName);
            const items = getImages(albumDir, albumName);
            if (items.length > 0) {
                albums.push({ name: albumName, type: 'fotos', items });
            }
        });
    }
    // Videos
    if (fs.existsSync(videosPath)) {
        getAlbums(videosPath).forEach(albumName => {
            const albumDir = path.join(videosPath, albumName);
            const items = getVideos(albumDir, albumName);
            if (items.length > 0) {
                albums.push({ name: albumName, type: 'videos', items });
            }
        });
    }
    fs.writeFileSync(outputPath, JSON.stringify({ albums }, null, 2));
    console.log('gallery.json generado correctamente.');
}

main();
