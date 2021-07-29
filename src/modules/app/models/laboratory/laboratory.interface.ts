import { Exam } from '../exam/exam.model';

export enum Situation {
  active = 'active',
  inactive = 'inactive',
}

export const SituationsArray = [Situation.active, Situation.inactive];

export interface ILaboratory {
  id: number;
  name: string;
  address: string;
  situation: Situation;
  exams: Exam[];
  createdAt: Date;
}
