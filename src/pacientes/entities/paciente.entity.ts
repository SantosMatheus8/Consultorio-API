import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  telefone: string;

  @Column()
  convenio: string;

  @Column({ name: 'data_nascimento' })
  dataNascimento: Date;
}
