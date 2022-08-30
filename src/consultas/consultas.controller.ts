import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { CreateConsultaDTO } from './dto/create-consulta.dto';

@Controller('consultas')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}

  @Post()
  create(@Body() createConsultaDto: CreateConsultaDTO) {
    return this.consultasService.create(createConsultaDto);
  }

  @Get()
  findAll() {
    return this.consultasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() createConsultaDto: CreateConsultaDTO,
  ) {
    return this.consultasService.update(id, createConsultaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultasService.remove(id);
  }
}
