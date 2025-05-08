
import { MediaItem, TimelineEventProps, Message } from '@/types';

// Set your friend's birthday here
export const BIRTHDAY_DATE = new Date('2025-05-28'); // Update with your friend's birthday

// Default friend's name - update with your friend's name
export const FRIEND_NAME = "Trisha";

// Sample photos for the gallery
export const samplePhotos: MediaItem[] = [
  
];

// Timeline events
export const timelineEvents: TimelineEventProps[] = [
  {
    date: '2025',
    title: 'How We Met',
    description: 'In colors Our friendship get started',
    imageSrc: '/32 (29) - Copy.jpg'
  },
  {
    date: '2025',
    title: 'Fairwell',
    description: 'you gave me a photo frame',
    imageSrc: '/27 - Copy.jpg'
  },
  {
    date: '2025',
    title: 'Fairwell',
    description: 'Our Bond becomes more stronger',
    imageSrc: '/18 - Copy.jpg'
  },
  {
    date: '2025',
    title: "Signature Day",
    description: 'Final day Clg, we me you at the late time in college',
    imageSrc: '/16 - Copy.jpg'
  }
];

// Birthday messages
export const birthdayMessages: Message[] = [
  {
    id: 1,
    author: 'Your Best Friend',
    content: "Happy birthday to the most amazing person I know! You've been there through thick and thin, and I'm so grateful for your friendship. Here's to many more years of adventures together!"
  },
  {
    id: 2,
    author: 'Mom',
    content: "Happy birthday sweetie! We're so proud of the wonderful person you've become. Enjoy your special day!"
  },
  {
    id: 3,
    author: 'Alex',
    content: "HBD! Remember that time we got lost on the way to the concert? Good times! Have an awesome birthday!"
  },
  {
    id: 4,
    author: 'The Whole Gang',
    content: "HAPPY BIRTHDAY!! We all love you so much and can't wait to celebrate with you this weekend!"
  }
];
