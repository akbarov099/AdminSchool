import { create } from "zustand";

const useTokenStore = create((set) => ({
  token: JSON.parse(localStorage.getItem("token")) || "",
  setToken: (value) => {
    if (value) {
      localStorage.setItem("token", JSON.stringify(value)); 
      set({ token: value });
      window.location.href = "/"; 
    } else {
      localStorage.removeItem("token"); 
      set({ token: "" });
    }
  },
}));

export default useTokenStore;
