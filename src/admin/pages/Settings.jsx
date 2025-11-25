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
      setMessage("Please fill in all required fields.");
      return;
    }

    updateUser({ name, email });

    setPassword("");
    setMessage("Profile updated successfully.");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Admin Profile
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-6">
          <img
            src="https://i.postimg.cc/RFfkX04Q/logo.png"
            alt="Admin Avatar"
            className="w-20 h-20 rounded-full object-cover border border-gray-300 dark:border-gray-600"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {name || "Admin"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">System Administrator</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Field label="Admin ID">
            <input
              disabled
              value={currentUser?.id || "0001"}
              className="w-full bg-gray-100 dark:bg-gray-700 border dark:border-gray-600 rounded px-3 py-2 text-gray-600 dark:text-gray-300 cursor-not-allowed"
            />
          </Field>

          <Field label="Role">
            <input
              disabled
              value="Administrator"
              className="w-full bg-gray-100 dark:bg-gray-700 border dark:border-gray-600 rounded px-3 py-2 text-gray-600 dark:text-gray-300 cursor-not-allowed"
            />
          </Field>
        </div>

        <Field label="Full Name">
          <input
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        <Field label="Email Address">
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
            placeholder="Enter new password"
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>

        <button
          className="px-5 mt-4 py-2 rounded bg-teal-600 hover:bg-teal-700 text-white transition"
          onClick={save}
        >
          Save Changes
        </button>

        {message && (
          <div className="mt-3 text-sm text-teal-700 dark:text-teal-300">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <div className="mb-3">
    <div className="mb-1 text-sm text-gray-600 dark:text-gray-300">{label}</div>
    {children}
  </div>
);

export default Settings;
