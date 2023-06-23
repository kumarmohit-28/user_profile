import React, { createContext, useState } from 'react';

// Create a new context
const UserContext = createContext();

// Create a provider component to wrap your application
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
