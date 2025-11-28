import React, { useEffect, useState } from "react";
import EventFormModal from "../components/EventFormModal";

const rawBase =
  import.meta.env.VITE_API_URL || `https://egi-topaz.vercel.app/api/v1/`;
const BASE = rawBase.endsWith("/") ? rawBase : rawBase + "/";

const EVENTS_API = `${BASE}events`;

const INITIAL_FORM_STATE = {
  _id: null,
  title: "",
  description: "",
  date: "",
  location: "",
  img: "",
  entryFee: "",
  openingHours: { from: "", to: "" },
  category: "Historical",
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [toast, setToast] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch(EVENTS_API);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      setEvents(json.data || []);
    } catch (err) {
      console.error("❌ Fetch error:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("openingHours.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        openingHours: { ...prev.openingHours, [field]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const openAdd = () => {
    setForm(INITIAL_FORM_STATE);
    setIsEditing(false);
    setShowForm(true);
    setError(null);
  };

  const openEdit = (eventObject) => {
    setForm({
      ...eventObject,
      date: eventObject.date?.split("T")[0] || "",
    });
    setIsEditing(true);
    setShowForm(true);
    setError(null);
  };

  const closeForm = () => {
    if (!isSubmitting) {
      setShowForm(false);
      setError(null);
    }
  };

  const saveForm = async () => {
    if (!form.title || !form.date || !form.location || !form.img) {
      showToast("Please fill all required fields");
      return;
    }

    if (form.openingHours.from && form.openingHours.to && form.openingHours.from >= form.openingHours.to) {
      showToast("Opening time must be before closing time");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(isEditing ? `${EVENTS_API}/${form._id}` : EVENTS_API, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      showToast(isEditing ? "Event updated ✅" : "Event added ✅");
      await fetchEvents();
      setShowForm(false);
      setForm(INITIAL_FORM_STATE);
    } catch (err) {
      console.error("❌ Save error:", err.message);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const askDelete = (eventId) => {
    console.log("🗑 Confirm delete:", eventId);
    setConfirmId(eventId);
    setShowForm(false);
  };

  const confirmDelete = async () => {
    if (!confirmId) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${EVENTS_API}/${confirmId}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      showToast("Event deleted ✅");
      setEvents((prev) => prev.filter((e) => e._id !== confirmId));
      setConfirmId(null);
    } catch (err) {
      console.error("❌ Delete error:", err.message);
      setError(err.message);
      setConfirmId(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelDelete = () => {
    console.log("❌ Delete cancelled");
    setConfirmId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Events</h1>
        <button
          className="px-4 py-2 rounded bg-teal-600 text-white disabled:opacity-50"
          onClick={openAdd}
          disabled={isSubmitting}
        >
          Add Event
        </button>
      </div>

      {toast && <div className="mt-3 p-2 bg-teal-100 text-teal-700 rounded text-sm">{toast}</div>}
      {error && <div className="mt-3 p-2 bg-red-100 text-red-700 rounded text-sm">Error: {error}</div>}

      <div className="mt-4 overflow-x-auto border rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase">Title</th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase">Description</th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase">Date</th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase">Location</th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase">Entry Fee</th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase">Opening Hours</th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase">Category</th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase">Image</th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {events.map((event) => (
              <tr key={event._id}>
                <td className="px-3 py-2 text-sm">{event.title}</td>
                <td className="px-3 py-2 text-sm line-clamp-2">{event.description}</td>
                <td className="px-3 py-2 text-sm">{formatDate(event.date)}</td>
                <td className="px-3 py-2 text-sm">{event.location}</td>
                <td className="px-3 py-2 text-sm">{event.entryFee ? `${event.entryFee} EGP` : "N/A"}</td>
                <td className="px-3 py-2 text-sm">
                  {event.openingHours?.from && event.openingHours?.to
                    ? `${event.openingHours.from} - ${event.openingHours.to}`
                    : "N/A"}
                </td>
                <td className="px-3 py-2 text-sm">{event.category}</td>
                <td className="px-3 py-2 text-sm">
                  {event.img ? <img src={event.img} alt="" className="w-16 h-10 rounded object-cover" /> : "N/A"}
                </td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 rounded bg-blue-600 text-white disabled:opacity-50"
                      onClick={() => openEdit(event)}
                      disabled={isSubmitting}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-600 text-white disabled:opacity-50"
                      onClick={() => askDelete(event._id)}
                      disabled={isSubmitting}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-6 text-sm">
                  No events available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EventFormModal
        showForm={showForm}
        closeForm={closeForm}
        isEditing={isEditing}
        isSubmitting={isSubmitting}
        form={form}
        handleFormChange={handleFormChange}
        saveForm={saveForm}
        confirmId={confirmId}
        cancelDelete={cancelDelete}
        confirmDelete={confirmDelete}
      />

      {confirmId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white p-4 rounded shadow-md w-72">
            <h2 className="text-base font-semibold mb-3">Are you sure?</h2>
            <div className="flex justify-end gap-2">
              <button onClick={cancelDelete} disabled={isSubmitting} className="px-3 py-1 text-sm border rounded disabled:opacity-50">
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={isSubmitting} className="px-3 py-1 text-sm bg-red-600 text-white rounded disabled:opacity-50">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
