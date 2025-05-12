"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

export default function AdminSettingsPage() {
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [addAdminModal, setAddAdminModal] = useState(false);
  const [editAdminModal, setEditAdminModal] = useState(false);
  const [selectedAdminIndex, setSelectedAdminIndex] = useState<number | null>(
    null
  );

  const [admins, setAdmins] = useState([
    { name: "Adeel Khan", email: "adeel@example.com" },
  ]);

  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdmins([...admins, { name: adminName, email: adminEmail }]);
    setAdminName("");
    setAdminEmail("");
    setAdminPassword("");
    setAddAdminModal(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Password change logic here
    setChangePasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  const handleDeleteAdmin = (index: number) => {
    const updated = [...admins];
    updated.splice(index, 1);
    setAdmins(updated);
  };

  const openEditAdminModal = (index: number) => {
    setSelectedAdminIndex(index);
    const admin = admins[index];
    setAdminName(admin.name);
    setAdminEmail(admin.email);
    setEditAdminModal(true);
  };

  const handleEditAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAdminIndex === null) return;
    const updated = [...admins];
    updated[selectedAdminIndex] = { name: adminName, email: adminEmail };
    setAdmins(updated);
    setEditAdminModal(false);
    setSelectedAdminIndex(null);
    setAdminName("");
    setAdminEmail("");
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Admin Settings
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setChangePasswordModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Change Password
          </button>
          <button
            onClick={() => setAddAdminModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Add Admin
          </button>
        </div>

        {/* Admin List */}
        <div className="bg-white shadow rounded p-4 overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Admin List</h3>
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
  {admins.map((admin, index) => (
    <tr key={index} className="hover:bg-gray-50 transition-all duration-150">
      {/* Index */}
      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
        {index + 1}
      </td>

      {/* Name */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="font-semibold text-gray-900">{admin.name}</div>
      </td>

      {/* Email */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="text-gray-600">{admin.email}</div>
      </td>

      {/* Actions */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex gap-2">
          <button
            onClick={() => openEditAdminModal(index)}
            className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteAdmin(index)}
            className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>

      {/* Change Password Modal */}
      {changePasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 px-4">
          <div className="bg-white rounded shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setChangePasswordModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Admin Modal */}
      {addAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 px-4">
          <div className="bg-white rounded shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Admin</h3>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddAdminModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {editAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 px-4">
          <div className="bg-white rounded shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Edit Admin</h3>
            <form onSubmit={handleEditAdmin} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditAdminModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
