import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IExam,
  Situation,
  SituationsArray,
  Type,
  TypeArray,
} from './exam.interface';

@Entity()
export class Exam implements IExam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: SituationsArray,
    default: `{${Situation.active}}`,
    array: true,
  })
  situation: Situation;

  @Column({
    type: 'enum',
    enum: TypeArray,
    default: `{${Type.clinicalAnalysis}}`,
    array: true,
  })
  type: Type;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  constructor(partial?: Partial<Exam>) {
    Object.assign(this, partial || {});
  }
}
