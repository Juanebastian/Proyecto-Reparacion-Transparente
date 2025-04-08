import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Complaint extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  usuario_id: Types.ObjectId;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true, default: Date.now })
  fecha_envio: Date;

  @Prop({ required: true })
  anonimo: boolean;

  @Prop({ required: true, enum: ['pendiente', 'en revisión', 'resuelta'], default: 'pendiente' })
  estado: string;
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
