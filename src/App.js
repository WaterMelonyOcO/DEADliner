import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import './style.scss';
import { MainPage } from './pages/MainPage/MainPage';

export function App() {
  return (<>
    <BrowserRouter>
    <Layout>
        <Routes>
          <Route path='/' element={<MainPage />}></Route>
        </Routes>
      </Layout>
      </BrowserRouter>
  </>

  );
}
