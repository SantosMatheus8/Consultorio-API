import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateReceitaDTO } from './dto/create-receita.dto';
import { ReceitasService } from './receitas.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateReceitaDto } from './dto/update-receita.dto';

@ApiTags('Receitas')
@Controller('receitas')
export class ReceitasController {
  constructor(private readonly receitasService: ReceitasService) {}

  @Post()
  create(@Body() createReceitaDTO: CreateReceitaDTO) {
    return this.receitasService.create(createReceitaDTO);
  }

  @Get()
  findAll() {
    return this.receitasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receitasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceitaDTO: UpdateReceitaDto) {
    return this.receitasService.update(id, updateReceitaDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receitasService.remove(id);
  }
}
