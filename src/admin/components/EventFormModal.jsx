// src/admin/components/EventFormModal.jsx
import React from "react";

const Field = ({ label, children }) => (
  <div>
    <div className="mb-1 text-sm text-gray-600 dark:text-gray-300">{label}</div>
    {children}
  </div>
);

const Modal = ({ title, children, onClose, isSubmitting }) => {
  const handleClose = () => {
    if (!isSubmitting) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            ✕
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

const EventFormModal = ({
  showForm,
  closeForm,
  isEditing,
  isSubmitting,
  form,
  handleFormChange,
  saveForm,
  confirmId,
  cancelDelete,
  confirmDelete,
}) => {
  const renderForm = () => (
    <Modal
      onClose={closeForm}
      title={isEditing ? "Edit Event" : "Add Event"}
      isSubmitting={isSubmitting}
    >
      <div className="space-y-3">
        <Field label="Title">
          <input
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
            value={form.title}
            name="title"
            onChange={handleFormChange}
          />
        </Field>

        <Field label="Description">
          <textarea
            rows="3"
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
            value={form.description}
            name="description"
            onChange={handleFormChange}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Date">
            <input
              type="date"
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
              value={form.date}
              name="date"
              onChange={handleFormChange}
            />
          </Field>

          <Field label="Location">
            <input
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
              value={form.location}
              name="location"
              onChange={handleFormChange}
            />
          </Field>
        </div>

        <Field label="Image URL">
          <input
            type="url"
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
            value={form.img}
            name="img"
            onChange={handleFormChange}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Opening From">
            <input
              type="time"
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
              value={form.openingHours.from}
              name="openingHours.from"
              onChange={handleFormChange}
            />
          </Field>

          <Field label="Opening To">
            <input
              type="time"
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
              value={form.openingHours.to}
              name="openingHours.to"
              onChange={handleFormChange}
            />
          </Field>
        </div>

        <Field label="Entry Fee (EGP)">
          <input
            type="number"
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
            value={form.entryFee}
            name="entryFee"  // 👈 دا هيسبب no-dupe-keys لو كان عندك entryFee مرتين، كده مظبوط
            onChange={handleFormChange}
          />
        </Field>

        <Field label="Category">
          <select
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-gray-100"
            value={form.category}
            name="category"
            onChange={handleFormChange}
          >
            <option value="Historical">Historical</option>
            <option value="Cultural">Cultural</option>
            <option value="Natural">Natural</option>
          </select>
        </Field>

        <div className="flex justify-end gap-2 pt-2">
          <button
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600 transition disabled:opacity-50"
            onClick={closeForm}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition disabled:bg-teal-400"
            onClick={saveForm}  // 👈 هنا بنستخدم الدالة الصح اللي جاية من الـprops
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : isEditing ? "Update Event" : "Add Event"}
          </button>
        </div>
      </div>
    </Modal>
  );

  const renderConfirmation = () => (
    <Modal title="Confirm Delete" onClose={cancelDelete} isSubmitting={isSubmitting}>
      <p className="text-gray-700 dark:text-gray-300">
        Are you sure you want to delete this event? This cannot be undone.
      </p>

      <div className="flex justify-end gap-2 pt-4">
        <button
          className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600 transition disabled:opacity-50"
          onClick={cancelDelete}
          disabled={isSubmitting}
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition disabled:bg-red-400"
          onClick={confirmDelete}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );

  return (
    <>
      {showForm && renderForm()}
      {confirmId && renderConfirmation()}
    </>
  );
};

export default EventFormModal;
