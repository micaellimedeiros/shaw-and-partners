import React, { createContext, useContext, ReactNode, useState } from "react";

import { toast } from "react-toastify";

import api from "../services/api";

interface AppContextProps {
  children: ReactNode;
}

export interface Card {
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}

interface AppContextValue {
  loading: boolean;
  cards: Card[];
  uploadFile: (file: File) => Promise<void>;
  search: (query: string) => Promise<void>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<AppContextProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);

  const uploadFile = async (file: File) => {
    if (file)
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post("/api/files", formData);

        setCards(response.data.csv.data);

        toast.success(response.data.message);
      } catch (error: any) {
        toast.error(`Error uploading file. "${error.message}"`);
      } finally {
        setLoading(false);
      }
  };

  const search = async (query: string) => {
    try {
      setLoading(true);

      const response = await api.get("/api/users", {
        params: { q: query },
      });

      setCards(response.data.data);
    } catch (error: any) {
      toast.error(`Error searching. "${error.message}"`);
    } finally {
      setLoading(false);
    }
  };

  const contextValue: AppContextValue = {
    loading,
    cards,
    uploadFile,
    search,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
