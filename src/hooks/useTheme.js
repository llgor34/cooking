import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const useTheme = () => {
  const ctx = useContext(ThemeContext);

  if (ctx === undefined) {
    throw new Error('useTheme() must be used inside a ThemeProvider!');
  }

  return ctx;
};

export { useTheme };
