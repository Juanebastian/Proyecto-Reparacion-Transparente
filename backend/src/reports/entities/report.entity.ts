import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Report extends Document {
  @Prop({ required: true })
  descripcion: string;

  // Ruta o URL del archivo/documentación
  @Prop({ required: true })
  documentacion: string;

  // Fecha en que se publicó o creó el reporte
  @Prop({ required: true, default: Date.now })
  fecha_publicacion: Date;

  // Referencia al usuario que creó el reporte (funcionario o auditor)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  usuario_id: Types.ObjectId;

  // Lugar donde se ejecutó la acción de restitución
  @Prop({ required: true })
  zona: string;

  // Estado del reporte (para flujo de aprobación)
  @Prop({ required: true, enum: ['pendiente', 'aprobado', 'rechazado'], default: 'pendiente' })
  estado: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
