
import React from 'react';
import { User } from '../types';
import { Button } from './Button';
import { LogoutIcon } from './icons';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="w-full p-4 flex justify-between items-center bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
      <div className="flex items-center gap-3">
        <img src={user.pfpUrl} alt={user.displayName} className="w-10 h-10 rounded-full border-2 border-purple-500" />
        <div>
          <p className="font-bold text-white">{user.displayName}</p>
          <p className="text-sm text-gray-400">@{user.username}</p>
        </div>
      </div>
      <Button onClick={onLogout} variant="ghost" className="px-3">
        <LogoutIcon className="w-5 h-5" />
      </Button>
    </header>
  );
};

export default Header;
