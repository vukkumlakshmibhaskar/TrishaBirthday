
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CountdownProps {
  targetDate: Date;
}

const BirthdayCountdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isPast: false
      };
    };
    
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);
  
  if (timeLeft.isPast) {
    return (
      <div className="text-center">
        <h3 className="text-2xl font-bold text-birthday-purple mb-2">
          It's Your Birthday! 🎉
        </h3>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-birthday-purple text-center mb-4">
        Countdown to Your Special Day
      </h3>
      
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map((item, index) => (
          <Card key={index} className="overflow-hidden animate-pulse-glow">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-birthday-purple">
                {item.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {item.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BirthdayCountdown;
