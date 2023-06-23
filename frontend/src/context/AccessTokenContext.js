import React, { createContext, useState } from 'react';

const AccessTokenContext = createContext();

const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export { AccessTokenContext, AccessTokenProvider };
