import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 1. Forzar carga de variables de entorno
dotenv.config();

// 2. Buscar la URI en todos los lugares posibles (Vite y Node)
const URI =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    import.meta.env?.MONGODB_URI ||
    import.meta.env?.MONGO_URI;

// 3. LOG DE DEBUG (Para saber si este archivo se está ejecutando)
console.log("---------------------------------------------");
console.log("--> [conect.js] Inicializando...");
console.log("--> [conect.js] URI Detectada:", URI ? "✅ SÍ (Encontrada)" : "❌ NO (Undefined)");
console.log("---------------------------------------------");

// 4. Validación estricta
if (!URI) {
    throw new Error("❌ FATAL: No se encontró la variable MONGO_URI en el archivo .env");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
    // Si ya está conectado, retornar la conexión existente
    if (mongoose.connection.readyState === 1) {
        console.log("--> [conect.js] Usando conexión existente.");
        return mongoose.connection;
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        console.log("--> [conect.js] Estableciendo NUEVA conexión...");

        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
        };

        cached.promise = mongoose.connect(URI, opts).then((mongoose) => {
            console.log("✅ [conect.js] ¡Conexión Exitosa!");
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error("❌ [conect.js] Error de Conexión:", e.message);
        throw e;
    }

    return cached.conn;
};