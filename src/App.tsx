import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { Footer } from './components/Footer/Footer';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';
import { BoardsPage } from './pages/BoardsPage/BoardsPage';
import { Board } from './components/Board/Board';
import { SignUpPage } from './pages/RegistrationPage/RegistrationPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { LoginPage } from './pages/LoginPage/LoginPage';

function App() {
  return (
    <div className="container-xxl">
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/boards" element={<BoardsPage />}></Route>
        <Route path="/boards/:id" element={<Board />}></Route>
        <Route path="/registration" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
