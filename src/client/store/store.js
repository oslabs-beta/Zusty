import { create } from 'zustand';

const useStore = create((set) => ({
  prevState: null,
  nextState: null,
  stateSnapshotArray: [],
  actionSnapshotArray: [],
  diffArray: [],
  activeTab: 'actionLog',
  store: {},
  setActiveTab: (activeTab) => set({ activeTab }),
  addStateSnapshot: (snapshot) =>
    set((state) => ({
      stateSnapshotArray: [...state.stateSnapshotArray, snapshot],
    })),
  addActionSnapshot: (action) =>
    set((state) => ({
      actionSnapshotArray: [...state.actionSnapshotArray, action],
    })),
  addDiffSnapshot: (diff) =>
    set((state) => ({
      diffArray: [...state.diffArray, diff],
    })),
  setPrevState: (pState) => set({ prevState: pState }),
  setNextState: (nState) => set({ nextState: nState }),
  setStore: (inputStore) => set({ store: inputStore }),

  d3data: {},
  setD3data: (data) => set({ d3data: data }),
}));

export default useStore;
