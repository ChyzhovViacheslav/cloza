import React, {useEffect} from 'react';
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
import Female from './pages/Female/Female';
import Unisex from './pages/Unisex/Unisex';
import Profile from './pages/Profile/Profile';
import Sell from './pages/Sell/Sell';
import { useAppDispatch } from './hooks/redux';
import { filterSlice } from './store/reducers/ProductFilter';
import { postApi } from './services/PostService';

export default function App() {
  const {setData} = filterSlice.actions
  const dispatch = useAppDispatch()
  const {data, isLoading} = postApi.useFetchAllProductQuery(null)

  useEffect(() => {
    if (!isLoading){
      dispatch(setData(data))
    }
  }, [isLoading])  

  return (
    <main className={styles.page}>
      <div className={styles.page__container + ' _container'}>
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
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/sell' element={<Sell/>}/>
            <Route path='/male' element={<Male/>}/>
            <Route path='/female' element={<Female/>}/>
            <Route path='/unisex' element={<Unisex/>}/>
            <Route path='*' element={<Navigate to='/404' replace/>} />
            <Route path='/404' element={<PageNotFound/>}/>
          </Routes>
        </div>
      </div>
    </main>
  );
}