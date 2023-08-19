// ThemeContext.js
import React, { createContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [extraInputs, setExtraInputs] = useState([]);
 

  return (
    <ThemeContext.Provider value={{ counter, setCounter,currentAnswers,setCurrentAnswers,extraInputs,setExtraInputs }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
