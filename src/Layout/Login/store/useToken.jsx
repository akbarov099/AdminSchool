import { create } from "zustand";

const useTokenStore = create((set) => ({
  token: JSON.parse(localStorage.getItem("token")) || "",
  setToken: (value) => {
    if (!value) {
      localStorage.removeItem("token");
      set({ token: "" });
      return;
    }
    
    localStorage.setItem("token", JSON.stringify(value)); 
    set({ token: value });

    setTimeout(() => {
      localStorage.removeItem("token");
      set({ token: "" });
      window.location.href = "/";
    }, 1200); 
  },
}));

export default useTokenStore;
