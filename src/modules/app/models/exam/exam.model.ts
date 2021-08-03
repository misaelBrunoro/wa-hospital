import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Laboratory } from '../laboratory/laboratory.model';
import {
  IExam,
  Status,
  StatusArray,
  ExamType,
  ExamTypeArray,
} from './exam.interface';

@Entity()
export class Exam implements IExam {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: 'integer' })
  id: number;

  @Column({
    nullable: false,
  })
  @ApiProperty({ type: 'string' })
  name: string;

  @Column({
    type: 'enum',
    enum: StatusArray,
    default: `{${Status.active}}`,
  })
  @ApiProperty({ type: 'string' })
  status: Status;

  @Column({
    type: 'enum',
    enum: ExamTypeArray,
    default: `{${ExamType.clinicalAnalysis}}`,
  })
  @ApiProperty({ type: 'string' })
  examType: ExamType;

  @ManyToMany(() => Laboratory, (laboratory: Laboratory) => laboratory.exams, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: Laboratory, isArray: true })
  laboratories: Laboratory[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdAt: Date;
}
