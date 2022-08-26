import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ReceitasController } from './receitas.controller';
import { receitasProviders } from './receitas.providers';
import { ReceitasService } from './receitas.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ReceitasController],
  providers: [ReceitasService, ...receitasProviders],
})
export class ReceitasModule {}
