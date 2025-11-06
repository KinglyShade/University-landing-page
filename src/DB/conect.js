import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Carga variables de entorno desde .env
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.warn('Warning: MONGODB_URI no está definido en las variables de entorno. Define MONGODB_URI en .env');
}

/**
 * connectDB - conecta a MongoDB usando mongoose.
 * Llama a esta función desde endpoints/server-side antes de usar modelos.
 */
async function connectDB() {
    if (mongoose.connection.readyState >= 1) {
        // Ya conectado o en proceso
        return mongoose;
    }

    try {
        await mongoose.connect(MONGODB_URI || 'mongodb+srv://kinglyshade_db_user:LzWyfJZOksGHKMPj@ulp.bnzc439.mongodb.net/?appName=ulp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        return mongoose;
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

export default connectDB;

// También exportamos mongoose por si hace falta directamente
export { mongoose };