
import { useState, useEffect } from 'react';
import PhotoGallery from '@/components/PhotoGallery';
import { Album, MediaItem } from '@/types';
import AlbumCreator from '@/components/AlbumCreator';
import AlbumView from '@/components/AlbumView';

interface GallerySectionProps {
  photos: MediaItem[];
}

const GallerySection = ({ photos }: GallerySectionProps) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [isCreatingAlbum, setIsCreatingAlbum] = useState<boolean>(false);

  // Load albums from localStorage when component mounts
  useEffect(() => {
    const savedAlbums = localStorage.getItem('birthday_albums');
    if (savedAlbums) {
      setAlbums(JSON.parse(savedAlbums));
    }
  }, []);

  // Save albums to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('birthday_albums', JSON.stringify(albums));
  }, [albums]);

  const handleAlbumCreate = (newAlbum: Album) => {
    setAlbums(prev => [...prev, newAlbum]);
    setIsCreatingAlbum(false);
  };

  const handleUpdateAlbum = (updatedAlbum: Album) => {
    setAlbums(albums.map(album => 
      album.id === updatedAlbum.id ? updatedAlbum : album
    ));
  };

  const handleDeleteAlbum = (albumId: number) => {
    setAlbums(albums.filter(album => album.id !== albumId));
    // If the deleted album was selected, reset selection
    if (selectedAlbumId === albumId) {
      setSelectedAlbumId(null);
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-birthday-purple">
          Create Your Memory Albums
        </h2>
        <p className="text-gray-600 mt-2">
          Upload photos and videos from your device to create beautiful memories
        </p>
      </div>

      {isCreatingAlbum ? (
        <div className="bg-white rounded-lg border p-6 mb-8 shadow-sm animate-fade-in">
          <AlbumCreator onAlbumCreate={handleAlbumCreate} />
          <div className="mt-4 flex justify-end">
            <button 
              onClick={() => setIsCreatingAlbum(false)}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <AlbumView 
        albums={albums} 
        selectedAlbumId={selectedAlbumId}
        onSelectAlbum={setSelectedAlbumId}
        onCreateAlbum={() => setIsCreatingAlbum(true)}
        onUpdateAlbum={handleUpdateAlbum}
        onDeleteAlbum={handleDeleteAlbum}
      />
    </>
  );
};

export default GallerySection;
