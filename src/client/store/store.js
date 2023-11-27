// Zustand store
// to store previous state snapshots
// tree components?

import { create } from 'zustand';

const useStore = create((set) => ({
  stateSnapshotArray: [],
  actionSnapshotArray: [],
  activeTab: 'tree',
  setActiveTab: (activeTab) => set({ activeTab }), // Corrected usage of set
  addStateSnapshot: (snapshot) =>
    set((state) => ({
      stateSnapshotArray: [...state.stateSnapshotArray, snapshot],
    })),
  addActionSnapshot: (action) =>
    set((state) => ({
      actionSnapshotArray: [...state.actionSnapshotArray, action],
    })),
}));

// const useStore = create((set) => ({
//   stateSnapshotArray: [],
//   activeTab: 'tree',
//   setActiveTab: (activeTab) => set(() => ({ activeTab })),
//   addStateSnapshot: (snapshot) =>
//     set((state) => ({
//       stateSnapshotArray: [...state.stateSnapshotArray, snapshot],
//     })),
// }));

export default useStore;
