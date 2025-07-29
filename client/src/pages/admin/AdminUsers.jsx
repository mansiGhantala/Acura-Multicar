import React, { useEffect, useState } from "react";
import api from "../../api/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmUser, setConfirmUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/admin/users");
      setUsers(data);
    } catch (error) {
      // console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmRoleChange = (user) => {
    setConfirmUser(user);
  };

  const handleConfirm = async () => {
    if (!confirmUser) return;
    try {
      const { data } = await api.put(`/admin/users/${confirmUser._id}/role`);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === confirmUser._id ? { ...u, isAdmin: data.isAdmin } : u
        )
      );
      setConfirmUser(null);
    } catch (error) {
      // console.error("Failed to update role", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#415D8A]">Users</h1>

      {confirmUser && (
        <div className="max-w-md mx-auto mb-6 p-5 border border-[#D0E1F5] rounded-xl bg-[#F8FAFC] shadow-md">
          <h2 className="text-lg font-semibold text-[#415D8A] mb-2">
            Confirm Role Change
          </h2>
          <div className="text-sm text-gray-800 space-y-1">
            <p>
              <strong>Name:</strong> {confirmUser.name}
            </p>
            <p>
              <strong>Email:</strong> {confirmUser.email}
            </p>
            <p>
              <strong>Current Role:</strong>{" "}
              {confirmUser.isAdmin ? "Admin" : "User"}
            </p>
            <p className="mt-2 text-gray-600">
              Are you sure you want to change this user to{" "}
              <span className="font-semibold">
                {confirmUser.isAdmin ? "User" : "Admin"}?
              </span>
            </p>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleConfirm}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Confirm
            </button>
            <button
              onClick={() => setConfirmUser(null)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-[#415D8A] font-medium">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-[#415D8A]">No users found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-full bg-white rounded-lg shadow border border-[#D0E1F5]">
            <thead className="bg-[#415D8A] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Registered On</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-[#F0F7FF] transition duration-200"
                >
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => confirmRoleChange(user)}
                      className={`px-4 py-1.5 text-sm font-semibold rounded-[10px] shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        user.isAdmin
                          ? "bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-300"
                          : "bg-[#ABBCDA] text-[#415D8A] hover:bg-[#D0E1F5] focus:ring-[#ABBCDA]"
                      }`}
                    >
                      {user.isAdmin ? "Admin" : "User"}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
