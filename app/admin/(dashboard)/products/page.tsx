'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Eye, Package } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface Product {
  _id: string;
  title: string;
  slug: string;
  category: string;
  partner: string;
  thumbnail?: string;
  isPremium: boolean;
  isActive: boolean;
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.partner.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch(`/api/products/${slug}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast({
          title: 'Product Deleted',
          description: `${title} has been deleted successfully`,
        });
        fetchProducts();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: 'Failed to delete product',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product inventory ({filteredProducts.length} products)
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-gradient-to-r from-gold to-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-muted relative">
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
              {product.isPremium && (
                <div className="absolute top-2 right-2 bg-gold text-white px-2 py-1 rounded text-xs font-semibold">
                  Premium
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <p>Category: {product.category}</p>
                <p>Partner: {product.partner}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/products/${product.category}/${product.slug}`} target="_blank">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </Link>
                <Link href={`/admin/products/${product.slug}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(product.slug, product.title)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try a different search term' : 'Get started by adding your first product'}
          </p>
          {!searchTerm && (
            <Link href="/admin/products/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </Link>
          )}
        </Card>
      )}
    </div>
  );
}
