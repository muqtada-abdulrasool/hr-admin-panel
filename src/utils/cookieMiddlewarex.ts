// middleware/cookieMiddleware.ts
import Cookies from "js-cookie";
import { StateCreator, StoreApi } from "zustand";

// Custom type for the middleware
type CookieMiddleware = <T extends object>(
  config: StateCreator<T>
) => StateCreator<T>;

export const cookieMiddleware: CookieMiddleware =
  (config) => (set, get, api) => {
    // Override the set function to save to cookie
    const newSet: typeof set = (stateOrFn) => {
      set(stateOrFn);
      const newState = get();
      Cookies.set("zustand-state", JSON.stringify(newState), { expires: 7 }); // Saves the entire state to a cookie
    };

    return config(newSet, get, api);
  };
