import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es requerido'],
        unique: true,
        trim: true,
        minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es requerido'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un correo electrónico válido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Evitar error de recompilación de modelos en desarrollo
// Si el modelo ya existe, lo eliminamos para asegurar que se use el esquema actualizado
// Esto es útil en desarrollo cuando cambiamos el esquema
if (mongoose.models.User) {
    delete mongoose.models.User;
}

export default mongoose.model('User', userSchema);
