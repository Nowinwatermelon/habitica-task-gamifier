import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import QuestCard from './components/QuestCard';
import { generateQuestFromTask } from './services/geminiService';
import { TaskInputData, RPGQuestResult } from './types';

const App: React.FC = () => {
  const [questData, setQuestData] = useState<RPGQuestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTaskSubmit = async (data: TaskInputData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateQuestFromTask(data);
      setQuestData(result);
    } catch (err: any) {
      console.error("Error generating quest:", err);
      setError("Failed to summon the quest. The magical ley lines (API) might be disrupted.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuestData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-3 rounded-full bg-indigo-900 mb-4 pixel-shadow">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-indigo-900 font-pixel tracking-tighter">
            Questifier
          </h1>
          <p className="mt-2 text-gray-600">
            Turn your mundane tasks into epic Habitica adventures.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="transition-all duration-300">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!questData ? (
            <TaskForm onSubmit={handleTaskSubmit} isLoading={isLoading} />
          ) : (
            <QuestCard quest={questData} onReset={handleReset} />
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-500">
          <p>Powered by Gemini 2.5 Flash • Unofficial Habitica Companion</p>
        </div>
      </div>
    </div>
  );
};

export default App;