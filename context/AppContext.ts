import { createContext } from "react";
import { DayAction, DayContextType } from "../types";

export const DayContext = createContext<DayContextType>(null);
export const DayDispatchContext =
  createContext<React.Dispatch<DayAction>>(null);
