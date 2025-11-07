import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

const Settings = () => {
  const { currentUser, updateUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

  const save = () => {
    if (!name || !email) {
      setMessage("Please fill in all fields.");
      return;
    }
    updateUser({ name, email });
    setPassword("");
    setMessage("Settings saved.");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Settings
      </h1>
      <div className="mt-4 max-w-xl space-y-4">
        <Field label="Name">
          <input
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Password">
          <input
            type="password"
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </Field>
        <button
          className="px-4 py-2 rounded bg-teal-600 text-white"
          onClick={save}>
          Save Changes
        </button>
        {message && (
          <div className="mt-2 text-sm text-teal-700 dark:text-teal-300">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <div>
    <div className="mb-1 text-sm text-gray-600 dark:text-gray-300">{label}</div>
    {children}
  </div>
);

export default Settings;
