import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMedicos1661451588257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'medicos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'telefone',
            type: 'varchar',
            length: '15',
          },
          {
            name: 'CRM',
            type: 'varchar',
            length: '15',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('medicos');
  }
}
