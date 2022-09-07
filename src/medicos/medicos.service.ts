import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePacienteDto } from 'src/pacientes/dto/update-paciente.dto';
import { Repository } from 'typeorm';
import { CreateMedicoDTO } from './dto/create-medico.dto';
import { Medico } from './entities/medico.entity';

@Injectable()
export class MedicosService {
  constructor(
    @Inject('MedicoRepository') private medicoRepository: Repository<Medico>,
  ) {}

  async create(createMedicoDto: CreateMedicoDTO) {
    const existeMedico = await this.medicoRepository.findOne({
      where: { crm: createMedicoDto.crm },
    });

    if (existeMedico) {
      throw new BadRequestException('O CRM informado já está cadastrado');
    }

    const medico = this.medicoRepository.create({ ...createMedicoDto });

    return this.medicoRepository.save(medico);
  }

  async findAll() {
    return this.medicoRepository.find();
  }

  async findOne(id: string) {
    const medico = await this.medicoRepository.findOne({ where: { id } });

    if (!medico) {
      throw new NotFoundException(
        `Não foi encontrado um médico com o ID : ${id}`,
      );
    }

    return medico;
  }

  async update(id: string, updateMedicoDto: UpdatePacienteDto) {
    const medico = await this.medicoRepository.preload({
      id,
      ...updateMedicoDto,
    });

    if (!medico) {
      throw new NotFoundException(
        `Não foi encontrado um médico com o ID : ${id}`,
      );
    }

    return this.medicoRepository.save(medico);
  }

  async remove(id: string) {
    const medico = await this.findOne(id);

    return this.medicoRepository.remove(medico);
  }
}
