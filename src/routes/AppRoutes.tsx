import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from '../hooks/UseAuth';
import LoginPage from '../pages/LoginPage';
import DragonsListPage from '../pages/DragonsListPage';
import DragonDetailPage from '../pages/DragonDetailsPage';
import DragonFormPage from '../pages/DragonFormPage';


export default function AppRoutes() {
  const { loggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!loggedIn ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/" element={loggedIn ? <DragonsListPage/> : <Navigate to="/login" /> } />
      <Route path="/dragon/:id" element={loggedIn ? <DragonDetailPage /> : <Navigate to="/login" />} />
      <Route path="/dragon/edit/:id" element={loggedIn ? <DragonFormPage /> : <Navigate to="/login" />} />
      <Route path="/dragon/create/" element={loggedIn ? <DragonFormPage /> : <Navigate to="/login" />} />
      <Route path="*" element={!loggedIn ? <Navigate to="/login" /> : <p>Página não encontrada</p>} />
    </Routes>
  );
}