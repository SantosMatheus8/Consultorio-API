import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PacientesController } from './pacientes.controller';
import { pacientesProviders } from './pacientes.providers';
import { PacientesService } from './pacientes.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PacientesController],
  providers: [PacientesService, ...pacientesProviders],
})
export class PacientesModule {}
