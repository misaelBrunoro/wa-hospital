import {
  Status,
  StatusArray,
  Type,
  TypeArray,
} from '../../app/models/exam/exam.interface';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExamTable1627598884423 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exam',
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
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'enum',
            enum: TypeArray,
            enumName: 'type_exam_enum',
            default: `'${Type.clinicalAnalysis}'`,
          },
          {
            name: 'status',
            type: 'enum',
            enum: StatusArray,
            enumName: 'status_exam_enum',
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
    await queryRunner.dropTable('exam');
  }
}
