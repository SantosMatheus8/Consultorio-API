import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMedicoDTO } from './dto/create-medico.dto';
import { MedicosService } from './medicos.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UpdateMedicoDto } from './dto/update-medico.dto';

@ApiTags('Medicos')
@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @ApiResponse({ status: 400, description: 'Conflicto no CRM' })
  @Post()
  create(@Body() createMedicoDto: CreateMedicoDTO) {
    return this.medicosService.create(createMedicoDto);
  }

  @Get()
  findAll() {
    return this.medicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicoDto: UpdateMedicoDto) {
    return this.medicosService.update(id, updateMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicosService.remove(id);
  }
}
