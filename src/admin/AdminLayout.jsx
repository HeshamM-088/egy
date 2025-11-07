import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const AdminLayout = ({ children }) => {
  const { logout, currentUser } = useAuth();
  return (
    <div className="min-h-screen grid grid-cols-12 bg-gray-50 dark:bg-gray-800">
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-teal-700 dark:text-teal-400">
            Admin
          </h2>
          <button
            className="text-sm px-2 py-1 rounded bg-red-600 text-white"
            onClick={logout}>
            Logout
          </button>
        </div>
        {currentUser && (
          <div className="mb-3 text-xs text-gray-600 dark:text-gray-400">
            {currentUser.name} • {currentUser.email}
          </div>
        )}
        <nav className="flex flex-col gap-2">
          <AdminLink to="/admin" label="Dashboard" />
          <AdminLink to="/admin/events" label="Events" />
          <AdminLink to="/admin/users" label="Users" />
          <AdminLink to="/admin/settings" label="Settings" />
        </nav>
      </aside>
      <main className="col-span-12 md:col-span-9 lg:col-span-10 p-4">
        {children}
      </main>
    </div>
  );
};

const AdminLink = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md transition-colors ${
          isActive
            ? "bg-teal-600 text-white"
            : "text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-gray-800 hover:text-teal-700 dark:hover:text-teal-300"
        }`
      }
      end={to === "/admin"}>
      {label}
    </NavLink>
  );
};

export default AdminLayout;
