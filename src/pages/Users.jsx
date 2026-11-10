import React from 'react'

import { useState,useEffect } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Users as UsersIcon,
} from "lucide-react";

const initialUsers = [
  {
    id: 1,
    name: "Ahmed Ali",
    email: "ahmed@example.com",
    role: "Admin",
    department: "IT",
    status: "Active",
  },
  {
    id: 2,
    name: "Sara Mohamed",
    email: "sara@example.com",
    role: "Agent",
    department: "Support",
    status: "Active",
  },
  {
    id: 3,
    name: "Omar Hassan",
    email: "omar@example.com",
    role: "User",
    department: "Finance",
    status: "Inactive",
  },
];
export default function Users() {
 const [users, setUsers] = useState(() => {
  const savedUsers = localStorage.getItem("helpdesk-users");
  return savedUsers ? JSON.parse(savedUsers) : initialUsers;
});
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
  name: "",
  email: "",
  role: "User",
  department: "",
  status: "Active",
});
const [editingUser, setEditingUser] = useState(null);

useEffect(() => {
  localStorage.setItem("helpdesk-users", JSON.stringify(users));
}, [users]);
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalUsers = users.length;

const activeUsers = users.filter(
  (user) => user.status === "Active"
).length;

const inactiveUsers = users.filter(
  (user) => user.status === "Inactive"
).length;

const adminUsers = users.filter(
  (user) => user.role === "Admin"
).length;
  const handleAddUser = (e) => {
  e.preventDefault();

  const user = {
    ...newUser,
    id: Date.now(),
  };

  setUsers([...users, user]);

  setNewUser({
    name: "",
    email: "",
    role: "User",
    department: "",
    status: "Active",
  });
  setShowForm(false);
};
const handleEditUser = (e) => {
  e.preventDefault();

  setUsers(
    users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    )
  );

  setEditingUser(null);
};
const handleDeleteUser = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (confirmDelete) {
    setUsers(users.filter((user) => user.id !== id));
  }
};
  return (
 <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-slate-400 mt-1">
            Manage your system users
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

  <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
    <p className="text-sm text-slate-400">Total Users</p>
    <h2 className="mt-2 text-3xl font-bold text-white">
      {totalUsers}
    </h2>
  </div>

  <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
    <p className="text-sm text-slate-400">Active Users</p>
    <h2 className="mt-2 text-3xl font-bold text-emerald-400">
      {activeUsers}
    </h2>
  </div>

  <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
    <p className="text-sm text-slate-400">Inactive Users</p>
    <h2 className="mt-2 text-3xl font-bold text-red-400">
      {inactiveUsers}
    </h2>
  </div>

  <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
    <p className="text-sm text-slate-400">Administrators</p>
    <h2 className="mt-2 text-3xl font-bold text-blue-400">
      {adminUsers}
    </h2>
  </div>

</div>
{showForm && (
  <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">

    <h2 className="mb-5 text-lg font-semibold text-white">
      Add New User
    </h2>

    <form onSubmit={handleAddUser} className="space-y-4">

      <input
        type="text"
        placeholder="Full Name"
        required
        value={newUser.name}
        onChange={(e) =>
          setNewUser({ ...newUser, name: e.target.value })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <input
        type="email"
        placeholder="Email Address"
        required
        value={newUser.email}
        onChange={(e) =>
          setNewUser({ ...newUser, email: e.target.value })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <select
        value={newUser.role}
        onChange={(e) =>
          setNewUser({ ...newUser, role: e.target.value })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      >
        <option value="Admin">Admin</option>
        <option value="Agent">Agent</option>
        <option value="User">User</option>
      </select>

      <input
        type="text"
        placeholder="Department"
        required
        value={newUser.department}
        onChange={(e) =>
          setNewUser({ ...newUser, department: e.target.value })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <div className="flex gap-3">

        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-500"
        >
          Save User
        </button>

        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="rounded-lg bg-slate-700 px-5 py-2 text-white"
        >
          Cancel
        </button>

      </div>
    </form>
  </div>
)}
      {/* Search */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-10 pr-4 text-white outline-none focus:border-emerald-500"
        />
      </div>
{editingUser && (
  <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">

    <h2 className="mb-5 text-lg font-semibold text-white">
      Edit User
    </h2>

    <form onSubmit={handleEditUser} className="space-y-4">

      <input
        type="text"
        value={editingUser.name}
        onChange={(e) =>
          setEditingUser({
            ...editingUser,
            name: e.target.value,
          })
        }
        required
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <input
        type="email"
        value={editingUser.email}
        onChange={(e) =>
          setEditingUser({
            ...editingUser,
            email: e.target.value,
          })
        }
        required
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <select
        value={editingUser.role}
        onChange={(e) =>
          setEditingUser({
            ...editingUser,
            role: e.target.value,
          })
        }
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      >
        <option value="Admin">Admin</option>
        <option value="Agent">Agent</option>
        <option value="User">User</option>
      </select>

      <input
        type="text"
        value={editingUser.department}
        onChange={(e) =>
          setEditingUser({
            ...editingUser,
            department: e.target.value,
          })
        }
        required
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <div className="flex gap-3">

        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-5 py-2 text-white"
        >
          Update User
        </button>

        <button
          type="button"
          onClick={() => setEditingUser(null)}
          className="rounded-lg bg-slate-700 px-5 py-2 text-white"
        >
          Cancel
        </button>

      </div>
    </form>
  </div>
)}
      {/* Users Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-800">
        <table className="w-full text-left text-sm text-slate-300">

          <thead className="border-b border-slate-700 bg-slate-900 text-slate-400">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-slate-700 hover:bg-slate-700/40"
              >
                <td className="px-6 py-4 font-medium text-white">
                  {user.name}
                </td>

                <td className="px-6 py-4">{user.email}</td>

                <td className="px-6 py-4">{user.role}</td>

                <td className="px-6 py-4">{user.department}</td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      user.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
<td className="px-6 py-4">
  <div className="flex items-center gap-3">

    <button
      onClick={() => setEditingUser({ ...user })}
      className="text-emerald-400 hover:text-emerald-300"
    >
      <Pencil size={18} />
    </button>

    <button
      onClick={() => handleDeleteUser(user.id)}
      className="text-red-400 hover:text-red-300"
    >
      <Trash2 size={18} />
    </button>

  </div>
</td>

              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}
