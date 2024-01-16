import { useContext } from "react";
import { BarcodeContext } from "../context/BarcodeContext";
import { BarcodeContextType } from "../types";

export const useBarcode = (): BarcodeContextType => {
  const context = useContext(BarcodeContext);
  if (!context) {
    throw new Error("useBarcode must be used within a BarcodeProvider");
  }
  return context;
};
