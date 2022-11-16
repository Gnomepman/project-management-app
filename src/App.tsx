import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WelcomePage } from './pages/WelcomePage';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <div className="container-xxl">
      <WelcomePage />
      <Footer />
    </div>
  );
}

export default App;
