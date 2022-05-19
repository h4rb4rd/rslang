import React, { useState, useEffect, useMemo } from 'react';

import AuthContext from '../../context';

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      setIsAuth(true);
    }
  }, []);

  const authData = useMemo(() => ({ isAuth, setIsAuth }), [isAuth]);

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
}
export default AuthProvider;
