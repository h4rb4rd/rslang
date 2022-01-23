import React from 'react';
import { Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Error from '../pages/Error';
import About from '../pages/About';

import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';

export const privateRoutes = [
  { id: '1', path: '/', component: <Page1 /> },
  { id: '2', path: '/page2', component: <Page2 /> },
  { id: '3', path: '/page3', component: <Page3 /> },
  { id: '4', path: '/about', component: <About /> },
  { id: '5', path: '/login', component: <Navigate to="/" /> },
  { id: '6', path: '*', component: <Error /> },
];

export const publicRoutes = [
  { id: '1', path: '/login', component: <Login /> },
  { id: '2', path: '/about', component: <About /> },
  { id: '3', path: '*', component: <Navigate to="/login" /> },
];
