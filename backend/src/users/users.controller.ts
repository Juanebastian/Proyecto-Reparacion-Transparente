import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard ';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  
  @Get('funcionarios')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  findFuncionarios() {
    return this.usersService.findFuncionarios();
  }
  
  @Get('auditores') // Ruta para obtener auditores
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  findAuditores() {
    return this.usersService.findAuditores();
  }
  
  @Get()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

 

}
