import { Error } from './pages/ErrorPage/ErrorPage';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BoardsPage } from './pages/BoardsPage/BoardsPage';
import { Board } from './components/Board/Board';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        {/* <Route path="/" element={ }></Route>  */}
        <Route path="/boards" element={<BoardsPage />}></Route>
        <Route path="/boards/:id" element={<Board />}></Route>
        {/* <Route path="/registration" element={}></Route> */}
        {/* <Route path="/login" element={}></Route> */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
