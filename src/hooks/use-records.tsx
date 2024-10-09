import { useContext } from "react";
import { RecordsContext } from "../context/RecordsContextProvider";

const useRecords = () => {
  const context = useContext(RecordsContext);

  if (!context) {
    throw new Error("useRecords must be used within a RecordsContextProvider");
  }

  return context;
};

export default useRecords;
