import AdminDashboard from "@/components/admin-dashboard";
import Sidebar from "@/components/sidebar";

export default function AdminPage() {
  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <AdminDashboard />
        </div>
      </main>
    </div>
  );
}