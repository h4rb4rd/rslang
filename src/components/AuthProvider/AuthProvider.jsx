import React, { useState } from 'react';

import AuthContext from '../../context';
import { useAuth } from '../../utils/firebase';

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(false);

  useAuth().then((user) => {
    setCurrentUser(user);
  });

  return <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>;
}
export default AuthProvider;
