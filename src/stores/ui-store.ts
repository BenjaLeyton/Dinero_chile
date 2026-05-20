'use client';

import { create } from 'zustand';

type Panel = 'controls' | 'charts' | 'details' | 'events';

interface UIStore {
  selectedEntityId: string | null;
  visiblePanels: Set<Panel>;
  sidebarCollapsed: boolean;
  chartsPanelExpanded: boolean;

  selectEntity: (id: string | null) => void;
  togglePanel: (panel: Panel) => void;
  toggleSidebar: () => void;
  toggleChartsPanel: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  selectedEntityId: null,
  visiblePanels: new Set<Panel>(['controls', 'charts']),
  sidebarCollapsed: false,
  chartsPanelExpanded: false,

  selectEntity: (id) => set({ selectedEntityId: id }),

  togglePanel: (panel) =>
    set((state) => {
      const next = new Set(state.visiblePanels);
      if (next.has(panel)) next.delete(panel);
      else next.add(panel);
      return { visiblePanels: next };
    }),

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  toggleChartsPanel: () =>
    set((state) => ({ chartsPanelExpanded: !state.chartsPanelExpanded })),
}));
