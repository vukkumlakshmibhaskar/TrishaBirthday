
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';

interface MusicPlayerProps {
  audioSrc: string;
  triggerConfetti?: () => void;
  autoPlay?: boolean;
}

const MusicPlayer = ({ audioSrc, triggerConfetti, autoPlay = false }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    setAudioElement(audio);
    
    // Set up event listeners
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
    
    // Clean up on unmount
    return () => {
      audio.pause();
      audio.removeEventListener('ended', () => {
        setIsPlaying(false);
      });
    };
  }, [audioSrc]);
  
  // Auto-play handling
  useEffect(() => {
    if (audioRef.current && autoPlay) {
      const playPromise = audioRef.current.play();
      
      // Handle the play promise to avoid errors
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            if (triggerConfetti) triggerConfetti();
          })
          .catch((error) => {
            console.log("Autoplay prevented by browser:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [audioRef.current, autoPlay, triggerConfetti]);

  const togglePlay = () => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioElement.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            if (triggerConfetti) triggerConfetti();
          })
          .catch(error => {
            console.log("Play prevented by browser:", error);
          });
      }
    }
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  return (
    <div 
      className={`fixed bottom-4 right-4 z-30 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-50'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsVisible(false)}
    >
      <button
        className="bg-white rounded-full p-3 shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <Pause className="h-6 w-6 text-birthday-purple" />
        ) : (
          <Play className="h-6 w-6 text-birthday-purple" />
        )}
        <Music className="h-4 w-4 ml-2 text-birthday-pink" />
      </button>
    </div>
  );
};

export default MusicPlayer;
