export interface TodoItem {
  id: string;
  text: string;
}

export interface TaskInputData {
  title: string;
  notes: string;
  todos: TodoItem[];
  difficulty: 'Trivial' | 'Easy' | 'Medium' | 'Hard';
}

export interface RPGMonster {
  name: string;
  description: string; // Visual description
  hp: number;
  strength: number;
  weakness: string;
}

export interface RPGQuestResult {
  questTitle: string;
  lore: string; // The backstory
  monster: RPGMonster;
  rewards: string[]; // List of flavor items/gold
  callToAction: string; // Encouraging closing line
}