import React, {createContext, useContext, useState} from 'react';

interface RefreshContextProps {
  refresh: boolean;
  setRefresh: (value: boolean) => void;
}

const RefreshContext = createContext<RefreshContextProps | undefined>(
  undefined,
);

export const RefreshProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <RefreshContext.Provider value={{refresh, setRefresh}}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = (): RefreshContextProps => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }
  return context;
};
