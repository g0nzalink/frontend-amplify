import React, { createContext, useContext } from "react";

interface ApiContextValue {
  ms4: string;
  ms1: string;
  ms2: string;
}

const ApiContext = createContext<ApiContextValue>({
  ms4: import.meta.env.VITE_MS4_URL ?? "http://localhost:8004",
  ms1: import.meta.env.VITE_MS1_URL ?? "http://localhost:8001",
  ms2: import.meta.env.VITE_MS2_URL ?? "http://localhost:8002",
});

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const value: ApiContextValue = {
    ms4: import.meta.env.VITE_MS4_URL ?? "http://localhost:8004",
    ms1: import.meta.env.VITE_MS1_URL ?? "http://localhost:8001",
    ms2: import.meta.env.VITE_MS2_URL ?? "http://localhost:8002",
  };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);
