import { BrowserRouter } from 'react-router-dom'
import App from '../../App';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Line from '../../components/interface/line/Line';
import LoginModal from '../../components/loginModal/LoginModal';
import Search from '../../components/search/Search';
import { useAppSelector } from '../../hooks/redux';

export default function MyRoutes() {
  const {type} = useAppSelector(state => state.modalReducer)
  return (
    <BrowserRouter>
      <main className='wrapper' style={{position: 'relative'}}>
        <Header />
        <Search />
        <App />
        <Line />
        <Footer />
        <LoginModal type={type}/>
      </main>
    </BrowserRouter>
  )
}
