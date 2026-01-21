'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
  folder?: string;
}

export function ImageUpload({ value = [], onChange, maxFiles = 5, folder = 'products' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + value.length > maxFiles) {
      toast({
        title: 'Too many files',
        description: `Maximum ${maxFiles} images allowed`,
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const token = localStorage.getItem('admin-token');
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');

        const data = await response.json();
        return data.url;
      });

      const newUrls = await Promise.all(uploadPromises);
      onChange([...value, ...newUrls]);

      toast({
        title: 'Upload Successful',
        description: `${files.length} image(s) uploaded`,
      });
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload images',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {value.map((url, index) => (
          <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border">
            <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {value.length < maxFiles && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 hover:bg-muted/50"
          >
            {isUploading ? (
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Upload</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      <p className="text-sm text-muted-foreground">
        {value.length} / {maxFiles} images uploaded
      </p>
    </div>
  );
}
