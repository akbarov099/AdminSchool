import { create } from "zustand";

const useDarkModeStore = create((set) => ({
  darkMode: JSON.parse(localStorage.getItem("darkMode")) ?? true,
  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
      return { darkMode: newDarkMode };
    }),
}));

export default useDarkModeStore;
