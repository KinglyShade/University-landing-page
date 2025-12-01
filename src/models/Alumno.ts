import mongoose, { Schema, Document } from 'mongoose';

export interface IAlumno extends Document {
  nombre: string;
  matricula: string;
  calificacion: number;
  createdAt: Date;
  updatedAt: Date;
}

const alumnoSchema = new Schema<IAlumno>(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    matricula: {
      type: String,
      required: [true, 'La matrícula es obligatoria'],
      unique: true,
      trim: true,
    },
    calificacion: {
      type: Number,
      required: [true, 'La calificación es obligatoria'],
      min: [0, 'La calificación mínima es 0'],
      max: [100, 'La calificación máxima es 100'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Alumno || mongoose.model<IAlumno>('Alumno', alumnoSchema);
