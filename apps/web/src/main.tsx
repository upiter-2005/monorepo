import { StrictMode } from 'react';

import './index.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './localization';
import App from './App';
import { AuthProvider } from './store/auth/AuthProvider';
import { store } from './store/trade/store';

const clientIdAuth = import.meta.env.VITE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientIdAuth}>
      <BrowserRouter>
        <AuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);
