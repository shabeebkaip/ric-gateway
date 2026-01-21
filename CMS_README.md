# RIC Gateway CMS

Complete Content Management System for RIC Gateway medical equipment website.

## Features

✅ **Product Management**
- Add, edit, delete products
- Upload multiple images via Cloudinary
- Dynamic product fields support
- Category and partner filtering
- Premium & featured product flags

✅ **Category Management**
- Manage product categories
- Subcategories support
- Custom icons and images

✅ **Partner Management**
- Manage partner/manufacturer information
- Logo uploads
- Partner details

✅ **Content Management**
- Manage hero sections
- About, Vision, Mission content
- Contact information
- Custom content blocks

✅ **Authentication & Security**
- JWT-based authentication
- Admin role protection
- Secure API endpoints

## Setup Instructions

### 1. Environment Variables

Your `.env` file is already configured with:
```env
CLOUDINARY_URL=cloudinary://...
CLOUDINARY_CLOUD_NAME=dm5c31z7w
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
JWT_SECRET=ric-gateway-12345
MONGODB_URI=mongodb+srv://...
```

### 2. Create Initial Admin User

Run the seed script to create your first admin user:

```bash
pnpm seed:admin
```

This will create an admin account:
- **Email**: admin@ricmedical.com.sa
- **Password**: admin123

⚠️ **Change this password after first login!**

### 3. Start Development Server

```bash
pnpm dev
```

### 4. Access Admin Panel

Navigate to: `http://localhost:3000/admin/login`

Login with the credentials from step 2.

## Admin Panel Routes

- `/admin` - Dashboard
- `/admin/products` - Product management
- `/admin/products/new` - Add new product
- `/admin/categories` - Category management
- `/admin/partners` - Partner management
- `/admin/content` - Content management

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - Get all products (public)
- `POST /api/products` - Create product (admin)
- `GET /api/products/[slug]` - Get single product
- `PUT /api/products/[slug]` - Update product (admin)
- `DELETE /api/products/[slug]` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories (public)
- `POST /api/categories` - Create category (admin)
- `GET /api/categories/[slug]` - Get single category
- `PUT /api/categories/[slug]` - Update category (admin)
- `DELETE /api/categories/[slug]` - Delete category (admin)

### Partners
- `GET /api/partners` - Get all partners (public)
- `POST /api/partners` - Create partner (admin)
- `GET /api/partners/[slug]` - Get single partner
- `PUT /api/partners/[slug]` - Update partner (admin)
- `DELETE /api/partners/[slug]` - Delete partner (admin)

### Content
- `GET /api/content` - Get all content (public)
- `POST /api/content` - Create content (admin)
- `GET /api/content/[key]` - Get single content
- `PUT /api/content/[key]` - Update content (admin)
- `DELETE /api/content/[key]` - Delete content (admin)

### Upload
- `POST /api/upload` - Upload image to Cloudinary (admin)

## Database Models

### User
- name, email, password, role (admin/editor)

### Product
- title, slug, description
- category, subcategory, partner, type
- images[], thumbnail
- isPremium, isFeatured, isActive
- specifications (dynamic), features[], technicalData, additionalInfo
- order, metaTitle, metaDescription

### Category
- name, slug, description
- icon, image
- subcategories[]
- order, isActive

### Partner
- name, slug, logo
- description, website, country
- order, isActive

### Content
- key, type (hero/about/vision/mission/contact/settings)
- title, subtitle, description, content
- images[], data (custom fields)
- isActive

## Next Steps

1. **Run seed script** to create admin user
2. **Login to admin panel** at `/admin/login`
3. **Add categories** first (e.g., "Operating Room Equipment", "ICU Equipment")
4. **Add partners** (manufacturers like "Mindray", "GE Healthcare")
5. **Add products** with images and specifications
6. **Update frontend** to fetch from database instead of static data

## Migrating Existing Data

To migrate your current static product data to the database:

1. Login to admin panel
2. Go to Categories → Add your categories
3. Go to Partners → Add your partners  
4. Go to Products → Add each product manually, or
5. Create a migration script using the product data in `src/lib/data.ts`

## Security Notes

- All admin routes are protected with JWT authentication
- Only users with `role: 'admin'` can access admin panel
- Image uploads are restricted to authenticated users
- API endpoints validate authentication tokens
- Remember to change default admin password!

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcryptjs
- **Image Storage**: Cloudinary
- **UI**: shadcn/ui components
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **State**: React Query (TanStack Query)
