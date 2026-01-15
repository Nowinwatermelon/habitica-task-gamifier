import React, { useState, useCallback } from 'react';
import { TaskInputData, TodoItem } from '../types';

interface TaskFormProps {
  onSubmit: (data: TaskInputData) => void;
  isLoading: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, isLoading }) => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [difficulty, setDifficulty] = useState<TaskInputData['difficulty']>('Easy');
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [currentTodo, setCurrentTodo] = useState('');

  const handleAddTodo = useCallback(() => {
    if (!currentTodo.trim()) return;
    setTodos(prev => [...prev, { id: Date.now().toString(), text: currentTodo.trim() }]);
    setCurrentTodo('');
  }, [currentTodo]);

  const handleRemoveTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, notes, todos, difficulty });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-indigo-900 mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        New Task
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="e.g., Complete Project Report"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes / Description</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 h-24"
          placeholder="Add context for the AI..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as TaskInputData['difficulty'])}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="Trivial">Trivial</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Checklist (Sub-tasks)</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={currentTodo}
            onChange={(e) => setCurrentTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTodo())}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Add a checklist item"
          />
          <button
            type="button"
            onClick={handleAddTodo}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded border border-gray-200 text-sm">
              <span>{todo.text}</span>
              <button
                type="button"
                onClick={() => handleRemoveTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-md text-white font-bold text-lg pixel-shadow transition-all transform active:scale-95 ${
          isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {isLoading ? 'Summoning Boss...' : 'Gamify This Task!'}
      </button>
    </form>
  );
};

export default TaskForm;