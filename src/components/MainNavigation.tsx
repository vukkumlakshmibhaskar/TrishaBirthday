
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Camera, Clock, MessageCircle, Calendar } from 'lucide-react';

interface MainNavigationProps {
  activeSection: string;
  onSectionChange: (value: string) => void;
  children: React.ReactNode;
}

const MainNavigation = ({ activeSection, onSectionChange, children }: MainNavigationProps) => {
  return (
    <Tabs 
      value={activeSection} 
      onValueChange={onSectionChange}
      className="max-w-6xl mx-auto px-4"
    >
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm pt-4 pb-2">
        <TabsList className="grid grid-cols-5 h-auto">
          <TabsTrigger value="home" className="py-3 data-[state=active]:bg-birthday-purple data-[state=active]:text-white">
            <Gift className="h-5 w-5 mr-1 md:mr-2" />
            <span className="hidden md:inline">Home</span>
          </TabsTrigger>
          <TabsTrigger value="gallery" className="py-3 data-[state=active]:bg-birthday-purple data-[state=active]:text-white">
            <Camera className="h-5 w-5 mr-1 md:mr-2" />
            <span className="hidden md:inline">Gallery</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="py-3 data-[state=active]:bg-birthday-purple data-[state=active]:text-white">
            <Calendar className="h-5 w-5 mr-1 md:mr-2" />
            <span className="hidden md:inline">Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="py-3 data-[state=active]:bg-birthday-purple data-[state=active]:text-white">
            <MessageCircle className="h-5 w-5 mr-1 md:mr-2" />
            <span className="hidden md:inline">Messages</span>
          </TabsTrigger>
          <TabsTrigger value="countdown" className="py-3 data-[state=active]:bg-birthday-purple data-[state=active]:text-white">
            <Clock className="h-5 w-5 mr-1 md:mr-2" />
            <span className="hidden md:inline">Countdown</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      <div className="mt-8">
        {children}
      </div>
    </Tabs>
  );
};

export default MainNavigation;
