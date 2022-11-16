import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

const loadingMarkup = (
  <div>
    <h3>Loading..</h3>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Suspense fallback={loadingMarkup}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>
);
