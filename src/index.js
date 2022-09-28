import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss'
import MyRoutes from './pages/MyRoutes/MyRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyRoutes/>
  </React.StrictMode>
);
