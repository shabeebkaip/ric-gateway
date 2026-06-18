"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white container mx-auto px-6 max-w-7xl">
      <div className="w-full">
        <div className="space-y-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full"
            >
              <Image
                src={image}
                alt={`${productName} - Image ${index + 1}`}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
