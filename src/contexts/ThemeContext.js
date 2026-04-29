import { createContext } from "react";

const ThemeContext = createContext('light');

export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;
export default ThemeContext;