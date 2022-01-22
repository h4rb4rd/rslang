import React from 'react';
import { Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Error from '../pages/Error';

import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';

export const publicRoutes = [
  { id: '1', path: '/', component: <Page1 /> },
  { id: '4', path: '/page2', component: <Page2 /> },
  { id: '5', path: '/page3', component: <Page3 /> },
  { id: '2', path: '/login', component: <Navigate to="/" /> },
  { id: '3', path: '*', component: <Error /> },
];

export const privateRoutes = [
  { id: '1', path: '/login', component: <Login /> },
  { id: '2', path: '*', component: <Navigate to="/login" /> },
];
