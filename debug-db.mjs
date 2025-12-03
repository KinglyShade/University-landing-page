import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
console.log('Testing connection...');
mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => { console.log('✅ SUCCESS: Connected to MongoDB'); process.exit(0); })
  .catch(err => { console.error('❌ FAILURE:', err.message); process.exit(1); });
