'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Package, FolderOpen, Users, FileText } from 'lucide-react';

interface Stats {
  products: number;
  categories: number;
  partners: number;
  content: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    categories: 0,
    partners: 0,
    content: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const [products, categories, partners, content] = await Promise.all([
        fetch('/api/products', { headers }).then(r => r.json()),
        fetch('/api/categories', { headers }).then(r => r.json()),
        fetch('/api/partners', { headers }).then(r => r.json()),
        fetch('/api/content', { headers }).then(r => r.json()),
      ]);

      setStats({
        products: products.products?.length || 0,
        categories: categories.categories?.length || 0,
        partners: partners.partners?.length || 0,
        content: content.content?.length || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: Package, color: 'from-blue-500 to-blue-600' },
    { label: 'Categories', value: stats.categories, icon: FolderOpen, color: 'from-green-500 to-green-600' },
    { label: 'Partners', value: stats.partners, icon: Users, color: 'from-purple-500 to-purple-600' },
    { label: 'Content Pages', value: stats.content, icon: FileText, color: 'from-orange-500 to-orange-600' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to RIC Gateway CMS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/products"
            className="p-4 border rounded-lg hover:bg-muted transition-colors text-center"
          >
            <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">Manage Products</p>
          </a>
          <a
            href="/admin/categories"
            className="p-4 border rounded-lg hover:bg-muted transition-colors text-center"
          >
            <FolderOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">Manage Categories</p>
          </a>
          <a
            href="/admin/partners"
            className="p-4 border rounded-lg hover:bg-muted transition-colors text-center"
          >
            <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">Manage Partners</p>
          </a>
          <a
            href="/admin/content"
            className="p-4 border rounded-lg hover:bg-muted transition-colors text-center"
          >
            <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">Manage Content</p>
          </a>
        </div>
      </Card>
    </div>
  );
}
