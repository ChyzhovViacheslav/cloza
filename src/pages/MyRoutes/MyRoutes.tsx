import { BrowserRouter } from 'react-router-dom'
import App from '../../App';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Breadcrumbs from '../../components/interface/breadcrumbs/Breadcrumbs';
import Line from '../../components/interface/line/Line';
import LoginModal from '../../components/loginModal/LoginModal';
import Search from '../../components/search/Search';
import SignupModal from '../../components/signupmodal/SignupModal';
import { useAppSelector } from '../../hooks/redux';
import useAuth from '../../hooks/userAuth';

export default function MyRoutes() {
  const {type} = useAppSelector(state => state.modalReducer)
  const {isAuth} = useAuth()
  return (
    <BrowserRouter>
      <main className='wrapper' style={{position: 'relative'}}>
        <Header />
        <Search />
        <Breadcrumbs/>
        <App />
        <Line />
        <Footer />
        {type === 'login' ? <LoginModal/> : <SignupModal/>}
      </main>
    </BrowserRouter>
  )
}
