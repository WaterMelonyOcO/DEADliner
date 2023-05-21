import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.scss';
import { MainPage } from './pages/MainPage/MainPage';
import { Layout } from './components/Layout/Layout';
import { GoToArchive } from './components/GoToArchive/GoToArchive';
import { LeftMenu } from './components/LeftMenu/LeftMenu';
import { TopMenu } from './components/TopMenu/TopMenu';
import { CreateTaskBtn } from './components/CreateTaskBtn/CreateTaskBtn';

function App() {
  return (<div className='body'>
    <BrowserRouter>
    <div className='body__content'>
    {/* <Layout> */}
      <div className='body__content-left'>
      <LeftMenu /> 
      </div>

      <div className='body__content-top'>
        <TopMenu />
      </div>

      <div className='body__content-center'>
        <Routes>
          
          <Route path='/' element={<MainPage />}></Route>

          </Routes>
      </div>
          
      {/* </Layout> */}
      <CreateTaskBtn />
      </div>
      </BrowserRouter>
  </div>

  );
}
export default App;
