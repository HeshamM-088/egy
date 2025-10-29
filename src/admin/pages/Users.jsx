import { useEffect, useState } from "react";

const initialUsers = [
  { id: 1, name: "Admin", email: "admin@egyguide.com", role: "admin" },
  { id: 2, name: "Sara Ali", email: "sara@example.com", role: "user" },
  { id: 3, name: "Omar Nabil", email: "omar@example.com", role: "user" },
];

const Users = () => {
  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem("admin_users");
      return stored ? JSON.parse(stored) : initialUsers;
    } catch {
      return initialUsers;
    }
  });
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "user" });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem("admin_users", JSON.stringify(users));
  }, [users]);

  const startAdd = () => {
    setForm({ name: "", email: "", role: "user" });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (u) => {
    setEditingId(u.id);
    setForm({ name: u.name, email: u.email, role: u.role });
    setIsEditing(true);
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditingId(null);
    setForm({ name: "", email: "", role: "user" });
  };

  const saveForm = () => {
    if (!form.name || !form.email) {
      showToast("Please fill name and email");
      return;
    }
    if (isEditing && editingId != null) {
      setUsers(users.map((u) => (u.id === editingId ? { ...u, ...form } : u)));
      showToast("User updated");
    } else {
      const newUser = { id: Date.now(), ...form };
      setUsers([newUser, ...users]);
      showToast("User added");
    }
    cancelForm();
  };

  const askDelete = (id) => setConfirmId(id);
  const confirmDelete = () => {
    if (confirmId != null) {
      setUsers(users.filter((u) => u.id !== confirmId));
      setConfirmId(null);
      showToast("User deleted");
    }
  };
  const cancelDelete = () => setConfirmId(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Users
        </h1>
        <button
          className="px-4 py-2 rounded bg-teal-600 text-white"
          onClick={startAdd}>
          Add User
        </button>
      </div>
      {toast && (
        <div className="mt-3 text-sm text-teal-700 dark:text-teal-300">
          {toast}
        </div>
      )}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {users.map((u) => (
              <tr key={u.id}>
                <Td>
                  {editingId === u.id ? (
                    <input
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-800 dark:text-gray-100"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  ) : (
                    u.name
                  )}
                </Td>
                <Td>
                  {editingId === u.id ? (
                    <input
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-800 dark:text-gray-100"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  ) : (
                    u.email
                  )}
                </Td>
                <Td>
                  {editingId === u.id ? (
                    <select
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-800 dark:text-gray-100"
                      value={form.role}
                      onChange={(e) =>
                        setForm({ ...form, role: e.target.value })
                      }>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  ) : (
                    u.role
                  )}
                </Td>
                <Td>
                  {editingId === u.id ? (
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 rounded bg-teal-600 text-white"
                        onClick={saveForm}>
                        Save
                      </button>
                      <button
                        className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                        onClick={cancelForm}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 rounded bg-teal-600 text-white"
                        onClick={() => startEdit(u)}>
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 rounded bg-red-600 text-white"
                        onClick={() => askDelete(u.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <Modal
          onClose={cancelForm}
          title={isEditing ? "Edit User" : "Add User"}>
          <div className="space-y-3">
            <Field label="Name">
              <input
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Field>
            <Field label="Role">
              <select
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </Field>
            <div className="flex justify-end gap-2 pt-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                onClick={cancelForm}>
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-teal-600 text-white"
                onClick={saveForm}>
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {confirmId != null && (
        <Modal onClose={cancelDelete} title="Confirm Delete">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this user?
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <button
              className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              onClick={cancelDelete}>
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-red-600 text-white"
              onClick={confirmDelete}>
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

const Th = ({ children }) => (
  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
    {children}
  </th>
);
const Td = ({ children }) => (
  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">
    {children}
  </td>
);

const Field = ({ label, children }) => (
  <div>
    <div className="mb-1 text-sm text-gray-600 dark:text-gray-300">{label}</div>
    {children}
  </div>
);

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
};

export default Users;
