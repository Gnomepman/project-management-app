import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';
import { BoardsPage } from './pages/BoardsPage/BoardsPage';
import { Board } from './components/Board/Board';
import { Loader } from './components/Loader/Loader';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { EditProfilePage } from './pages/EditProfilePage/EditProfilePage';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { IsLoggedRoute } from './components/PrivateRoute/IsLoggedRoute';

function App() {
  return (
    <>
      <Header />
      <div className="container-xxl">
        <Suspense fallback={<Loader />}>
          <ToastContainer position="top-right" hideProgressBar={true} theme="colored" />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/boards" element={<BoardsPage />} />
              <Route path="/boards/:id" element={<Board />} />
              <Route path="/edit-profile" element={<EditProfilePage />} />
            </Route>
            <Route path="/" element={<IsLoggedRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}></Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  );
}

export default App;
