
import { useEffect, useState, useRef } from 'react';
import ConfettiEffect from '@/components/ConfettiEffect';
import TimelineSection from '@/components/TimelineSection';
import MessageSection from '@/components/MessageSection';
import MusicPlayer from '@/components/MusicPlayer';
import PaperBlast from '@/components/PaperBlast';
import MainNavigation from '@/components/MainNavigation';
import HomeSection from '@/components/HomeSection';
import GallerySection from '@/components/GallerySection';
import CountdownSection from '@/components/CountdownSection';
import { TabsContent } from '@/components/ui/tabs';
import { BIRTHDAY_DATE, FRIEND_NAME, samplePhotos, timelineEvents, birthdayMessages } from '@/config/sampleData';

const Index = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const paperBlastRef = useRef<HTMLInputElement>(null);
  const [autoPlayMusic, setAutoPlayMusic] = useState(true);
  
  // Trigger paper blast animation
  const triggerPaperBlast = () => {
    if (paperBlastRef.current) {
      const triggerFn = paperBlastRef.current.dataset.trigger;
      if (triggerFn && typeof window !== 'undefined') {
        // Execute the function reference stored in the data attribute
        (window as unknown)[triggerFn]?.();
      }
    }
  };
  
  // Handle confetti effect
  const triggerConfetti = () => {
    setShowConfetti(true);
    triggerPaperBlast();
    setTimeout(() => setShowConfetti(false), 4000);
  };
  
  useEffect(() => {
    // Store the trigger function in window for reference
    if (typeof window !== 'undefined' && paperBlastRef.current) {
      const triggerElement = document.getElementById('paper-blast-trigger');
      if (triggerElement) {
        const triggerFnName = 'triggerPaperBlast' + Date.now();
        (window as unknown)[triggerFnName] = triggerElement.dataset.trigger;
        paperBlastRef.current.dataset.trigger = triggerFnName;
      }
    }
  
    // Show confetti when the page loads
    setShowConfetti(true);
    
    // Stop confetti after 8 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pb-12">
      {showConfetti && <ConfettiEffect />}
      <PaperBlast />
      <MusicPlayer 
        audioSrc="/Birthday.mp3" 
        triggerConfetti={triggerConfetti}
        autoPlay={autoPlayMusic}
      />
      
      <header className="pt-12 pb-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-birthday-purple to-birthday-pink inline-block text-transparent bg-clip-text">
          Happy Birthday, {FRIEND_NAME}!
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          A special celebration for a special friend
        </p>
      </header>
      
      <MainNavigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      >
        <TabsContent value="home" className="mt-0">
          <HomeSection 
            friendName={FRIEND_NAME} 
            onNavigate={setActiveSection}
            triggerConfetti={triggerConfetti} 
          />
        </TabsContent>
        
        <TabsContent value="gallery" className="mt-0">
          <GallerySection photos={samplePhotos} />
        </TabsContent>
        
        <TabsContent value="timeline" className="mt-0">
          <TimelineSection events={timelineEvents} />
        </TabsContent>
        
        <TabsContent value="messages" className="mt-0">
          <MessageSection messages={birthdayMessages} />
        </TabsContent>
        
        <TabsContent value="countdown" className="mt-0">
          <CountdownSection 
            targetDate={BIRTHDAY_DATE} 
            onNavigateHome={() => setActiveSection('home')}
            triggerConfetti={triggerConfetti}
          />
        </TabsContent>
      </MainNavigation>
    </div>
  );
};

export default Index;
