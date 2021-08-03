import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exam } from '../exam/exam.model';
import { ILaboratory, Status, StatusArray } from './laboratory.interface';

@Entity()
export class Laboratory implements ILaboratory {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: 'integer' })
  id: number;

  @Column({
    nullable: false,
  })
  @ApiProperty({ type: 'string' })
  name: string;

  @Column({
    nullable: false,
  })
  address: string;

  @Column({
    type: 'enum',
    enum: StatusArray,
    default: `{${Status.active}}`,
  })
  @ApiProperty({ type: 'string' })
  status: Status;

  @ManyToMany(() => Exam, (exam: Exam) => exam.laboratories, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  @ApiProperty({ type: Exam, isArray: true })
  exams: Exam[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdAt: Date;

  constructor(partial?: Partial<Laboratory>) {
    Object.assign(this, partial || {});
  }
}
