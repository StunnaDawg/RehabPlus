// import React, { createContext, useContext, useState } from 'react';

// // Create a context with default values (these can be anything).
// const AddProtocolContext = createContext({
//   protocol: null,
//   setCurrentProtocol: () => {}
// });

// export const useAddClientProtocol = () => {
//   return useContext(AddProtocolContext);
// }

// export const AddProtocolProvider = ({ children }) => {
//   const [newClientProtocol, setClientProtocol] = useState(null);

//   return (
//     <AddProtocolContext.Provider value={[ newClientProtocol, setClientProtocol ]}>
//       {children}
//     </AddProtocolContext.Provider>
//   );
// }
