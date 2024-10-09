import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "../api/axios";
import type { Record } from "../DataTypes/record";

interface RecordsContextType {
  theme: string;
  setTheme: (theme: string) => void;
  search: string;
  setSearch: (search: string) => void;
  page: number;
  setPage: (page: number) => void;
  records: Record[];
  setRecords: (records: Record[]) => void;
  getRecords: () => Promise<void>;
  searchRecords: () => Promise<void>;
  isLoading: boolean;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: string) => void;
  sortOrder: string;
  sortBy: string;
  status: string;
  setStatus: (status: string) => void;
  limit: number;
  setLimit: (limit: number) => void;
  setUsername: (username: string) => void;
  username: string;
  leakedSources: number;
  setLeakedSources: (leakedSources: number) => void;
}

export const RecordsContext = createContext<RecordsContextType | undefined>(
  undefined
);

interface RecordsContextProviderProps {
  children: ReactNode;
}
const RecordsContextProvider: React.FC<RecordsContextProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  const [search, setSearch] = useState<string>("");

  const [page, setPage] = useState<number>(1);

  const [records, setRecords] = useState<Record[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [sortBy, setSortBy] = useState<string>("created_at");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const [status, setStatus] = useState<string>("");

  const [limit, setLimit] = useState<number>(10);

  const [username, setUsername] = useState<string>("");

  const [leakedSources, setLeakedSources] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Apply the current theme to the HTML element
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const getRecords = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(
        `/api/v0.1/records?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${sortOrder}${
          status ? `&status=${status}` : ""
        }${username ? `&username=${username}` : ""}${
          leakedSources && leakedSources > 0
            ? `&leaked_sources=${leakedSources}`
            : ""
        }`
      );

      setIsLoading(false);

      console.log(res);

      setRecords(res.data.data.records);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const searchRecords = async () => {
    try {
      setIsLoading(true);

      const res = await axios.post("/api/v0.1/search", {
        search,
        page,
        limit,
        // sortBy: "created_at",
        // order: "asc",
        // status: "pending",
        // username: "m",
        // leaked_sources: 0,
        // start: "2024-10-09T03:49:28.875Z",
        // end: "2024-10-09T03:49:28.875Z",
      });

      setIsLoading(false);

      console.log(res);

      setRecords(res.data.data.records);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <RecordsContext.Provider
      value={{
        getRecords,
        page,
        setPage,
        records,
        setRecords,
        search,
        setSearch,
        theme,
        setTheme,
        searchRecords,
        isLoading,
        setSortBy,
        setSortOrder,
        sortOrder,
        sortBy,
        status,
        setStatus,
        setLimit,
        limit,
        setUsername,
        username,
        leakedSources,
        setLeakedSources,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
};

export default RecordsContextProvider;
