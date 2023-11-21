// Zustand store
// to store previous state snapshots
// tree components?

import { create } from 'zustand';

const useStore = create((set) => ({
  activeTab: 'tree',
  setActiveTab: (activeTab) => set(() => ({ activeTab })),
}));

export default useStore;
