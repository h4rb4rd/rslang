import React from 'react';
import { Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Error from '../pages/Error';
import About from '../pages/About';

import Textbook from '../pages/Textbook';
import Dictionary from '../pages/Dictionary';
import Games from '../pages/Games';
import Statistics from '../pages/Statistics';
import Team from '../pages/Team';
import Savannah from '../pages/Savannah';
import Audiocall from '../pages/Audiocall';
import Sprint from '../pages/Sprint';
import Owngame from '../pages/Owngame';

export const privateRoutes = [
  { id: '1', path: '/', component: <About /> },
  { id: '2', path: '/textbook', component: <Textbook /> },
  { id: '3', path: '/dictionary', component: <Dictionary /> },
  { id: '4', path: '/games', component: <Games /> },
  { id: '5', path: '/statistics', component: <Statistics /> },
  { id: '6', path: '/team', component: <Team /> },
  { id: '7', path: '/savannah', component: <Savannah /> },
  { id: '8', path: '/audiocall', component: <Audiocall /> },
  { id: '9', path: '/sprint', component: <Sprint /> },
  { id: '10', path: '/owngame', component: <Owngame /> },
  { id: '11', path: '/login', component: <Navigate to="/" /> },
  { id: '12', path: '*', component: <Error /> },
];

export const publicRoutes = [
  { id: '1', path: '/login', component: <Login /> },
  { id: '2', path: '/about', component: <About /> },
  { id: '3', path: '*', component: <Navigate to="/login" /> },
];
