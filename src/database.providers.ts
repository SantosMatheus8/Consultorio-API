import { DataSource } from 'typeorm';

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
        migrations: ['src/database/migrations/*'],
      });

      return dataSource.initialize();
    },
  },
];
