import React, { useEffect } from 'react';
import styles from './styles/App.module.scss';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
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
import Female from './pages/Female/Female';
import Unisex from './pages/Unisex/Unisex';
import Profile from './pages/Profile/Profile';
import Sell from './pages/Sell/Sell';
import Product from './pages/Product/ProductPage';
import Brands from './pages/Brands/Brands';
import Salers from './pages/Salers/Salers';
import Categories from './pages/Categories/Categories';
import SalerPage from './pages/SalerPage/SalerPage';
import Ordering from './pages/Ordering/Ordering';
import Sale from './pages/Sale/Sale';

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <main className={styles.page}>
      <div className={styles.page__container + ' _container'}>
        <div className={styles.page__body}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/rules' element={<Rules />} />
            <Route path='/security' element={<Security />} />
            <Route path='/faq' element={<Faq />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/sell' element={<Sell />} />
            <Route path='/male' element={<Male />} />
            <Route path='/female' element={<Female />} />
            <Route path='/unisex' element={<Unisex />} />
            <Route path='/sale' element={<Sale />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/brands' element={<Brands />} />
            <Route path='/salers' element={<Salers />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/ordering' element={<Ordering />} />
            <Route path='/saler/:id' element={<SalerPage />} />
            <Route path='*' element={<Navigate to='/404' replace />} />
            <Route path='/404' element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}