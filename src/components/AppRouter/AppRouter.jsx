import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContext from '../../context';

import { privateRoutes, publicRoutes } from '../../utils/router';

// components
import Header from '../header';

function AppRouter() {
  const currentUser = useContext(AuthContext);

  return (
    <>
      {currentUser && <Header />}
      <Routes>
        {currentUser
          ? publicRoutes.map((route) => {
              return <Route key={route.id} path={route.path} element={route.component} />;
            })
          : privateRoutes.map((route) => {
              return <Route key={route.id} path={route.path} element={route.component} />;
            })}
      </Routes>
    </>
  );
}

export default AppRouter;
