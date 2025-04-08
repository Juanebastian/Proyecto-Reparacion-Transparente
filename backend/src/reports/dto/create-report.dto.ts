import { IsString, IsNotEmpty, IsOptional, IsEnum, IsMongoId, IsDateString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  documentacion: string; // URL o ruta del archivo PDF

  @IsDateString()
  @IsOptional()
  fecha_publicacion?: Date;

  @IsMongoId()
  @IsNotEmpty()
  usuario_id: string;

  @IsString()
  @IsNotEmpty()
  zona: string;

  @IsEnum(['pendiente', 'aprobado', 'rechazado'])
  @IsOptional()
  estado?: 'pendiente' | 'aprobado' | 'rechazado';
}
