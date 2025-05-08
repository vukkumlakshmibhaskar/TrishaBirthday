
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface HomeSectionProps {
  friendName: string;
  onNavigate: (section: string) => void;
  triggerConfetti: () => void;
}

const HomeSection = ({ friendName, onNavigate, triggerConfetti }: HomeSectionProps) => {
  const handleExploreClick = () => {
    onNavigate('gallery');
    triggerConfetti();
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8">
      <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-birthday-gold animate-pulse-glow">
        <img 
          src="/1.jpg" 
          alt={`${friendName}'s photo`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-2xl space-y-4">
        <h2 className="text-3xl font-bold text-birthday-purple">
          Today is all about YOU!
        </h2>
        <p className="text-xl text-gray-700">
          This little website is my gift to you - a collection of our favorite memories and messages from people who love you. Enjoy exploring!
        </p>
        
        <Button 
          className="birthday-btn mt-6"
          onClick={handleExploreClick}
        >
          Start Your Birthday Journey
        </Button>
      </div>
    </div>
  );
};

export default HomeSection;
