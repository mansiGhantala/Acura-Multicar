import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <AdminNavbar />
      <main className="flex-grow px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
