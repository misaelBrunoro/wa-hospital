import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserDisciplineTable1624897817292
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'laboratory_exams_exam',
        columns: [
          {
            name: 'laboratoryId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'examId',
            type: 'int',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['laboratoryId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'laboratory',
          },
          {
            columnNames: ['examId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'exam',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('laboratory_exams_exam');
  }
}
