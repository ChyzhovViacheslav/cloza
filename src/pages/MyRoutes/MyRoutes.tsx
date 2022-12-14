import { BrowserRouter } from 'react-router-dom'
import App from '../../App';
import FavModal from '../../components/smModal/SmModal';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Breadcrumbs from '../../components/interface/breadcrumbs/Breadcrumbs';
import Line from '../../components/interface/line/Line';
import LoginModal from '../../components/loginModal/LoginModal';
import Search from '../../components/search/Search';
import SignupModal from '../../components/signupmodal/SignupModal';
import { useAppSelector } from '../../hooks/redux';
import Loader from '../../components/interface/loader/Loader';
import { useState } from 'react';

export default function MyRoutes() {
  const { type } = useAppSelector(state => state.modalReducer)
  const { typeSm } = useAppSelector(state => state.smModalReducer)
  const { isLoading } = useAppSelector(state => state.loaderReducer)
  const [modalIsActive, setModalIsActive] = useState(false)
  const [favModalIsActive, setFavModalIsActive] = useState(false)

  return (
    <BrowserRouter>
      <main className='wrapper' style={{ position: 'relative' }}>
        <Header
          setFavModalIsActive={setFavModalIsActive}
          setModalIsActive={setModalIsActive} />
        <Search />
        <Breadcrumbs />
        <App />
        <Line />
        <Footer />
        {type === 'login' ?
          <LoginModal
            modalIsActive={modalIsActive}
            setModalIsActive={setModalIsActive} /> :
          <SignupModal  
            modalIsActive={modalIsActive}
            setModalIsActive={setModalIsActive}/>}
        <FavModal
          modalIsActive={modalIsActive}
          setModalIsActive={setModalIsActive}
          favModalIsActive={favModalIsActive}
          setFavModalIsActive={setFavModalIsActive}
          type={typeSm} />
        <Loader isLoading={isLoading} />
      </main>
    </BrowserRouter>
  )
}
