import { createContext, useEffect } from "react";
import { useState } from "react";

export type Theme = "default" | "theme-dark";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState = () => {
  const localTheme = localStorage.getItem("theme") as Theme;
  if (localTheme) return localTheme;
  else return "default";
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined,
);

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [theme, setTheme] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
