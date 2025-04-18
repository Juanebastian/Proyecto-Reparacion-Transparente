import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  async create(@Body() createComplaintDto: CreateComplaintDto) {
    return this.complaintsService.create(createComplaintDto);
  }

  @Get()
  async findAll() {
    return this.complaintsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.complaintsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateComplaintDto: UpdateComplaintDto) {
    return this.complaintsService.update(id, updateComplaintDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.complaintsService.remove(id);
  }
}
