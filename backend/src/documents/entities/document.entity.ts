import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class DocumentEntity extends Document {
  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  tipo: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, default: Date.now })
  fecha_subida: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  usuario_id: Types.ObjectId;

  @Prop({ required: true, enum: ['activo', 'inactivo'], default: 'activo' })
  estado: string;
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentEntity);
