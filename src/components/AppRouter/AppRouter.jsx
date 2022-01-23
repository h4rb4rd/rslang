import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContext from '../../context';

import { privateRoutes, publicRoutes } from '../../utils/router';

// components
import Header from '../Header';
import Footer from '../Footer/Footer';

function AppRouter() {
  const authUserState = useContext(AuthContext);

  return (
    <>
      {authUserState && <Header />}
      <main style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          {authUserState
            ? privateRoutes.map((route) => {
                return <Route key={route.id} path={route.path} element={route.component} />;
              })
            : publicRoutes.map((route) => {
                return <Route key={route.id} path={route.path} element={route.component} />;
              })}
        </Routes>
      </main>
      {authUserState && <Footer />}
    </>
  );
}

export default AppRouter;
