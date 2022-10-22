import { createContext, useState } from "react";

const HabitsCompletionContext = createContext();

export function HabitsCompletionProvider({ children }) {
    const [percentage, setPercentage] = useState(0);
  return (
    <HabitsCompletionContext.Provider value={{percentage, setPercentage}}>
      {children}
    </HabitsCompletionContext.Provider>
  );
}

export default HabitsCompletionContext;
