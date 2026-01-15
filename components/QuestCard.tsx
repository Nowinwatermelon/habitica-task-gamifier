import React from 'react';
import { RPGQuestResult } from '../types';

interface QuestCardProps {
  quest: RPGQuestResult;
  onReset: () => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, onReset }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden border-4 border-indigo-900 animate-fade-in">
      {/* Header */}
      <div className="bg-indigo-900 p-4 text-white">
        <div className="flex justify-between items-center">
          <h2 className="font-pixel text-sm md:text-base text-yellow-400 tracking-wide">BOSS BATTLE</h2>
          <span className="text-xs font-mono opacity-75">LVL {Math.floor(quest.monster.hp / 10)}</span>
        </div>
        <h1 className="text-2xl font-bold mt-2">{quest.questTitle}</h1>
      </div>

      <div className="p-6">
        {/* Monster Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-shrink-0 flex flex-col items-center">
            {/* Visual Placeholder for Monster */}
            <div className="w-32 h-32 bg-gray-200 rounded-lg pixel-border mb-3 flex items-center justify-center relative overflow-hidden group">
               <img 
                 src={`https://picsum.photos/seed/${quest.monster.name.replace(/\s/g, '')}/128/128`} 
                 alt="Monster" 
                 className="w-full h-full object-cover"
                 style={{ imageRendering: 'pixelated' }}
               />
               <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg text-red-600">{quest.monster.name}</h3>
              <p className="text-xs text-gray-500 italic">{quest.monster.description}</p>
            </div>
          </div>

          <div className="flex-grow space-y-4">
            {/* Stats */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold text-gray-700">
                <span>HP</span>
                <span>{quest.monster.hp} / {quest.monster.hp}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 border border-gray-400">
                <div className="bg-red-500 h-full rounded-full w-full"></div>
              </div>

              <div className="flex justify-between text-sm font-bold text-gray-700 mt-2">
                <span>STR</span>
                <span className="text-orange-600">{quest.monster.strength}</span>
              </div>
            </div>

            {/* Weakness */}
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm">
              <span className="font-bold text-yellow-800">Weakness: </span>
              <span className="text-yellow-900">{quest.monster.weakness}</span>
            </div>
          </div>
        </div>

        {/* Lore Section */}
        <div className="mb-6">
          <h3 className="font-pixel text-xs text-indigo-900 mb-2 uppercase border-b border-indigo-100 pb-1">Quest Log</h3>
          <p className="text-gray-700 leading-relaxed italic border-l-4 border-purple-300 pl-4 py-1">
            "{quest.lore}"
          </p>
        </div>

        {/* Rewards Section */}
        <div className="mb-8">
          <h3 className="font-pixel text-xs text-indigo-900 mb-2 uppercase border-b border-indigo-100 pb-1">Potential Loot</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {quest.rewards.map((reward, index) => (
              <li key={index} className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 shadow-sm"></span>
                {reward}
              </li>
            ))}
          </ul>
        </div>

        {/* Action */}
        <div className="text-center space-y-3">
          <p className="font-bold text-purple-700 text-lg">{quest.callToAction}</p>
          <button
            onClick={onReset}
            className="text-gray-500 text-sm hover:text-indigo-600 underline"
          >
            Create Another Quest
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestCard;