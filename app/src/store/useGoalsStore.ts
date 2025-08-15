import { create } from 'zustand';
import { SavingsGoal } from '../types/database';

interface GoalsState {
  goals: SavingsGoal[];
  isLoading: boolean;
  setGoals: (goals: SavingsGoal[]) => void;
  addGoal: (goal: SavingsGoal) => void;
  updateGoal: (goalId: string, updates: Partial<SavingsGoal>) => void;
  deleteGoal: (goalId: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useGoalsStore = create<GoalsState>((set) => ({
  goals: [],
  isLoading: false,
  setGoals: (goals) => set((state) => ({ ...state, goals })),
  addGoal: (goal) => 
    set((state) => ({ 
      ...state, 
      goals: [...state.goals, goal] 
    })),
  updateGoal: (goalId, updates) =>
    set((state) => ({
      ...state,
      goals: state.goals.map(goal =>
        goal.id === goalId ? { ...goal, ...updates } : goal
      ),
    })),
  deleteGoal: (goalId) =>
    set((state) => ({
      ...state,
      goals: state.goals.filter(goal => goal.id !== goalId),
    })),
  setLoading: (isLoading) => set((state) => ({ ...state, isLoading })),
}));
