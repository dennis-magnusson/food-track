import { createContext } from "react";
import { DayContextType } from "../types";

export const DayContext = createContext<DayContextType>(null);
export const DayDispatchContext = createContext(null);
