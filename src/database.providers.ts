import { DataSource } from 'typeorm';
import { CreateMedicos1661451588257 } from './migrations/1661451588257-CreateMedicos';
import { CreatePacientes1661452124027 } from './migrations/1661452124027-CreatePacientes';
import { CreateReceitas1661452359086 } from './migrations/1661452359086-CreateReceitas';
import { CreateConsultas1661775021444 } from './migrations/1661775021444-CreateConsultas';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'bancoestudos',
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: false,
        migrations: [
          CreateMedicos1661451588257,
          CreateConsultas1661775021444,
          CreateReceitas1661452359086,
          CreatePacientes1661452124027,
        ],
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'bancoestudos',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: false,
  migrations: [
    CreateMedicos1661451588257,
    CreateConsultas1661775021444,
    CreateReceitas1661452359086,
    CreatePacientes1661452124027,
  ],
});
