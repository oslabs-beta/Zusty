// Zustand store
// to store previous state snapshots
// tree components?

import { create } from 'zustand';

const useStore = create((set) => ({
  stateSnapshotArray: [],
  activeTab: 'tree',
  setActiveTab: (activeTab) => set(() => ({ activeTab })),
  addStateSnapshot: (snapshot) =>
    set((state) => ({
      stateSnapshotArray: [...state.stateSnapshotArray, snapshot],
    })),
}));

export default useStore;
