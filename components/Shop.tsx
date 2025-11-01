
import React from 'react';
import { Button } from './Button';
import { ShopIcon, CoinIcon, AutoClickerIcon, MultiplierIcon } from './icons';

interface ShopProps {
  score: number;
  onBuyPowerUp: (id: string, cost: number, duration: number) => void;
  activePowerUps: { [key: string]: number };
}

const POWER_UPS = [
  {
    id: 'autoClicker',
    name: 'Auto-Clicker',
    description: '+1 point/sec for 10 min',
    cost: 500,
    duration: 600, // 10 minutes
    icon: <AutoClickerIcon className="w-8 h-8" />
  },
  {
    id: 'clickMultiplier',
    name: 'Click Multiplier',
    description: 'x2 points per click for 5 min',
    cost: 1000,
    duration: 300, // 5 minutes
    icon: <MultiplierIcon className="w-8 h-8" />
  },
];

const Shop: React.FC<ShopProps> = ({ score, onBuyPowerUp, activePowerUps }) => {
  return (
    <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
        <ShopIcon className="w-7 h-7" />
        Power-Up Shop
      </h2>
      <div className="space-y-4">
        {POWER_UPS.map((powerUp) => {
          const isAffordable = score >= powerUp.cost;
          const isActive = !!activePowerUps[powerUp.id];
          return (
            <div key={powerUp.id} className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg border border-gray-600">
              <div className="flex items-center gap-4">
                <div className="text-purple-400">{powerUp.icon}</div>
                <div>
                  <h3 className="font-bold text-white">{powerUp.name}</h3>
                  <p className="text-sm text-gray-400">{powerUp.description}</p>
                </div>
              </div>
              <Button
                onClick={() => onBuyPowerUp(powerUp.id, powerUp.cost, powerUp.duration)}
                disabled={!isAffordable || isActive}
                variant="primary"
                className="w-32"
              >
                {isActive ? 'Active' : (
                  <>
                    <CoinIcon className="w-5 h-5" />
                    {powerUp.cost.toLocaleString()}
                  </>
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
