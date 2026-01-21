# 🚀 Getting Started with RIC Gateway CMS

## 📋 Prerequisites

✅ All dependencies installed
✅ MongoDB configured and connected
✅ Cloudinary credentials set up
✅ Admin user created

## 🎯 Quick Start (5 Minutes)

### Step 1: Login to Admin Panel

1. **Open your browser** and navigate to:
   ```
   http://localhost:3000/admin/login
   ```

2. **Login with these credentials:**
   - Email: `admin@ricmedical.com.sa`
   - Password: `admin123`

3. **You should see the dashboard** with stats showing:
   - Total Products: 0
   - Categories: 0
   - Partners: 0
   - Content Pages: 0

### Step 2: Add Your First Category

1. **Click "Categories"** in the sidebar (or navigate to `/admin/categories`)

2. **Click "Add Category"** button

3. **Fill in the form:**
   ```
   Name: Operating Room Equipment
   Slug: operating-room-equipment
   Description: Equipment for operating rooms and surgical procedures
   Subcategories: (Add these one by one)
     - Surgical Tables
     - Operating Lights
     - Anesthesia Equipment
   ```

4. **Click "Create Category"**

5. **Repeat** for other categories:
   - ICU Equipment
   - Medical Imaging
   - Patient Monitoring
   - Laboratory Equipment

### Step 3: Add Your First Partner

1. **Click "Partners"** in the sidebar

2. **Click "Add Partner"**

3. **Fill in the form:**
   ```
   Name: Mindray
   Slug: mindray
   Description: Leading manufacturer of medical devices
   Website: https://www.mindray.com
   Country: China
   ```

4. **Upload logo** (if you have it)

5. **Click "Create Partner"**

6. **Repeat** for other partners:
   - GE Healthcare
   - Philips Healthcare
   - Siemens Healthineers
   - etc.

### Step 4: Add Your First Product

1. **Click "Products"** in the sidebar

2. **Click "Add Product"** button

3. **Fill in Basic Information:**
   ```
   Title: BeneHeart D6 Defibrillator
   Slug: (auto-generated: beneheart-d6-defibrillator)
   Description: Advanced defibrillator with monitoring capabilities
   Category: Select "ICU Equipment"
   Subcategory: Select appropriate option
   Partner: Select "Mindray"
   Type: Defibrillator
   ```

4. **Upload Product Images:**
   - Click the upload box
   - Select multiple images (up to 10)
   - Images will upload to Cloudinary automatically
   - First image becomes the thumbnail

5. **Add Features:**
   ```
   - Biphasic defibrillation
   - 12-lead ECG monitoring
   - Built-in recorder
   - Lightweight and portable
   ```
   (Type each feature and click "Add")

6. **Add Technical Specifications:**
   ```
   Energy Range: 2-360J
   Charging Time: <5 seconds
   Battery Life: 200 shocks
   Weight: 3.5kg
   ```
   (Add each spec as key-value pair)

7. **Configure Settings:**
   - Toggle "Premium Product" if applicable
   - Toggle "Featured Product" to show on homepage
   - Ensure "Active" is ON
   - Set Display Order: 0 (or higher for sorting)

8. **Click "Create Product"**

### Step 5: View Your Product

1. **Click the "View" button** on the product card

2. **Product opens in new tab** at:
   ```
   http://localhost:3000/products/[category]/[slug]
   ```

3. **You should see:**
   - Product images
   - Description
   - Technical specifications (nicely formatted)
   - Dynamic fields
   - WhatsApp contact button

## 🎨 Admin Panel Overview

### Dashboard (`/admin`)
- **Statistics**: Quick overview of your content
- **Quick Actions**: Direct links to manage sections

### Products (`/admin/products`)
- **List View**: All products with search
- **Add/Edit**: Full product management
- **Delete**: Remove products
- **Search**: Find products by name, category, partner

### Categories (`/admin/categories`)
- **Manage**: Product categories
- **Subcategories**: Nested organization
- **Icons/Images**: Visual representation

### Partners (`/admin/partners`)
- **Manage**: Manufacturer/partner information
- **Logos**: Upload partner logos
- **Details**: Website, country, description

