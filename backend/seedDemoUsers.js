const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Demo users data
const demoUsers = [
  {
    fullName: 'Ramesh Kumar',
    email: 'ramesh@example.com',
    password: 'password123',
    mobileNumber: '9876543210',
    location: 'Delhi, India',
    role: 'user',
  },
  {
    fullName: 'Admin User',
    email: 'admin@agriculture-smart.in',
    password: 'admin123',
    mobileNumber: '9876543211',
    location: 'Mumbai, India',
    role: 'admin',
  },
];

async function seedDemoUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    for (const userData of demoUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`User ${userData.email} already exists, skipping...`);
        continue;
      }

      // Hash password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Create user
      const newUser = new User({
        ...userData,
        password: hashedPassword,
      });

      await newUser.save();
      console.log(`Created demo user: ${userData.email}`);
    }

    console.log('Demo users seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding demo users:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seed function
seedDemoUsers();