import { create } from "zustand";

type TableRefreshState = {
  refreshKey: number;
  triggerRefresh: () => void;
};

export const useTableRefreshStore = create<TableRefreshState>((set) => ({
  refreshKey: 0,
  triggerRefresh: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),
}));

export const triggerTableRefeshAction = () => {
  useTableRefreshStore.getState().triggerRefresh();
};
