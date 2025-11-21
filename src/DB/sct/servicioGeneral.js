import mongoose from 'mongoose';

const servicioGeneralSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    role: { type: String, trim: true },
    location: { type: String, trim: true },
    requestType: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['nuevo', 'en_proceso', 'atendido'],
      default: 'nuevo',
    },
  },
  { timestamps: true }
);

const ServicioGeneral =
  mongoose.models.ServicioGeneral || mongoose.model('ServicioGeneral', servicioGeneralSchema);

export default ServicioGeneral;
