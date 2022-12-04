import ReactDOM from 'react-dom/client';
import App from './App';
import './App.scss';
import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Snowfall from 'react-snowfall';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Snowfall
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
      />
      <App />
    </BrowserRouter>
  </Provider>
);
