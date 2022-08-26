import { DataSource } from 'typeorm';
import { Receita } from './entities/receita.entity';

export const receitasProviders = [
  {
    provide: 'ReceitaRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Receita),
    inject: ['DATA_SOURCE'],
  },
];
