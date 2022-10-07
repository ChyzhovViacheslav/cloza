import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss'
import MyRoutes from './pages/MyRoutes/MyRoutes';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = setupStore()

root.render(

  <Provider store={store}>
    <React.StrictMode>
      <MyRoutes />
    </React.StrictMode>
  </Provider>
);
