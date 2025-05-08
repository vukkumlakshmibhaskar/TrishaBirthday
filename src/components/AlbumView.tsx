
import { useState } from 'react';
import { Album } from '@/types';
import { Card } from '@/components/ui/card';
import { Folder, FolderPlus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PhotoGallery from '@/components/PhotoGallery';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlbumViewProps {
  albums: Album[];
  onSelectAlbum: (albumId: number | null) => void;
  selectedAlbumId: number | null;
  onCreateAlbum: () => void;
  onUpdateAlbum: (updatedAlbum: Album) => void;
  onDeleteAlbum?: (albumId: number) => void;
}

const AlbumView = ({ 
  albums, 
  onSelectAlbum, 
  selectedAlbumId, 
  onCreateAlbum,
  onUpdateAlbum,
  onDeleteAlbum
}: AlbumViewProps) => {
  const [albumToDelete, setAlbumToDelete] = useState<Album | null>(null);
  const { toast } = useToast();
  const selectedAlbum = albums.find(album => album.id === selectedAlbumId);

  const handleDeleteAlbum = (album: Album, event: React.MouseEvent) => {
    event.stopPropagation();
    setAlbumToDelete(album);
  };

  const confirmDeleteAlbum = () => {
    if (!albumToDelete || !onDeleteAlbum) return;
    
    onDeleteAlbum(albumToDelete.id);
    setAlbumToDelete(null);
    
    toast({
      title: "Album Deleted",
      description: `"${albumToDelete.name}" album has been deleted.`,
    });
  };

  if (selectedAlbum) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center mb-4">
          <Button 
            variant="outline" 
            onClick={() => onSelectAlbum(null)}
            className="mr-4"
          >
            Back to Albums
          </Button>
          <h2 className="text-2xl font-bold text-birthday-purple">{selectedAlbum.name}</h2>
        </div>

        <PhotoGallery 
          photos={selectedAlbum.mediaItems} 
          onMediaUpdate={(updatedMedia) => {
            const updatedAlbum = {
              ...selectedAlbum,
              mediaItems: updatedMedia.map(item => ({
                ...item,
                albumName: selectedAlbum.name
              }))
            };
            onUpdateAlbum(updatedAlbum);
          }}
        />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-birthday-purple">My Albums</h2>
        <Button onClick={onCreateAlbum} className="birthday-btn flex items-center gap-2">
          <Plus size={16} />
          New Album
        </Button>
      </div>
      
      {albums.length === 0 ? (
        <div 
          className="border-2 border-dashed border-birthday-light rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:border-birthday-purple transition-colors"
          onClick={onCreateAlbum}
        >
          <FolderPlus size={48} className="text-birthday-purple mb-4" />
          <p className="text-gray-600 mb-2">No albums yet</p>
          <p className="text-birthday-purple font-medium">Click to create your first album</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums.map((album) => (
            <Card 
              key={album.id}
              className="overflow-hidden cursor-pointer hover:-translate-y-1 transition-all p-4 group relative"
              onClick={() => onSelectAlbum(album.id)}
            >
              <div className="aspect-square flex items-center justify-center bg-gray-100 rounded-lg mb-3">
                <Folder size={64} className="text-birthday-purple opacity-60" />
                {album.mediaItems.length > 0 && (
                  <div className="absolute bottom-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium">
                    {album.mediaItems.length} items
                  </div>
                )}
                
                {/* Delete album button */}
                <button
                  onClick={(e) => handleDeleteAlbum(album, e)}
                  className="absolute top-2 right-2 bg-white bg-opacity-75 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Delete ${album.name} album`}
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
              <div className="text-center">
                <h3 className="font-medium text-birthday-purple truncate">{album.name}</h3>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!albumToDelete} onOpenChange={() => !albumToDelete && setAlbumToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Album</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{albumToDelete?.name}"? This will permanently remove all photos and videos in this album.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAlbumToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteAlbum}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete Album
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AlbumView;
