import { Module } from '@nestjs/common';
import { ConsultasController } from './consultas/consultas.controller';
import { PacientesController } from './pacientes/pacientes.controller';
import { ReceitasController } from './receitas/receitas.controller';
import { MedicosController } from './medicos/medicos.controller';
import { MedicosService } from './medicos/medicos.service';
import { ConsultasService } from './consultas/consultas.service';
import { PacientesService } from './pacientes/pacientes.service';
import { ReceitasService } from './receitas/receitas.service';

@Module({
  imports: [],
  controllers: [
    MedicosController,
    ConsultasController,
    PacientesController,
    ReceitasController,
  ],
  providers: [
    MedicosService,
    ConsultasService,
    PacientesService,
    ReceitasService,
  ],
})
export class AppModule {}
