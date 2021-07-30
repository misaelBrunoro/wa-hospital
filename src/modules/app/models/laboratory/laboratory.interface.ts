import { Exam } from '../exam/exam.model';

export enum Status {
  active = 'active',
  inactive = 'inactive',
}

export const StatusArray = [Status.active, Status.inactive];

export interface ILaboratory {
  id: number;
  name: string;
  address: string;
  status: Status;
  exams: Exam[];
  createdAt: Date;
}
