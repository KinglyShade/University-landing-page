import mongoose from 'mongoose';

const servicioInformaticaSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    problemType: { type: String, trim: true },
    location: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['nuevo', 'en_proceso', 'atendido'],
      default: 'nuevo',
    },
  },
  { timestamps: true }
);

const ServicioInformatica =
  mongoose.models.ServicioInformatica ||
  mongoose.model('ServicioInformatica', servicioInformaticaSchema);

export default ServicioInformatica;
