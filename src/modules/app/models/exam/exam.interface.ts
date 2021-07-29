export enum Type {
  clinicalAnalysis = 'clinical analysis',
  image = 'image',
}

export enum Situation {
  active = 'active',
  inactive = 'inactive',
}

export const SituationsArray = [Situation.active, Situation.inactive];

export const TypeArray = [Type.clinicalAnalysis, Type.image];

export interface IExam {
  id: number;
  name: string;
  situation: Situation;
  type: Type;
  createdAt: Date;
}
