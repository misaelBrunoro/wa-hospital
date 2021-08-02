export enum ExamType {
  clinicalAnalysis = 'clinical analysis',
  image = 'image',
}

export enum Status {
  active = 'active',
  inactive = 'inactive',
}

export const StatusArray = [Status.active, Status.inactive];

export const ExamTypeArray = [ExamType.clinicalAnalysis, ExamType.image];

export interface IExam {
  id?: number;
  name: string;
  status: Status;
  examType: ExamType;
  createdAt?: Date;
}
