const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/user.model');

dotenv.config();

const testConnection = async () => {
  console.log('--- Testing DB Connection ---');
  console.log('URI:', process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    
    // Test user creation
    const testEmail = `test_${Date.now()}@test.com`;
    await User.create({
      name: 'Test Admin',
      email: testEmail,
      password: 'password123',
      role: 'admin'
    });
    console.log('✅ SUCCESS: Created test admin user!');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ FAILURE: Could not connect to Atlas.');
    console.error('Error Message:', err.message);
    process.exit(1);
  }
};

testConnection();
