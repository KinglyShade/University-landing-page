import mongoose from 'mongoose';

// Lee la URI de conexión desde variables de entorno
// Asegúrate de definir MONGODB_URI en tu entorno (.env o configuración de despliegue)
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI no está definido. Por favor define MONGODB_URI en las variables de entorno');
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
        console.log('Intentando conectar a MongoDB...');
        console.log('URI:', MONGODB_URI.replace(/:([^:@]+)@/, ':****@')); // Log URI masking password

        // Cachear la promesa de conexión
        cachedConnection = mongoose.connect(MONGODB_URI, {
            dbName: 'ulps', // Nombre de tu base de datos
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });

        await cachedConnection;
        console.log('Conectado exitosamente a MongoDB');

        return mongoose;
    } catch (err) {
        console.error('Error CRÍTICO al conectar a MongoDB:', err);
        console.error('Mensaje de error:', err.message);
        if (err.cause) console.error('Causa:', err.cause);
        cachedConnection = null; // Limpiar caché en caso de error
        throw err;
    }
}

export default connectDB;
export { mongoose };
