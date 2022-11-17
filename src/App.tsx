import { Error } from './pages/ErrorPage/ErrorPage';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Login } from './pages/LoginPage/Login';
import { Registration } from './pages/Registration/RegistrationPage';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
