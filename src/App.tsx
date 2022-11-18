import React from 'react';
import { Error } from './pages/ErrorPage/ErrorPage';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BoardsPage } from './pages/BoardsPage/BoardsPage';
import { Board } from './components/Board/Board';
import { Footer } from './components/Footer/Footer';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';

function App() {
  return (
    <div className="container-xxl">
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/boards" element={<BoardsPage />}></Route>
        <Route path="/boards/:id" element={<Board />}></Route>
        {/* <Route path="/registration" element={}></Route> */}
        {/* <Route path="/login" element={}></Route> */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
