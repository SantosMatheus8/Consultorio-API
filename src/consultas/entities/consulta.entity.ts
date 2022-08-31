import { randomUUID } from 'crypto';
import { Medico } from '../../../src/medicos/entities/medico.entity';
import { Paciente } from '../../../src/pacientes/entities/paciente.entity';
import { Receita } from '../../../src/receitas/entities/receita.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('consultas')
export class Consulta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'data_consulta' })
  dataConsulta: Date;

  @ManyToOne(() => Medico, (medico) => medico.consulta)
  @JoinColumn({ name: 'medico_id' })
  medico: Medico;

  @OneToOne(() => Receita, (receita) => receita.consulta)
  @JoinColumn({ name: 'receita_id' })
  receita: Receita;

  @ManyToOne(() => Paciente, (paciente) => paciente.consulta)
  @JoinColumn({ name: 'paciente_id' })
  paciente: Paciente;

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
