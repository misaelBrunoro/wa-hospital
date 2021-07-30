export enum Type {
  clinicalAnalysis = 'clinical analysis',
  image = 'image',
}

export enum Status {
  active = 'active',
  inactive = 'inactive',
}

export const StatusArray = [Status.active, Status.inactive];

export const TypeArray = [Type.clinicalAnalysis, Type.image];

export interface IExam {
  id: number;
  name: string;
  status: Status;
  type: Type;
  createdAt: Date;
}
