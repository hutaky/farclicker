
import React from 'react';
import { FarcasterIcon } from './icons';
import { Button } from './Button';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-sm mx-auto bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-700">
        <div className="flex justify-center mb-6">
          <div className="bg-purple-600 p-3 rounded-full">
            <FarcasterIcon />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Welcome to WarpClicker!</h1>
        <p className="text-gray-400 mb-8">A mini-app game for Farcaster.</p>
        <div className="space-y-4">
          <Button onClick={onLogin} className="w-full text-lg py-3">
            <FarcasterIcon />
            Sign In with Farcaster
          </Button>
          <p className="text-xs text-gray-500">
            This is a simulation. In a real app, this would initiate the Farcaster login flow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
