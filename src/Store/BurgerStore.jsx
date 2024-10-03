import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBurgerStore = create(
    persist(
        (set) => ({
            isMenuOpen: false,
            toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
        }),
        {
            name: "burger-store",
            getStorage: () => localStorage,
        }
    )
);

export default useBurgerStore;
