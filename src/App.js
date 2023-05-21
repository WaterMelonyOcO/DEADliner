import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.scss';
import { MainPage } from './pages/MainPage/MainPage';
import { LeftMenu } from './components/LeftMenu/LeftMenu';
import { TopMenu } from './components/TopMenu/TopMenu';
import { CreateTaskBtn } from './components/CreateTaskBtn/CreateTaskBtn';
import { ArchivePage } from './pages/ArchivePage/ArchivePage';

function App() {
  return (<div className='body'>

    <BrowserRouter>
    <div className='body__content'>

        <div className='body__content-left'>
        <LeftMenu /> 
        </div>

        <div className='body__content-top'>
          <TopMenu />
        </div>

        <div className='body__content-center'>
          <Routes>
            
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/archive' element={<ArchivePage />}></Route>
            </Routes>
        </div>

      <CreateTaskBtn />
    </div>
    </BrowserRouter>
  </div>

  );
}
export default App;
