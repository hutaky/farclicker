
import React from 'react';
import { LeaderboardEntry } from '../types';
import { CoinIcon } from './icons';

interface LeaderboardProps {
  data: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  return (
    <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Leaderboard</h2>
      <div className="space-y-3">
        {data.map((entry) => (
          <div
            key={entry.user.fid}
            className={`flex items-center p-3 rounded-lg transition-colors border ${
              entry.rank === 1 ? 'bg-yellow-500/20 border-yellow-500' :
              entry.rank === 2 ? 'bg-gray-400/20 border-gray-400' :
              entry.rank === 3 ? 'bg-yellow-700/20 border-yellow-700' :
              'bg-gray-700/50 border-gray-700'
            }`}
          >
            <span className="text-lg font-bold text-gray-400 w-8 text-center">{entry.rank}</span>
            <img src={entry.user.pfpUrl} alt={entry.user.displayName} className="w-10 h-10 rounded-full mx-4" />
            <div className="flex-grow">
              <p className="font-semibold text-white">{entry.user.displayName}</p>
              <p className="text-sm text-gray-400">@{entry.user.username}</p>
            </div>
            <div className="text-lg font-bold text-purple-400 flex items-center gap-1">
              <CoinIcon className="w-5 h-5 opacity-70"/>
              {entry.score.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
