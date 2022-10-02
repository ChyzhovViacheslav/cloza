import { BrowserRouter } from 'react-router-dom'
import App from '../../App';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Line from '../../components/interface/line/Line';
import Search from '../../components/search/Search';

interface IMyRoutes {
  children: any;
}

export default function MyRoutes({ children }: IMyRoutes) {
  return (
    <BrowserRouter>
      <Header />
      <Search />
      <App />
      <Line />
      <Footer />
    </BrowserRouter>
  )
}
