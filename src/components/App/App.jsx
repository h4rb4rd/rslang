import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from '../AuthProvider';
import AppRouter from '../AppRouter/AppRouter';

// styles
import cl from './App.module.scss';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className={cl.app}>
          <AppRouter />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
