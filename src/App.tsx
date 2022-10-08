import React from 'react';
import styles from './styles/App.module.scss';
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Rules from './pages/Rules/Rules';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Security from './pages/Security/Security';
import Faq from './pages/Faq/Faq';
import Contacts from './pages/Contacts/Contacts';
import Terms from './pages/Terms/Terms';
import Privacy from './pages/Privacy/Privacy';
import Male from './pages/Male/Male';

export default function App() {
  return (
    <main className={styles.page}>
      <div className={styles.page + ' _container'}>
        <div className={styles.page__body}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/rules' element={<Rules />} />
            <Route path='/security' element={<Security/>}/>
            <Route path='/faq' element={<Faq/>}/>
            <Route path='/contacts' element={<Contacts/>}/>
            <Route path='/terms' element={<Terms/>}/>
            <Route path='/privacy' element={<Privacy/>}/>
            <Route path='/male/*' element={<Male/>}/>
            <Route path='*' element={<Navigate to='/404' replace/>} />
            <Route path='/404' element={<PageNotFound/>}/>
          </Routes>
        </div>
      </div>
    </main>
  );
}