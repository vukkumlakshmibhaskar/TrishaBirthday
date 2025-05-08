
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Image, Video, Upload, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MediaItem } from '@/types';
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

interface PhotoGalleryProps {
  photos: MediaItem[];
  onMediaUpdate?: (mediaItems: MediaItem[]) => void;
}

const PhotoGallery = ({ photos: initialPhotos, onMediaUpdate }: PhotoGalleryProps) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialPhotos);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [albumName, setAlbumName] = useState<string>("My Memories");
  const [mediaToDelete, setMediaToDelete] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Update mediaItems when initialPhotos change (from parent)
  useEffect(() => {
    setMediaItems(initialPhotos);
  }, [initialPhotos]);

  // Update album name in the UI if it's in the first mediaItem
  useEffect(() => {
    if (mediaItems.length > 0 && mediaItems[0].albumName) {
      setAlbumName(mediaItems[0].albumName);
    }
  }, [mediaItems]);

  const handleImageError = (photoId: number) => {
    setImageError(prev => ({ ...prev, [photoId]: true }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if (!files || files.length === 0) return;
    
    const newMediaItems: MediaItem[] = [];
    
    Array.from(files).forEach(file => {
      // Ensure we're using the correct 'image' | 'video' type
      const fileType = file.type.startsWith('video/') ? 'video' : 'image';
      const fileUrl = URL.createObjectURL(file);
      
      newMediaItems.push({
        id: Date.now() + Math.random(),
        src: fileUrl,
        alt: file.name,
        caption: file.name.split('.')[0],
        type: fileType,
        albumName: albumName
      });
    });
    
    const updatedMedia = [...mediaItems, ...newMediaItems];
    setMediaItems(updatedMedia);
    
    // Call the callback to update the parent component if it exists
    if (onMediaUpdate) {
      onMediaUpdate(updatedMedia);
    }
    
    toast({
      title: "Success!",
      description: `${files.length} file(s) added to your album.`
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteMedia = (media: MediaItem, event: React.MouseEvent) => {
    event.stopPropagation();
    setMediaToDelete(media);
  };

  const confirmDeleteMedia = () => {
    if (!mediaToDelete) return;
    
    const updatedMedia = mediaItems.filter(item => item.id !== mediaToDelete.id);
    setMediaItems(updatedMedia);
    
    // Call the callback to update the parent component if it exists
    if (onMediaUpdate) {
      onMediaUpdate(updatedMedia);
    }
    
    setMediaToDelete(null);
    
    toast({
      title: "Deleted Successfully",
      description: `The item has been removed from your album.`,
    });
  };

  const cancelDeleteMedia = () => {
    setMediaToDelete(null);
  };

  const handleAlbumNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setAlbumName(newName);
    
    // Update all mediaItems with the new album name
    const updatedItems = mediaItems.map(item => ({
      ...item,
      albumName: newName
    }));
    
    setMediaItems(updatedItems);
    
    // Call the callback to update the parent component if it exists
    if (onMediaUpdate) {
      onMediaUpdate(updatedItems);
    }
  };
  
  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <input
            type="text"
            value={albumName}
            onChange={handleAlbumNameChange}
            className="bg-transparent border-b-2 border-birthday-purple text-2xl font-bold text-birthday-purple mb-2 focus:outline-none focus:border-birthday-pink"
            aria-label="Album name"
          />
          <p className="text-gray-600 text-sm">
            {mediaItems.length} items in this album
          </p>
        </div>
        
        <div className="flex">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
          />
          <Button 
            onClick={triggerFileInput}
            className="birthday-btn flex items-center gap-2"
          >
            <Upload size={16} />
            Add Photos & Videos
          </Button>
        </div>
      </div>
      
      {mediaItems.length === 0 ? (
        <div 
          className="border-2 border-dashed border-birthday-light rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:border-birthday-purple transition-colors"
          onClick={triggerFileInput}
        >
          <Plus size={48} className="text-birthday-purple mb-4" />
          <p className="text-gray-600 mb-2">Your album is empty</p>
          <p className="text-birthday-purple font-medium">Click to add photos and videos</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaItems.map((media) => (
            <Card 
              key={media.id}
              className="overflow-hidden cursor-pointer hover:-translate-y-1 transition-all relative group"
              onClick={() => setSelectedMedia(media)}
            >
              <div className="aspect-square overflow-hidden relative">
                {media.type === 'video' ? (
                  <div className="w-full h-full">
                    <video
                      src={media.src}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(media.id)}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-50 rounded-full p-2">
                        <Video className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  imageError[media.id] ? (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <Image className="w-12 h-12 text-muted-foreground" />
                      <span className="sr-only">{media.alt}</span>
                    </div>
                  ) : (
                    <img 
                      src={media.src} 
                      alt={media.alt}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      onError={() => handleImageError(media.id)}
                      loading="lazy"
                    />
                  )
                )}
                
                {/* Delete button */}
                <button
                  onClick={(e) => handleDeleteMedia(media, e)}
                  className="absolute top-2 right-2 bg-white bg-opacity-75 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-100"
                  aria-label="Delete media"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
              {media.caption && (
                <div className="p-2 text-sm text-center text-gray-600 truncate">
                  {media.caption}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!mediaToDelete} onOpenChange={() => !mediaToDelete && setMediaToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this item from your album.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteMedia}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteMedia}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Media Viewer Modal */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div 
            className="bg-white rounded-xl overflow-hidden max-w-4xl w-full animate-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full">
              {selectedMedia.type === 'video' ? (
                <video 
                  src={selectedMedia.src} 
                  className="w-full object-contain max-h-[80vh]"
                  controls
                  autoPlay
                />
              ) : (
                !imageError[selectedMedia.id] ? (
                  <img 
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    className="w-full object-contain max-h-[80vh]"
                    onError={() => handleImageError(selectedMedia.id)}
                  />
                ) : (
                  <div className="w-full h-[50vh] flex items-center justify-center bg-muted">
                    <Image className="w-24 h-24 text-muted-foreground" />
                    <span className="sr-only">{selectedMedia.alt}</span>
                  </div>
                )
              )}
            </div>
            {selectedMedia.caption && (
              <div className="p-4 text-center">
                <p className="text-lg font-medium">{selectedMedia.caption}</p>
              </div>
            )}
            <button 
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
              onClick={() => setSelectedMedia(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
