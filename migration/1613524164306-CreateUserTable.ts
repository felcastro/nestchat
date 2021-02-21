import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1613524164306 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            type: 'varchar',
            name: 'uuid',
            isPrimary: true,
          },
          {
            type: 'varchar',
            name: 'username',
            length: '30',
            isUnique: true,
          },
          {
            type: 'varchar',
            name: 'password',
          },
          {
            type: 'timestamp',
            name: 'createdAt',
            isNullable: false,
            default: 'NOW()',
          },
          {
            type: 'timestamp',
            name: 'updatedAt',
            isNullable: false,
            default: 'NOW()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
