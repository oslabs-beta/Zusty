import { create } from 'zustand';

const useStore = create((set) => ({
  prevState: null,
  nextState: null,
  stateSnapshotArray: [],
  actionSnapshotArray: [],
  diffArray: [],
  activeTab: 'actionLog',
  store: {},
  storeButton: false,
  treeButton: false,
  actionButton: true,
  d3data: {},
  setActiveButton: (buttonName) => {
    set(() => ({
      storeButton: buttonName === 'storeButton',
      treeButton: buttonName === 'treeButton',
      actionButton: buttonName === 'actionButton',
    }));
  },
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
  setD3data: (data) => set({ d3data: data }),
}));

export default useStore;
