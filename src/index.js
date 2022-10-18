import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss'
import MyRoutes from './pages/MyRoutes/MyRoutes';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { PersistGate } from 'redux-persist/integration/react'
import './firebase.js'
import { persistStore } from 'redux-persist'

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = setupStore()
const persistor = persistStore(store)

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <MyRoutes />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
