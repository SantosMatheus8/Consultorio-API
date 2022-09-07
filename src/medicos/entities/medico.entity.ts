import { randomUUID } from 'crypto';
import { Consulta } from '../../consultas/entities/consulta.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  telefone: string;

  @Column()
  crm: string;

  @OneToMany(() => Consulta, (consulta) => consulta.medico)
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
