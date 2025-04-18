import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { Complaint } from './entities/complaint.entity';

@Injectable()
export class ComplaintsService {
  constructor(@InjectModel(Complaint.name) private complaintModel: Model<Complaint>) {}

  async create(createComplaintDto: CreateComplaintDto): Promise<Complaint> {
    const complaint = new this.complaintModel(createComplaintDto);
    return complaint.save();
  }

  async findAll(): Promise<Complaint[]> {
    return this.complaintModel.find().populate('usuario_id', 'nombre email').exec();
  }

  async findOne(id: string): Promise<Complaint> {
    const complaint = await this.complaintModel.findById(id).populate('usuario_id', 'nombre email');
    if (!complaint) throw new NotFoundException('Denuncia no encontrada');
    return complaint;
  }

  async update(id: string, updateComplaintDto: UpdateComplaintDto): Promise<Complaint> {
    const complaint = await this.complaintModel.findByIdAndUpdate(id, updateComplaintDto, { new: true });
    if (!complaint) throw new NotFoundException('Denuncia no encontrada');
    return complaint;
  }

  async remove(id: string): Promise<void> {
    const result = await this.complaintModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Denuncia no encontrada');
  }
}
