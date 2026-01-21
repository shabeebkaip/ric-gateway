'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AdminSidebar />
        <main className="lg:pl-64">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
