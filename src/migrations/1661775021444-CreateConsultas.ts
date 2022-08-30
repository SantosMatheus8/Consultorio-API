import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateConsultas1661775021444 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'consultas',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'data_consulta',
            type: 'timestamp',
          },
          {
            name: 'medico_id',
            type: 'varchar',
          },
          {
            name: 'paciente_id',
            type: 'varchar',
          },
          {
            name: 'receita_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['medico_id'],
            referencedTableName: 'medicos',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['paciente_id'],
            referencedTableName: 'pacientes',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['receita_id'],
            referencedTableName: 'receitas',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('consultas');
  }
}
