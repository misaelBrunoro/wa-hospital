import {
  Status,
  StatusArray,
} from '../../app/models/laboratory/laboratory.interface';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLaboratoryTable1627598869841 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'laboratory',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(100)',
          },
          {
            name: 'address',
            type: 'varchar(250)',
          },
          {
            name: 'status',
            type: 'enum',
            enum: StatusArray,
            enumName: 'status_lab_num',
            default: `'${Status.active}'`,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('laboratory');
  }
}
