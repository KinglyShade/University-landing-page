import mongoose from 'mongoose';

const quejaSugerenciaSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    role: { type: String, trim: true },
    messageType: { type: String, trim: true },
    area: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    wantsResponse: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['nuevo', 'en_proceso', 'atendido'],
      default: 'nuevo',
    },
  },
  { timestamps: true }
);

const QuejaSugerencia =
  mongoose.models.QuejaSugerencia ||
  mongoose.model('QuejaSugerencia', quejaSugerenciaSchema);

export default QuejaSugerencia;
