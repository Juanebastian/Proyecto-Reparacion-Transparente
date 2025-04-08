import { IsString, IsMongoId, IsUrl, IsDate } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  titulo: string;

  @IsString()
  tipo: string;

  @IsUrl()
  url: string;

  @IsDate()
  fecha_subida: Date;

  @IsMongoId()
  usuario_id: string;

  @IsString()
  estado: string;
}
