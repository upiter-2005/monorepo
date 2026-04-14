import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navigation';
import { ROUTES } from './consts/routes';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Users from './pages/UsersPage';

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.USERS} element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
