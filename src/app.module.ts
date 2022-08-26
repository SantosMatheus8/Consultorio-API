import { Module } from '@nestjs/common';

import { ConsultasModule } from './consultas/consultas.module';
import { MedicosModule } from './medicos/medicos.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { ReceitasModule } from './receitas/receitas.module';

@Module({
  imports: [ConsultasModule, MedicosModule, PacientesModule, ReceitasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
