
import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  type: 'confetti-gold' | 'confetti-purple' | 'confetti-pink';
  delay: number;
  rotation: number;
  size: number;
}

const ConfettiEffect = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  
  useEffect(() => {
    const colors = ['confetti-gold', 'confetti-purple', 'confetti-pink'];
    const confettiCount = 100;
    const newConfetti: ConfettiPiece[] = [];
    
    for (let i = 0; i < confettiCount; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100,
        y: -20, // Start above the screen
        type: colors[Math.floor(Math.random() * colors.length)] as ConfettiPiece['type'],
        delay: Math.random() * 5,
        rotation: Math.random() * 360,
        size: Math.random() * 0.8 + 0.4, // Size between 0.4 and 1.2
      });
    }
    
    setConfetti(newConfetti);
    
    // Clean up
    return () => {
      setConfetti([]);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={`confetti ${piece.type}`}
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            transform: `rotate(${piece.rotation}deg) scale(${piece.size})`,
            animation: `confetti-fall ${3 + Math.random() * 4}s linear forwards`,
            animationDelay: `${piece.delay}s`,
            animationIterationCount: '1',
            opacity: 0
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;
