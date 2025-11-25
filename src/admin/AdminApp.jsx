import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Users from "./pages/Users";
import Settings from "./pages/Settings";


const AdminApp = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="events" element={<Events />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};


export default AdminApp;


