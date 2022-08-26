import { DataSource } from 'typeorm';
import { Paciente } from './entities/paciente.entity';

export const pacientesProviders = [
  {
    provide: 'PacienteRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Paciente),
    inject: ['DATA_SOURCE'],
  },
];
