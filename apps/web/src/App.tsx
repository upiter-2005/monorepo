import { JSX } from 'react';

import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navigation';
import { ROUTES } from './constants/routes';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import TradePage from './pages/TradePage';
import UsersPage from './pages/UsersPage';

function App(): JSX.Element {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.USERS} element={<UsersPage />} />
        <Route path={`${ROUTES.TRADE}/:pair`} element={<TradePage />} />
      </Routes>
    </div>
  );
}

export default App;
