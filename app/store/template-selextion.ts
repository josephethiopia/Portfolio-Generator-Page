import { create } from 'zustand';

interface TemplateSelectionStore {
  userSelectedTemplate: {
    id: number|null;
    name: string|null;
  };
  setUserSelectedTemplate: (id: number, name: string) => void;
}

export const useTemplateSelectionStore = create<TemplateSelectionStore>((set) => ({
  userSelectedTemplate: {id: null, name: null},
  setUserSelectedTemplate: (id: number, name: string) => set({ userSelectedTemplate: {id, name} }),
}))
