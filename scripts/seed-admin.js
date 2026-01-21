/**
 * Seed script to create initial admin user
 * Run with: pnpm seed:admin
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load environment variables from .env file
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const envFile = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envFile.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const MONGODB_URI = envVars.MONGODB_URI;

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@ricmedical.com.sa' });
    
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await User.create({
      name: 'Admin User',
      email: 'admin@ricmedical.com.sa',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✅ Admin user created successfully');
    console.log('📧 Email: admin@ricmedical.com.sa');
    console.log('🔑 Password: admin123');
    console.log('\n⚠️  Please change the password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedAdmin();
