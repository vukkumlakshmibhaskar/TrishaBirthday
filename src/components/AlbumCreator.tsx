
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { Album } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AlbumCreatorProps {
  onAlbumCreate: (album: Album) => void;
}

const AlbumCreator = ({ onAlbumCreate }: AlbumCreatorProps) => {
  const [albumName, setAlbumName] = useState<string>('');
  const { toast } = useToast();

  const handleCreateAlbum = () => {
    if (!albumName.trim()) {
      toast({
        title: "Album name required",
        description: "Please enter a name for your album",
        variant: "destructive"
      });
      return;
    }

    const newAlbum: Album = {
      id: Date.now(),
      name: albumName,
      mediaItems: []
    };

    onAlbumCreate(newAlbum);
    setAlbumName('');

    toast({
      title: "Album created",
      description: `Album "${albumName}" has been created successfully`,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreateAlbum();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-birthday-purple">Create New Album</h3>
      <div className="flex gap-3">
        <Input
          placeholder="Enter album name"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow"
        />
        <Button 
          onClick={handleCreateAlbum}
          className="birthday-btn flex items-center gap-2"
        >
          <Plus size={16} />
          Create Album
        </Button>
      </div>
    </div>
  );
};

export default AlbumCreator;
