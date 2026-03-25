import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { verifyAdminToken } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get('admin-token')?.value;
  const user = verifyAdminToken(token);

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="lg:pl-64">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
