import React, { useEffect, useState } from "react";

function AdminDash() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/admin/users`);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/api/admin/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setUsers(users.filter((user) => user._id !== id));
  };

  const handleBlock = async (id) => {
    const res = await fetch(`http://localhost:3000/api/admin/block/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetchUsers();

    setUsers(
      users.map((user) =>
        user._id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const handleAdminToggle = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/makeadmin/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      fetchUsers();

      setUsers(
        users.map((user) =>
          user._id === id
            ? { ...user, role: user.role === "admin" ? "user" : "admin" }
            : user
        )
      );
    } catch (error) {
      console.error(error);
      // Handle error, show a notification, etc.
    }
  };

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h2>

      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 w-full"
        />
        <button
          className="ml-2 p-2 bg-stone-900 text-white rounded"
          onClick={() => setSearchTerm("")}
        >
          Clear
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">Username</th>
              <th className="py-2 px-4 border-b text-center">Email</th>
              <th className="py-2 px-4 border-b text-center">Role</th>
              <th className="py-2 px-4 border-b text-center">isActive</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="align-top">
                <td className="py-2 px-4 border-b text-center">
                  {user.username}
                </td>
                <td className="py-2 px-4 border-b text-center">{user.email}</td>
                <td className="py-2 px-4 border-b text-center">
                  {user.role === "admin" ? "Admin" : "User"}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {user.isActive ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border-b space-x-2 text-center">
                  <button
                    className="text-sm text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`text-sm ${
                      user.isActive ? "text-orange-500" : "text-green-500"
                    } hover:${
                      user.isActive ? "text-orange-700" : "text-green-700"
                    }`}
                    onClick={() => handleBlock(user._id)}
                  >
                    {user.isActive ? "Block" : "Unblock"}
                  </button>
                  <button
                    className={`text-sm ${
                      user.role === "admin" ? "text-gray-500" : "text-blue-500"
                    } hover:${
                      user.role === "admin" ? "text-gray-700" : "text-blue-700"
                    }`}
                    onClick={() => handleAdminToggle(user._id)}
                  >
                    {user.role === "admin" ? "Revoke Admin" : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDash;
