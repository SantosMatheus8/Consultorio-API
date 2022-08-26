import { DataSource } from 'typeorm';
import { Medico } from './entities/medico.entity';

export const medicosProviders = [
  {
    provide: 'MedicoRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Medico),
    inject: ['DATA_SOURCE'],
  },
];
