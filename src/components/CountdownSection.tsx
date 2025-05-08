
import BirthdayCountdown from '@/components/BirthdayCountdown';
import { Button } from '@/components/ui/button';

interface CountdownSectionProps {
  targetDate: Date;
  onNavigateHome: () => void;
  triggerConfetti: () => void;
}

const CountdownSection = ({ targetDate, onNavigateHome, triggerConfetti }: CountdownSectionProps) => {
  const handleBackClick = () => {
    onNavigateHome();
    triggerConfetti();
  };

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-birthday-purple">
          The Big Day
        </h2>
        <p className="text-gray-600 mt-2">
          Counting down to your special day
        </p>
      </div>
      <div className="max-w-md mx-auto">
        <BirthdayCountdown targetDate={targetDate} />
        
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700">
            I can't wait to celebrate with you in person!
          </p>
          <Button 
            className="birthday-btn mt-4"
            onClick={handleBackClick}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </>
  );
};

export default CountdownSection;
