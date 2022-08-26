import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ConsultasController } from './consultas.controller';
import { consultasProviders } from './consultas.providers';
import { ConsultasService } from './consultas.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ConsultasController],
  providers: [ConsultasService, ...consultasProviders],
})
export class ConsultasModule {}
