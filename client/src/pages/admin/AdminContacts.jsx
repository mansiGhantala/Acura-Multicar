import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";

const AdminContacts = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [openedMessageId, setOpenedMessageId] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await api.get("/admin/messages");
        setContacts(data);
      } catch (error) {
        // console.error("Failed to fetch contacts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id, username) => {
    try {
      await api.delete(`/admin/messages/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      setSuccessMessage(`Deleted contact from "${username}".`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      // console.error("Delete failed", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.patch(`/admin/messages/${id}/read`);
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, isRead: true } : c))
      );
    } catch (error) {
      // console.error("Failed to mark as read", error);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#415D8A]">Contacts</h1>

      {loading ? (
        <p>Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p>No contact messages found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          {successMessage && (
            <div className="mb-4 p-3 text-[#415D8A] bg-[#D0E1F5] font-medium rounded shadow text-sm">
              {successMessage}
            </div>
          )}

          <table className="min-w-full mb-16 text-sm text-[#415D8A]">
            <thead className="bg-[#415D8A] text-white text-left uppercase tracking-wider text-xs">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4 w-[250px]">Message</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="hover:bg-[#D0E1F5]/30 transition-colors border-b relative"
                >
                  <td className="py-3 px-4 font-semibold whitespace-nowrap">
                    {contact.username}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {contact.email}
                  </td>
                  <td className="py-3 px-4 max-w-[250px] relative">
                    <p
                      className="line-clamp-2 overflow-hidden text-ellipsis max-w-[220px]"
                      title="Click to view full"
                    >
                      {contact.message}
                    </p>
                    <button
                      className="text-xs text-blue-800 mt-1 "
                      onClick={() =>
                        setOpenedMessageId(
                          openedMessageId === contact._id ? null : contact._id
                        )
                      }
                    >
                      {openedMessageId === contact._id ? "Hide" : "View"} 
                    </button>

                    {openedMessageId === contact._id && (
                      <div className="absolute z-50 left-1/2 -translate-x-1/2 top-[105%] w-100 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-sm text-gray-700 whitespace-pre-wrap transition-all duration-200 max-h-60 overflow-y-auto">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white" />
                        <div className="font-semibold mb-2 text-[#415D8A]">
                          Full Message
                        </div>
                        {contact.message}
                      </div>
                    )}
                  </td>
                  <td
                    className="py-3 px-4 cursor-pointer"
                    onClick={() =>
                      !contact.isRead && markAsRead(contact._id)
                    }
                  >
                    {contact.isRead ? (
                      <span className="bg-[#C8E7C7] text-[#415D8A] px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                        Read
                      </span>
                    ) : (
                      <span className="bg-[#F5C7C7] text-[#415D8A] px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                        Unread
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() =>
                        handleDelete(contact._id, contact.username)
                      }
                      className="bg-[#D0E1F5] hover:bg-[#F5C7C7] text-[#415D8A] px-4 py-1.5 rounded-md text-sm font-semibold transition-all"
                    >
                      Delete
                    </button>
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

export default AdminContacts;