### Content (`/admin/content`)
- **Hero Sections**: Homepage hero content
- **About/Vision/Mission**: Company information
- **Contact**: Contact page content
- **Custom Blocks**: Any additional content

## 📝 Common Tasks

### Add a Product with Multiple Images

1. Go to Products → Add Product
2. Fill in basic info
3. In "Product Images" section:
   - Click upload box
   - Select multiple files (Ctrl/Cmd + Click)
   - Wait for uploads to complete
   - First image is automatically the thumbnail
4. To remove an image: Hover and click X

### Edit an Existing Product

1. Go to Products
2. Find your product
3. Click "Edit" button
4. Make changes
5. Click "Save Changes"

### Make a Product Featured

1. Edit the product
2. Scroll to "Product Settings"
3. Toggle "Featured Product" ON
4. Save
5. Product now shows in featured section

### Upload Product Images

**Images are uploaded to Cloudinary:**
- Automatic optimization
- CDN delivery
- Responsive images
- Secure URLs

**Supported formats:**
- JPG, PNG, WebP
- Max 10 images per product
- Recommended size: 1200x800px

### Add Dynamic Product Fields

Products support flexible data structures:

**Specifications:**
```javascript
{
  "Energy Range": "2-360J",
  "Charging Time": "<5 seconds",
  "Display": "12.1 inch TFT"
}
```

**Features:**
```javascript
[
  "Biphasic technology",
  "12-lead ECG",
  "Built-in recorder"
]
```

**Technical Data:**
```javascript
{
  "Dimensions": {
    "Width": "320mm",
    "Height": "280mm",
    "Depth": "180mm"
  },
  "Power": {
    "AC Input": "100-240V",
    "Battery": "11.1V Li-ion"
  }
}
```

All fields are automatically displayed with proper formatting!

## 🔄 Migrating Existing Data

If you have static product data in `src/lib/data.ts`:

### Option 1: Manual Entry (Recommended for Few Products)
1. Follow "Add Product" steps for each item
2. Copy data from static file
3. Upload images manually

### Option 2: Create Migration Script (For Many Products)
```javascript
// scripts/migrate-products.js
const products = require('../src/lib/data.ts');

async function migrateProducts() {
  for (const product of products) {
    await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_TOKEN`
      },
      body: JSON.stringify(product)
    });
  }
}
```

## 🐛 Troubleshooting

### Can't Login
- **Check MongoDB connection** in `.env`
- **Verify admin user exists**: Run `pnpm seed:admin` again
- **Clear browser cache** and cookies

### Images Not Uploading
- **Check Cloudinary credentials** in `.env`
- **Verify file size** (max recommended: 5MB)
- **Check file format** (JPG, PNG, WebP)

### Products Not Showing
- **Ensure "Active" toggle is ON**
- **Check category and partner exist**
- **Verify slug is unique**

### API Errors
- **Check MongoDB connection**
- **Ensure you're logged in** (token valid)
- **Check browser console** for errors

## 📱 Mobile Access

The admin panel is fully responsive:
- ✅ Login works on mobile
- ✅ Dashboard accessible
- ✅ Forms optimized for touch
- ✅ Image upload from camera
- ✅ Hamburger menu on mobile

## 🔒 Security Best Practices

1. **Change default password** immediately:
   - Login → Click your name → Change Password

2. **Use strong JWT secret** in production:
   ```env
   JWT_SECRET=your-super-secure-random-string-here
   ```

3. **Enable HTTPS** in production

4. **Rotate credentials** periodically

5. **Backup database** regularly

6. **Monitor API usage** for unusual activity

## 🎯 Next Steps

Now that your CMS is set up:

1. ✅ Add all your categories
2. ✅ Add all your partners
3. ✅ Add all your products
4. 🔄 Update frontend to fetch from API (next task)
5. 🔄 Deploy to production

## 📞 Need Help?

Check these files:
- `CMS_README.md` - Full documentation
- `CMS_SUMMARY.md` - Implementation details
- `.env` - Configuration

Happy content managing! 🎉
