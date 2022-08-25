import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('receitas')
export class Receita {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;
}
