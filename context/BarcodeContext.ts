import { createContext } from "react";
import { BarcodeContextType } from "../types";

export const BarcodeContext = createContext<BarcodeContextType>(null);
