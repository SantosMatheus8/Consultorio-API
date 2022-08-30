import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePacienteDTO } from './dto/create-paciente.dto';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacientesService {
  constructor(
    @Inject('PacienteRepository')
    private pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createPacienteDto: CreatePacienteDTO) {
    createPacienteDto.dataNascimento = new Date(
      createPacienteDto.dataNascimento,
    );

    const paciente = this.pacienteRepository.create({ ...createPacienteDto });

    return this.pacienteRepository.save(paciente);
  }

  async findAll() {
    return this.pacienteRepository.find();
  }

  async findOne(id: string) {
    const paciente = await this.pacienteRepository.findOne({ where: { id } });

    if (!paciente) {
      throw new NotFoundException(
        `Não foi encontrado um paciente com o ID : ${id}`,
      );
    }

    return paciente;
  }

  async update(id: string, updatePacienteDto: Partial<CreatePacienteDTO>) {
    const paciente = await this.pacienteRepository.preload({
      id,
      ...updatePacienteDto,
    });

    if (!paciente) {
      throw new NotFoundException(
        `Não foi encontrado um paciente com o ID : ${id}`,
      );
    }

    return this.pacienteRepository.save(paciente);
  }

  async remove(id: string) {
    const paciente = await this.pacienteRepository.findOne({ where: { id } });

    return this.pacienteRepository.remove(paciente);
  }
}
