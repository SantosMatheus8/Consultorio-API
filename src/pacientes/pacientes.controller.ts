import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePacienteDTO } from './dto/create-paciente.dto';
import { PacientesService } from './pacientes.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@ApiTags('Pacientes')
@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDTO) {
    return this.pacientesService.create(createPacienteDto);
  }

  @Get()
  findAll() {
    return this.pacientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacientesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacientesService.update(id, updatePacienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientesService.remove(id);
  }
}
