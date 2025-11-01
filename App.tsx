import React, { useState, useEffect, useCallback } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import { User, LeaderboardEntry } from './types';
import Shop from './components/Shop';

// Fix: Add type definition for window.aistudio to include the user property.
declare global {
  interface Window {
    aistudio?: {
      user?: User;
    };
  }
}

// In a real app, this would come from a backend, but for now we keep it for other users.
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, user: { fid: 2, username: 'v', displayName: 'Vitalik Buterin', pfpUrl: 'https://i.imgur.com/nNbn4k3.jpeg' }, score: 125300 },
  { rank: 2, user: { fid: 3, username: 'balajis', displayName: 'Balaji Srinivasan', pfpUrl: 'https://i.imgur.com/h55bVAs.jpeg' }, score: 98750 },
  { rank: 3, user: { fid: 1, username: 'dwr', displayName: 'Dan Romero', pfpUrl: 'https://i.imgur.com/Jk4Npfh.png' }, score: 76540 },
  { rank: 4, user: { fid: 4, username: 'linda', displayName: 'Linda Xie', pfpUrl: 'https://i.imgur.com/2Y02s2v.png' }, score: 65430 },
  { rank: 5, user: { fid: 5, username: 'jesse', displayName: 'Jesse Pollak', pfpUrl: 'https://i.imgur.com/k2L3s5n.jpeg' }, score: 54320 },
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [score, setScore] = useState<number>(0);
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(MOCK_LEADERBOARD);
  const [activePowerUps, setActivePowerUps] = useState<{ [key: string]: number }>({});
  const [clickMultiplier, setClickMultiplier] = useState<number>(1);

  const loadUserSession = useCallback((contextUser: User) => {
    setUser(contextUser);
    
    const savedScore = localStorage.getItem(`warpclicker_score_${contextUser.fid}`);
    const savedCheckIn = localStorage.getItem(`warpclicker_lastCheckIn_${contextUser.fid}`);
    
    if (savedCheckIn) {
      setLastCheckIn(savedCheckIn);
    }
    
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    } else {
      const userOnLeaderboard = MOCK_LEADERBOARD.find(e => e.user.fid === contextUser.fid);
      setScore(userOnLeaderboard ? userOnLeaderboard.score : 0);
    }
  }, []);

  // Load game state from localStorage on mount if user is already in context
  useEffect(() => {
    const context = window.aistudio;
    if (context && context.user) {
      loadUserSession(context.user);
    }
  }, [loadUserSession]);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`warpclicker_score_${user.fid}`, score.toString());
      if(lastCheckIn) localStorage.setItem(`warpclicker_lastCheckIn_${user.fid}`, lastCheckIn);
    }
  }, [score, lastCheckIn, user]);

  const handleLogin = useCallback(() => {
    // Use user data from the SDK context
    const context = window.aistudio;
    if (context && context.user) {
      loadUserSession(context.user);
    } else {
        // Fallback for environments where context is not available
        console.warn("Farcaster context not found.");
    }
  }, [loadUserSession]);

  const handleLogout = useCallback(() => {
    setUser(null);
    setScore(0);
  }, []);

  const handleGameAction = useCallback(() => {
    setScore(prevScore => prevScore + 1 * clickMultiplier);
  }, [clickMultiplier]);
  
  const isDateToday = (dateString: string | null): boolean => {
      if (!dateString) return false;
      const date = new Date(dateString);
      const today = new Date();
      return date.getFullYear() === today.getFullYear() &&
             date.getMonth() === today.getMonth() &&
             date.getDate() === today.getDate();
  };

  const canCheckIn = !isDateToday(lastCheckIn);

  const handleDailyCheckIn = useCallback(() => {
    if (canCheckIn) {
      const bonus = 1000;
      setScore(prevScore => prevScore + bonus);
      setLastCheckIn(new Date().toISOString());
    }
  }, [canCheckIn]);

  useEffect(() => {
    // Update leaderboard with current user's score in real-time
    if(user) {
        setLeaderboard(prev => {
            const userIndex = prev.findIndex(e => e.user.fid === user.fid);
            let newBoard = [...prev];
            if (userIndex > -1) {
                newBoard[userIndex] = { ...newBoard[userIndex], score: score };
            } else {
                // Add the new user to the leaderboard if they aren't there
                newBoard.push({rank: 0, user, score });
            }
            // Re-sort and re-rank
            return newBoard
                .sort((a, b) => b.score - a.score)
                .map((entry, index) => ({ ...entry, rank: index + 1 }));
        });
    }
  }, [score, user]);

  const handleBuyPowerUp = (id: string, cost: number, duration: number) => {
    if (score >= cost) {
      setScore(prev => prev - cost);
      const expiry = Date.now() + duration * 1000;
      setActivePowerUps(prev => ({...prev, [id]: expiry}));

      if (id === 'clickMultiplier') {
        setClickMultiplier(2);
      }
    }
  };

  useEffect(() => {
    const intervals = Object.keys(activePowerUps).map(id => {
      if (id === 'autoClicker') {
        const interval = setInterval(() => {
          if (Date.now() < activePowerUps[id]) {
            setScore(prev => prev + 1);
          } else {
            setActivePowerUps(prev => {
              const newUps = {...prev};
              delete newUps[id];
              return newUps;
            });
          }
        }, 1000);
        return interval;
      }
      return null;
    });

    const timeouts = Object.keys(activePowerUps).map(id => {
      if (id === 'clickMultiplier') {
        const timeout = setTimeout(() => {
          setClickMultiplier(1);
          setActivePowerUps(prev => {
            const newUps = {...prev};
            delete newUps[id];
            return newUps;
          });
        }, activePowerUps[id] - Date.now());
        return timeout;
      }
      return null;
    });

    return () => {
      intervals.forEach(i => i && clearInterval(i));
      timeouts.forEach(t => t && clearTimeout(t));
    };
  }, [activePowerUps]);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans p-4 flex flex-col items-center">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-repeat z-0"
        style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')", opacity: 0.1}}>
      </div>
      <div className="relative z-10 w-full flex flex-col items-center max-w-md mx-auto">
        <Header user={user} onLogout={handleLogout} />
        <main className="w-full flex flex-col items-center mt-4 space-y-6">
          <Game 
            score={score}
            onGameAction={handleGameAction}
            onDailyCheckIn={handleDailyCheckIn}
            canCheckIn={canCheckIn}
            checkInMessage={canCheckIn ? "Daily Check-in (+1,000)" : "Checked in today!"}
            activePowerUps={activePowerUps}
          />
          <Shop score={score} onBuyPowerUp={handleBuyPowerUp} activePowerUps={activePowerUps} />
          <Leaderboard data={leaderboard} />
        </main>
      </div>
    </div>
  );
};

export default App;
