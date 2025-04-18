import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  rol: string;

  @Prop({ default: 'activo' })
  estado: string;

  @Prop({ default: Date.now })
  fecha_registro: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
