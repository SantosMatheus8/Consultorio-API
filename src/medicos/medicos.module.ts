import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MedicosController } from './medicos.controller';
import { medicosProviders } from './medicos.providers';
import { MedicosService } from './medicos.service';

@Module({
  imports: [DatabaseModule],
  controllers: [MedicosController],
  providers: [MedicosService, ...medicosProviders],
})
export class MedicosModule {}
