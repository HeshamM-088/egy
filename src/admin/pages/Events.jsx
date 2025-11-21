import { useEffect, useState } from "react";
import { cardsData } from "../../pages/places/dataPlace";

const seedFromCards = () => {
  return cardsData.slice(0, 6).map((c, idx) => ({
    id: String(idx + 1),
    title: c.title,
    description: c.content1 || "",
    date: new Date().toISOString().slice(0, 10),
    location: c.location,
    image: c.img,
    entryFee: "",
    openingFrom: "",
    openingTo: "",
    category: "Historical",
  }));
};

const Events = () => {
  const [events, setEvents] = useState(() => {
    try {
      const stored = localStorage.getItem("admin_events");
      return stored ? JSON.parse(stored) : seedFromCards();
    } catch {
      return seedFromCards();
    }
  });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: "",
    entryFee: "",
    openingFrom: "",
    openingTo: "",
    category: "Historical",
  });

  useEffect(() => {
    localStorage.setItem("admin_events", JSON.stringify(events));
  }, [events]);

  const openAdd = () => {
    setForm({
      title: "",
      description: "",
      date: "",
      location: "",
      image: "",
      entryFee: "",
      openingFrom: "",
      openingTo: "",
      category: "Historical",
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (ev) => {
    setForm({
      title: ev.title,
      description: ev.description,
      date: ev.date,
      location: ev.location,
      image: ev.image,
      entryFee: ev.entryFee || "",
      openingFrom: ev.openingFrom || "",
      openingTo: ev.openingTo || "",
      category: ev.category || "Historical",
    });
    setIsEditing(true);
    setEditingId(ev.id);
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const saveForm = () => {
    if (!form.title || !form.date || !form.location) {
      showToast("Please fill required fields (title, date, location)");
      return;
    }

    if (!form.openingFrom || !form.openingTo) {
      showToast("Please enter opening hours");
      return;
    }

    if (form.openingFrom >= form.openingTo) {
      showToast("Opening time must be before closing time");
      return;
    }

    if (isEditing) {
      setEvents(
        events.map((e) => (e.id === editingId ? { ...e, ...form } : e))
      );
      showToast("Event updated");
    } else {
      const newEvent = { id: String(Date.now()), ...form };
      setEvents([newEvent, ...events]);
      showToast("Event added");
    }

    setShowForm(false);
  };

  const askDelete = (id) => setConfirmId(id);

  const confirmDelete = () => {
    if (confirmId) {
      setEvents(events.filter((e) => e.id !== confirmId));
      showToast("Event deleted");
      setConfirmId(null);
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
          Events
        </h1>
        <button
          className="px-4 py-2 rounded bg-teal-600 text-white"
          onClick={openAdd}
        >
          Add Event
        </button>
      </div>

      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Manage your events.
      </p>

      {toast && (
        <div className="mt-3 text-sm text-teal-700 dark:text-teal-300">
          {toast}
        </div>
      )}

      {/* TABLE */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Date</Th>
              <Th>Location</Th>
              <Th>Entry Fee</Th>
              <Th>Opening Hours</Th>
              <Th>Category</Th>
              <Th>Image</Th>
              <Th>Action</Th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {events.map((ev) => (
              <tr key={ev.id}>
                <Td>{ev.title}</Td>

                <Td>
                  <span className="line-clamp-2">{ev.description}</span>
                </Td>

                <Td>{ev.date}</Td>

                <Td>{ev.location}</Td>

                <Td>{ev.entryFee ? `${ev.entryFee} EGP` : "N/A"}</Td>

                <Td>
                  {ev.openingFrom && ev.openingTo
                    ? `${ev.openingFrom} - ${ev.openingTo}`
                    : "N/A"}
                </Td>

                <Td>{ev.category}</Td>

                <Td>
                  {ev.image ? (
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-16 h-10 object-cover rounded"
                    />
                  ) : (
                    <span className="text-xs text-gray-500">No image</span>
                  )}
                </Td>

                <Td>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 rounded bg-teal-600 text-white"
                      onClick={() => openEdit(ev)}
                    >
                      Edit
                    </button>

                    <button
                      className="px-3 py-1 rounded bg-red-600 text-white"
                      onClick={() => askDelete(ev.id)}
                    >
                      Delete
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <Modal
          onClose={closeForm}
          title={isEditing ? "Edit Event" : "Add Event"}
        >
          <div className="space-y-3">

            <Field label="Title">
              <input
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Field>

            <Field label="Description">
              <textarea
                rows="3"
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Date">
                <input
                  type="date"
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </Field>

              <Field label="Location">
                <input
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
              </Field>
            </div>

            <Field label="Image URL">
              <input
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </Field>

            {/* Entry Fee */}
            <Field label="Entry Fee (EGP)">
              <input
                type="number"
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
                value={form.entryFee}
                onChange={(e) =>
                  setForm({ ...form, entryFee: e.target.value })
                }
              />
            </Field>

            {/* Opening Hours */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Opening From">
                <input
                  type="time"
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
                  value={form.openingFrom}
                  onChange={(e) =>
                    setForm({ ...form, openingFrom: e.target.value })
                  }
                />
              </Field>

              <Field label="Opening To">
                <input
                  type="time"
                  className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
                  value={form.openingTo}
                  onChange={(e) =>
                    setForm({ ...form, openingTo: e.target.value })
                  }
                />
              </Field>
            </div>

            {/* Category */}
            <Field label="Category">
              <select
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="Historical">Historical</option>
                <option value="Cultural">Cultural</option>
                <option value="Natural">Natural</option>
              </select>
            </Field>

            <div className="flex justify-end gap-2 pt-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                onClick={closeForm}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded bg-teal-600 text-white"
                onClick={saveForm}
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      {confirmId && (
        <Modal onClose={cancelDelete} title="Confirm Delete">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this event?
          </p>

          <div className="flex justify-end gap-2 pt-4">
            <button
              className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              onClick={cancelDelete}
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 rounded bg-red-600 text-white"
              onClick={confirmDelete}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

// COMPONENTS
const Th = ({ children }) => (
  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
    {children}
  </th>
);

const Td = ({ children }) => (
  <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100 align-top">
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
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
};

export default Events;
