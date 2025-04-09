import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Report.name) private reportModel: Model<Report>) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const report = new this.reportModel(createReportDto);
    return report.save();
  }

  async findAll(): Promise<Report[]> {
    return this.reportModel.find().populate('usuario_id', 'nombre email').exec();
  }

  async findOne(id: string): Promise<Report> {
    const report = await this.reportModel.findById(id).populate('usuario_id', 'nombre email');
    if (!report) throw new NotFoundException('Reporte no encontrado');
    return report;
  }

  async update(id: string, updateReportDto: UpdateReportDto): Promise<Report> {
    const report = await this.reportModel.findByIdAndUpdate(id, updateReportDto, { new: true });
    if (!report) throw new NotFoundException('Reporte no encontrado');
    return report;
  }

  async remove(id: string): Promise<void> {
    const result = await this.reportModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Reporte no encontrado');
  }

  async findByUserId(userId: string): Promise<Report[]> {
    const reports = await this.reportModel
      .find({ usuario_id: userId })
      .populate('usuario_id', 'nombre email') // opcional: para traer los datos del usuario
      .exec();
  
    if (!reports || reports.length === 0) {
      throw new NotFoundException(`No se encontraron reportes para el usuario con ID ${userId}`);
    }
  
    return reports;
  }
}
