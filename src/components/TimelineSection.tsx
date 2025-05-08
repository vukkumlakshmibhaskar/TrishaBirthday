
import TimelineEvent, { TimelineEventProps } from './TimelineEvent';

interface TimelineSectionProps {
  events: TimelineEventProps[];
}

const TimelineSection = ({ events }: TimelineSectionProps) => {
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center mb-12 text-birthday-purple">
        Our Journey Together
      </h2>
      
      <div className="max-w-3xl mx-auto">
        {events.map((event, index) => (
          <TimelineEvent
            key={index}
            date={event.date}
            title={event.title}
            description={event.description}
            imageSrc={event.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineSection;
