import React, { createContext, useContext, useState } from 'react';

// Create a context with default values (these can be anything).
const EditProtocolContext = createContext({
  protocol: null,
  setCurrentProtocol: () => {}
});

export const useChangeClientProtocol = () => {
  return useContext(EditProtocolContext);
}

export const EditProtocolProvider = ({ children }) => {
  const [newClientProtocol, setClientProtocol] = useState(null);

  return (
    <EditProtocolContext.Provider value={[ newClientProtocol, setClientProtocol ]}>
      {children}
    </EditProtocolContext.Provider>
  );
}