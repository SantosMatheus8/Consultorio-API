import { Medico } from 'src/medicos/entities/medico.entity';
import { Paciente } from 'src/pacientes/entities/paciente.entity';
import { Receita } from 'src/receitas/entities/receita.entity';
import { DataSource } from 'typeorm';
import { Consulta } from './entities/consulta.entity';

export const consultasProviders = [
  {
    provide: 'ConsultaRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Consulta),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'MedicoRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Medico),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PacienteRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Paciente),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ReceitaRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Receita),
    inject: ['DATA_SOURCE'],
  },
];
