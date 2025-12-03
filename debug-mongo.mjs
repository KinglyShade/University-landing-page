import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;
console.log('Testing connection to:', uri ? 'URI Found (Hidden)' : 'URI MISSING');

if (!uri) process.exit(1);

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ FAILED:', err.message);
        console.error('   -> Hint: If "buffering timed out", check IP Whitelist (0.0.0.0/0).');
        console.error('   -> Hint: If "bad auth", check username/password.');
        process.exit(1);
    });
