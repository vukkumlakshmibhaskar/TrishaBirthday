
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export interface TimelineEventProps {
  date: string;
  title: string;
  description: string;
  imageSrc?: string;
}

const TimelineEvent = ({ date, title, description, imageSrc }: TimelineEventProps) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row animate-pop">
      <div className="flex-none w-24 text-sm font-medium text-birthday-purple">
        {date}
      </div>
      <div className="relative flex-grow pl-6 md:pl-0">
        {/* Timeline connector */}
        <div className="hidden md:block absolute h-full w-0.5 bg-birthday-purple left-[-12px] top-0">
          <div className="absolute w-4 h-4 rounded-full bg-birthday-gold border-4 border-birthday-purple left-[-7px] top-0"></div>
        </div>
        
        <Card className="mt-[-8px] hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <h3 className="font-bold text-lg text-birthday-purple">{title}</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{description}</p>
            {imageSrc && (
              <div className="mt-3">
                <img 
                  src={imageSrc} 
                  alt={title} 
                  className="rounded-lg w-full object-cover h-48"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimelineEvent;
