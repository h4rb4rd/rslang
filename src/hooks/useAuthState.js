import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';

export default function useAuthState() {
  const [authUserState, setAuthUserState] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setAuthUserState(user));

    return unsubscribe;
  }, []);

  return authUserState;
}
