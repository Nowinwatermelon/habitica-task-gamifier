import { GoogleGenAI, Type } from "@google/genai";
import { TaskInputData, RPGQuestResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuestFromTask = async (data: TaskInputData): Promise<RPGQuestResult> => {
  const modelId = "gemini-3-flash-preview";
  
  const prompt = `
    You are a creative writer for Habitica, a gamified task manager. 
    Transform the following user task into an epic RPG Quest/Boss Battle.
    
    User Task Details:
    - Title: ${data.title}
    - Notes: ${data.notes}
    - Sub-tasks: ${data.todos.map(t => t.text).join(', ')}
    - Perceived Difficulty: ${data.difficulty}

    Requirements:
    1. Create a Monster/Boss that metaphorically represents the task (e.g., "The Procrastination Slime" or "The Paperwork Golem").
    2. Write a short, witty lore backstory suitable for a pixel-art RPG. Use puns if appropriate.
    3. Define monster stats (HP and Strength) scaled roughly by the difficulty.
    4. Suggest rewards (Gold, Experience, or imaginary items like "Potion of Focus").
    5. Keep the tone supportive, fun, and adventurous.
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          questTitle: { type: Type.STRING },
          lore: { type: Type.STRING },
          monster: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              hp: { type: Type.NUMBER },
              strength: { type: Type.NUMBER },
              weakness: { type: Type.STRING }
            },
            required: ["name", "description", "hp", "strength", "weakness"]
          },
          rewards: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          callToAction: { type: Type.STRING }
        },
        required: ["questTitle", "lore", "monster", "rewards", "callToAction"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate quest data");
  }

  return JSON.parse(response.text) as RPGQuestResult;
};