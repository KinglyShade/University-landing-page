import mongoose from 'mongoose';

/*
Creacion del esquema de usuario para base de datos
*/
const userSchema = new mongoose.Schema({ //<-- Define el esquema del usuario
  name: { type: String, required: true }, //<-- define nombre como string- type: String-- declara que sea requerida
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);//<-- Carga el modelo a la base de datos como User, 

export default User;
