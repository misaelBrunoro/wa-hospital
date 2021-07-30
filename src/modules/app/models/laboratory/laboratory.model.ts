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
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  address: string;

  @Column({
    type: 'enum',
    enum: StatusArray,
    default: `{${Status.active}}`,
    array: true,
  })
  status: Status;

  @ManyToMany(() => Exam)
  @JoinTable()
  exams: Exam[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  constructor(partial?: Partial<Laboratory>) {
    Object.assign(this, partial || {});
  }
}
