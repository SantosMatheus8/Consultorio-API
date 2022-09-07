import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Medico } from 'src/medicos/entities/medico.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Receita } from 'src/receitas/entities/receita.entity';
import { Repository } from 'typeorm';
import { CreateConsultaDTO } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { Consulta } from './entities/consulta.entity';

@Injectable()
export class ConsultasService {
  constructor(
    @Inject('ConsultaRepository')
    private consultaRepository: Repository<Consulta>,
    @Inject('MedicoRepository') private medicoRepository: Repository<Medico>,
    @Inject('ReceitaRepository') private receitaRepository: Repository<Receita>,
    @Inject('PacienteRepository')
    private pacienteRepository: Repository<Paciente>,
  ) {}

  async create(createConsultaDto: CreateConsultaDTO) {
    const existeMedico = await this.medicoRepository.findOne({
      where: { id: createConsultaDto.medicoId },
    });
    const existeReceita = await this.receitaRepository.findOne({
      where: { id: createConsultaDto.receitaId },
    });
    const existePaciente = await this.pacienteRepository.findOne({
      where: { id: createConsultaDto.pacienteId },
    });

    if (!existeMedico) {
      throw new NotFoundException(
        `O médico de ID : ${createConsultaDto.medicoId}, não foi encontrado`,
      );
    }

    if (!existeReceita) {
      throw new NotFoundException(
        `A receita de ID : ${createConsultaDto.receitaId}, não foi encontrado`,
      );
    }

    if (!existePaciente) {
      throw new NotFoundException(
        `O paciente de ID : ${createConsultaDto.pacienteId}, não foi encontrado`,
      );
    }

    const dataConsulta = new Date(createConsultaDto.dataConsulta);

    const consulta = this.consultaRepository.create({
      dataConsulta,
      medico: existeMedico,
      receita: existeReceita,
      paciente: existePaciente,
    });

    return this.consultaRepository.save(consulta);
  }

  async findAll() {
    return this.consultaRepository.find();
  }

  async findOne(id: string) {
    const consulta = await this.consultaRepository.findOne({ where: { id } });

    if (!consulta) {
      throw new NotFoundException(
        `Não foi encontrado uma consulta com o ID : ${id}`,
      );
    }

    return consulta;
  }

  async update(id: string, updateConsultaDto: UpdateConsultaDto) {
    updateConsultaDto.dataConsulta = new Date(updateConsultaDto.dataConsulta);

    const consulta = await this.consultaRepository.preload({
      id,
      ...updateConsultaDto,
    });

    if (!consulta) {
      throw new NotFoundException(
        `Não foi encontrado uma consulta com o ID : ${id}`,
      );
    }

    return this.consultaRepository.save(consulta);
  }

  async remove(id: string) {
    const consulta = await this.findOne(id);

    return this.consultaRepository.remove(consulta);
  }
}
