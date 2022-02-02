import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContext from '../../context';

import { privateRoutes, publicRoutes } from '../../utils/router';

// components
import Header from '../Header';
import Footer from '../Footer/Footer';

function AppRouter() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  return (
    <>
      {isAuth && <Header />}
      <main style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          {isAuth
            ? privateRoutes.map((route) => {
                return <Route key={route.id} path={route.path} element={route.component} />;
              })
            : publicRoutes.map((route) => {
                return <Route key={route.id} path={route.path} element={route.component} />;
              })}
        </Routes>
      </main>
      {isAuth && <Footer />}
    </>
  );
}

export default AppRouter;
