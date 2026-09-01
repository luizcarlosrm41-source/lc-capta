import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { ROUTES } from '@/constants/routes';

import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import NotFound from '@/pages/NotFound';

import ColaboradorLayout from '@/pages/colaborador/ColaboradorLayout';
import ColaboradorHome from '@/pages/colaborador/Home';
import NovaOportunidade from '@/pages/colaborador/NovaOportunidade';
import MinhasOportunidades from '@/pages/colaborador/MinhasOportunidades';
import Perfil from '@/pages/colaborador/Perfil';

import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminOportunidades from '@/pages/admin/Oportunidades';
import AdminColaboradores from '@/pages/admin/Colaboradores';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />

          {/* Público */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />

          {/* Área do colaborador */}
          <Route element={<ProtectedRoute allowedRoles={['colaborador', 'admin']} />}>
            <Route path={ROUTES.COLABORADOR_HOME} element={<ColaboradorLayout />}>
              <Route index element={<ColaboradorHome />} />
              <Route path="nova-oportunidade" element={<NovaOportunidade />} />
              <Route path="minhas-oportunidades" element={<MinhasOportunidades />} />
              <Route path="perfil" element={<Perfil />} />
            </Route>
          </Route>

          {/* Área administrativa */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path={ROUTES.ADMIN_HOME} element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="oportunidades" element={<AdminOportunidades />} />
              <Route path="colaboradores" element={<AdminColaboradores />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
