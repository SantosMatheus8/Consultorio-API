import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateReceitaDTO } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { Receita } from './entities/receita.entity';

@Injectable()
export class ReceitasService {
  constructor(
    @Inject('ReceitaRepository') private receitaRepository: Repository<Receita>,
  ) {}

  async create(createReceitaDto: CreateReceitaDTO) {
    const receita = this.receitaRepository.create({ ...createReceitaDto });

    return this.receitaRepository.save(receita);
  }

  async findAll() {
    return this.receitaRepository.find();
  }

  async findOne(id: string) {
    const receita = await this.receitaRepository.findOne({ where: { id } });

    if (!receita) {
      throw new NotFoundException(
        `Não foi encontrado uma receita com o ID : ${id}`,
      );
    }

    return receita;
  }

  async update(id: string, updateReceitaDto: UpdateReceitaDto) {
    const receita = await this.receitaRepository.preload({
      id,
      ...updateReceitaDto,
    });

    if (!receita) {
      throw new NotFoundException(
        `Não foi encontrado uma receita com o ID : ${id}`,
      );
    }

    return this.receitaRepository.save(receita);
  }

  async remove(id: string) {
    const receita = await this.findOne(id);

    return this.receitaRepository.remove(receita);
  }
}
