
import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { CalendarIcon, AutoClickerIcon, MultiplierIcon } from './icons';

interface GameProps {
  score: number;
  onGameAction: () => void;
  onDailyCheckIn: () => void;
  canCheckIn: boolean;
  checkInMessage: string;
  activePowerUps: { [key: string]: number };
}

const PowerUpTimer: React.FC<{ expiry: number; icon: React.ReactNode }> = ({ expiry, icon }) => {
    const calculateTimeLeft = () => {
        const diff = expiry - Date.now();
        return diff > 0 ? Math.ceil(diff / 1000) : 0;
    };
    
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, expiry]);

    if (timeLeft <= 0) return null;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex items-center gap-2 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-semibold">
            {icon}
            <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
    );
};


const Game: React.FC<GameProps> = ({ score, onGameAction, onDailyCheckIn, canCheckIn, checkInMessage, activePowerUps }) => {
  return (
    <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700 text-center">
      <div className="flex justify-center items-center gap-4 mb-2">
        {activePowerUps.autoClicker && <PowerUpTimer expiry={activePowerUps.autoClicker} icon={<AutoClickerIcon className="w-5 h-5" />} />}
        {activePowerUps.clickMultiplier && <PowerUpTimer expiry={activePowerUps.clickMultiplier} icon={<MultiplierIcon className="w-5 h-5" />} />}
      </div>
      <p className="text-gray-400 text-lg font-medium">Your Score</p>
      <h1 className="text-6xl font-black text-white my-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">{score.toLocaleString()}</h1>
      
      <div className="relative my-8 h-48 flex items-center justify-center">
          <button
              onClick={onGameAction}
              className="w-48 h-48 bg-purple-600 rounded-full text-white text-2xl font-bold shadow-2xl shadow-purple-600/30
                         hover:bg-purple-700 active:scale-95 transform transition-all duration-150 ease-in-out
                         flex items-center justify-center animate-pulse-glow"
          >
              Click!
          </button>
      </div>

      <div className="mt-8">
        <Button onClick={onDailyCheckIn} disabled={!canCheckIn} className="w-full py-3 text-base">
          <CalendarIcon className="w-5 h-5" />
          {checkInMessage}
        </Button>
        {!canCheckIn && <p className="text-xs text-gray-500 mt-2">Come back tomorrow for another bonus!</p>}
      </div>
    </div>
  );
};

export default Game;
