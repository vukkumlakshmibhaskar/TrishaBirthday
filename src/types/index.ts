
export interface MediaItem {
  id: number;
  src: string;
  alt: string;
  caption?: string;
  type: 'image' | 'video';
  albumName?: string;
}

export interface Album {
  id: number;
  name: string;
  mediaItems: MediaItem[];
}

export interface TimelineEventProps {
  date: string;
  title: string;
  description: string;
  imageSrc?: string;
}

export interface Message {
  id: number;
  author: string;
  content: string;
}
