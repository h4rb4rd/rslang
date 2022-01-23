import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import AuthContext from '../../context';
import { auth } from '../../utils/firebase';

function AuthProvider({ children }) {
  const [authUserState, setAuthUserState] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setAuthUserState(user));

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={authUserState}>{children}</AuthContext.Provider>;
}
export default AuthProvider;
