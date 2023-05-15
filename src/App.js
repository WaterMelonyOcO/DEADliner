import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './style.scss';
import { MainPage } from './pages/MainPage/MainPage';
import { Layout } from './components/Layout/Layout';
import { LeftMenu } from './components/LeftMenu/LeftMenu';

function App() {
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
export default App;
