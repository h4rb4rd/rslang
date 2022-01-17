import React from 'react';
import { Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import TemporaryHomepage from '../pages/TemporaryHomepage';
import Error from '../pages/Error';

export const publicRoutes = [
  { id: '1', path: '/', component: <TemporaryHomepage /> },
  { id: '2', path: '/login', component: <Navigate to="/" /> },
  { id: '3', path: '*', component: <Error /> },
];

export const privateRoutes = [
  { id: '1', path: '/login', component: <Login /> },
  { id: '2', path: '*', component: <Navigate to="/login" /> },
];
