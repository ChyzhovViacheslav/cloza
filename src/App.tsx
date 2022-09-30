import React from 'react';
import styles from './styles/App.module.scss';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';

interface IApp {
  children?: any;
}

function App({ children }: IApp) {
  return (
    <main className={styles.page}>
      <div className={styles.page + ' _container'}>
        <div className={styles.page__body}>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
