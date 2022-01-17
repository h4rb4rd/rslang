import React, { useState } from 'react';

import { logout } from '../utils/firebase';

function TemporaryHomepage() {
  const [loading, setLoading] = useState(false);

  const hadnleLogout = async () => {
    setLoading(true);

    try {
      await logout();
    } catch (err) {
      throw new Error(err);
    }

    setLoading(false);
  };

  return (
    <div>
      <button onClick={hadnleLogout} disabled={loading}>
        Logout
      </button>
    </div>
  );
}

export default TemporaryHomepage;
