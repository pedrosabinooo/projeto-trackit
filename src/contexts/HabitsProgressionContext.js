import { createContext, useState } from "react";

const HabitsProgressionContext = createContext();

export function HabitsProgressionProvider({ children }) {
    const [percentage, setPercentage] = useState(0);
  return (
    <HabitsProgressionContext.Provider value={{percentage, setPercentage}}>
      {children}
    </HabitsProgressionContext.Provider>
  );
}

export default HabitsProgressionContext;
