import React from 'react';
import { Error } from './pages/ErrorPage/ErrorPage';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';

function App() {
  return (
    <div className="container-xxl">
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
