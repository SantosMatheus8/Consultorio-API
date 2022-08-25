import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('consultas')
export class Consultas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'data_consulta' })
  dataConsulta: Date;
}
