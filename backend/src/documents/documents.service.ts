import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentEntity } from './entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(@InjectModel(DocumentEntity.name) private documentModel: Model<DocumentEntity>) {}

  async create(createDocumentDto: CreateDocumentDto): Promise<DocumentEntity> {
    const document = new this.documentModel(createDocumentDto);
    return document.save();
  }

  async findAll(): Promise<DocumentEntity[]> {
    return this.documentModel.find().populate('usuario_id', 'nombre email').exec();
  }

  async findOne(id: string): Promise<DocumentEntity> {
    const document = await this.documentModel.findById(id).populate('usuario_id', 'nombre email');
    if (!document) throw new NotFoundException('Documento no encontrado');
    return document;
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<DocumentEntity> {
    const document = await this.documentModel.findByIdAndUpdate(id, updateDocumentDto, { new: true });
    if (!document) throw new NotFoundException('Documento no encontrado');
    return document;
  }

  async remove(id: string): Promise<void> {
    const result = await this.documentModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Documento no encontrado');
  }
}
