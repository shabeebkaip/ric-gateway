/**
 * Seed script: Categories & Subcategories
 *
 * Populates the `categories` and `subcategories` collections from the static
 * data defined in src/lib/data.ts, AND syncs the `content` collection records
 * that the admin dashboard reads (page=home, section=categories/subcategories).
 *
 * Usage:
 *   pnpm tsx scripts/seed-categories.ts
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import { productCategories, productSubcategories } from '../src/lib/data';
import Category from '../src/lib/db/models/Category';
import Subcategory from '../src/lib/db/models/Subcategory';
import Content from '../src/lib/db/models/Content';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI environment variable is not set.');
  process.exit(1);
}

async function seedCategories() {
  console.log('\n📂  Seeding categories collection...');

  const operations = productCategories.map((cat, index) => ({
    updateOne: {
      filter: { id: cat.id },
      update: {
        $set: {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description ?? '',
          icon: cat.icon ?? '',
          order: index,
          isActive: true,
        },
      },
      upsert: true,
    },
  }));

  const result = await Category.bulkWrite(operations);
  console.log(
    `   ✅  Categories: ${result.upsertedCount} inserted, ${result.modifiedCount} updated`
  );
}

async function seedSubcategories() {
  console.log('\n📂  Seeding subcategories collection...');

  const operations = productSubcategories.map((sub, index) => ({
    updateOne: {
      filter: { id: sub.id },
      update: {
        $set: {
          id: sub.id,
          name: sub.name,
          slug: sub.slug,
          categoryId: sub.categoryId,
          description: sub.description ?? '',
          types: sub.types ?? [],
          order: index,
          isActive: true,
        },
      },
      upsert: true,
    },
  }));

  const result = await Subcategory.bulkWrite(operations);
  console.log(
    `   ✅  Subcategories: ${result.upsertedCount} inserted, ${result.modifiedCount} updated`
  );
}

async function seedContentRecords() {
  console.log('\n📂  Syncing content collection (admin dashboard)...');

  // Categories content record — used by admin page: /admin/categories
  await Content.findOneAndUpdate(
    { page: 'home', section: 'categories' },
    {
      $set: {
        page: 'home',
        section: 'categories',
        isActive: true,
        content: {
          title: 'Our Product Categories',
          titleHighlight: 'Categories',
          subtitle: 'Comprehensive Medical Solutions',
          description: 'Explore our wide range of medical equipment and solutions.',
          categories: productCategories.map((cat) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            description: cat.description ?? '',
            icon: cat.icon ?? '',
          })),
        },
      },
    },
    { upsert: true, new: true }
  );
  console.log('   ✅  content[home/categories] upserted');

  // Subcategories content record
  await Content.findOneAndUpdate(
    { page: 'home', section: 'subcategories' },
    {
      $set: {
        page: 'home',
        section: 'subcategories',
        isActive: true,
        content: {
          subcategories: productSubcategories.map((sub) => ({
            id: sub.id,
            name: sub.name,
            slug: sub.slug,
            categoryId: sub.categoryId,
            description: sub.description ?? '',
            types: sub.types ?? [],
          })),
        },
      },
    },
    { upsert: true, new: true }
  );
  console.log('   ✅  content[home/subcategories] upserted');
}

async function main() {
  console.log('🔌  Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log('✅  Connected.');

  await seedCategories();
  await seedSubcategories();
  await seedContentRecords();

  // Summary
  const catCount = await Category.countDocuments();
  const subCount = await Subcategory.countDocuments();

  console.log('\n📊  Database summary:');
  console.log(`   categories    : ${catCount} documents`);
  console.log(`   subcategories : ${subCount} documents`);

  await mongoose.disconnect();
  console.log('\n✅  Done. Connection closed.\n');
}

main().catch((err) => {
  console.error('❌  Seed failed:', err);
  process.exit(1);
});
