import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateConsultas1661451742161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'consultas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'data_consulta',
            type: 'timestamp',
          },
          {
            name: 'medico_id',
            type: 'uuid',
          },
          {
            name: 'paciente_id',
            type: 'uuid',
          },
          {
            name: 'receita_id',
            type: 'uuid',
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
