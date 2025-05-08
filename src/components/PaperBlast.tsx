
import { useState, useEffect } from 'react';

interface PaperPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
  color: string;
}

const PaperBlast = () => {
  const [papers, setPapers] = useState<PaperPiece[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const colors = [
    'bg-birthday-purple',
    'bg-birthday-pink',
    'bg-birthday-gold',
    'bg-white',
    'bg-birthday-light'
  ];
  
  const triggerBlast = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newPapers: PaperPiece[] = [];
    
    // Create 30 paper pieces for the blast
    for (let i = 0; i < 30; i++) {
      newPapers.push({
        id: i,
        x: 50, // Start from center
        y: 50, // Start from center
        rotation: Math.random() * 360,
        size: Math.random() * 1 + 0.5, // Size between 0.5 and 1.5
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setPapers(newPapers);
    
    // Reset after animation completes
    setTimeout(() => {
      setPapers([]);
      setIsAnimating(false);
    }, 3000);
  };
  
  return (
    <div>
      {/* Paper blast animation container */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
        {papers.map((paper) => (
          <div
            key={paper.id}
            className={`absolute rounded-sm ${paper.color}`}
            style={{
              left: `${paper.x}%`,
              top: `${paper.y}%`,
              width: `${paper.size * 20}px`,
              height: `${paper.size * 20}px`,
              transform: `rotate(${paper.rotation}deg)`,
              animation: 'paper-blast 2s forwards ease-out',
              opacity: 0
            }}
          />
        ))}
      </div>
      
      {/* Expose trigger function */}
      <input 
        type="hidden" 
        id="paper-blast-trigger" 
        data-trigger={triggerBlast}
      />
    </div>
  );
};

export default PaperBlast;
