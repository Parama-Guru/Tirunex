"use client";

import { create } from "zustand";

export type Theme = "dark" | "light";

export type SceneShape =
  | "sphere"
  | "galaxy"
  | "knot"
  | "helix"
  | "terrain"
  | "network"
  | "lattice"
  | "rings"
  | "shield"
  | "wave"
  | "tunnel"
  | "cloud";

export type Tint = "blue" | "cyan" | "indigo" | "green" | "aurora";

export interface SceneConfig {
  shape: SceneShape;
  /** Scale of the glowing AI core (0 hides it). */
  core?: number;
  /** Horizontal offset in world units (positive = right). */
  x?: number;
  y?: number;
  /** Camera distance. */
  zoom?: number;
  tint?: Tint;
}

interface AppState {
  theme: Theme;
  setTheme: (t: Theme) => void;
  /** True once the preloader has finished; gates hero intro animations. */
  ready: boolean;
  setReady: (v: boolean) => void;
  scene: SceneConfig;
  setScene: (s: SceneConfig) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}

export const useApp = create<AppState>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
  ready: false,
  setReady: (ready) => set({ ready }),
  scene: { shape: "sphere", core: 1, x: 1.6, zoom: 7, tint: "blue" },
  setScene: (scene) => set({ scene }),
  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
}));

/** High-frequency values kept outside React to avoid re-renders. */
export const live = {
  pointer: { x: 0, y: 0 },
  scroll: 0,
  velocity: 0,
  progress: 0,
};
