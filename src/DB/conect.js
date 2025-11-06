import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://kinglyshade_db_user:LzWyfJZOksGHKMPj@ulp.bnzc439.mongodb.net/?appName=ulp';

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI no está definido. Por favor define MONGODB_URI en el archivo .env');
}

// Variable para tracking de la promesa de conexión
let cachedConnection = null;

/**
 * connectDB - conecta a MongoDB usando mongoose.
 * Llama a esta función desde endpoints/server-side antes de usar modelos.
 * Usa caché para evitar múltiples conexiones simultáneas.
 */
async function connectDB() {
    // Si ya hay una conexión activa, retornarla
    if (mongoose.connection.readyState === 1) {
        console.log('Ya conectado a MongoDB');
        return mongoose;
    }

    // Si hay una conexión en progreso, esperar a que termine
    if (cachedConnection) {
        console.log('Esperando conexión en progreso...');
        return cachedConnection;
    }

    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI no está definido en las variables de entorno');
    }

    try {
        console.log('Conectando a MongoDB...');
        
        // Cachear la promesa de conexión
        cachedConnection = mongoose.connect(MONGODB_URI, {
            dbName: 'ulps', // Nombre de tu base de datos
        });

        await cachedConnection;
        console.log('Conectado exitosamente a MongoDB');
        
        return mongoose;
    } catch (err) {
        console.error('Error al conectar a MongoDB:', err.message);
        cachedConnection = null; // Limpiar caché en caso de error
        throw err;
    }
}

export default connectDB;
export { mongoose };
