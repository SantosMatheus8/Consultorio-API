import { randomUUID } from 'crypto';
import { Consulta } from '../../../src/consultas/entities/consulta.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @OneToMany(() => Consulta, (consulta) => consulta.paciente)
  consulta: Consulta[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
