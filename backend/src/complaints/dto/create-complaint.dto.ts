import { IsString, IsMongoId, IsBoolean, IsDate } from 'class-validator';

export class CreateComplaintDto {
  @IsMongoId()
  usuario_id: string;

  @IsString()
  descripcion: string;

  @IsDate()
  fecha_envio: Date;

  @IsBoolean()
  anonimo: boolean;

  @IsString()
  estado: string;
}
