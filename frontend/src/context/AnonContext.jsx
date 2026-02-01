import { createContext, useContext, useEffect, useState } from 'react';

const AnonContext = createContext(null);

export const AnonProvider = ({ children }) => {
  const [anonymous, setAnonymous] = useState(() => {
    const stored = localStorage.getItem('anonymous_mode');
    return stored ? stored === 'true' : false;
  });

  useEffect(() => {
    localStorage.setItem('anonymous_mode', String(anonymous));
  }, [anonymous]);

  return (
    <AnonContext.Provider value={{ anonymous, setAnonymous }}>
      {children}
    </AnonContext.Provider>
  );
};

export const useAnon = () => useContext(AnonContext);
