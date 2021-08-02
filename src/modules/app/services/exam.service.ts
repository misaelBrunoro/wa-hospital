import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IExam, Status } from '../models/exam/exam.interface';
import { Exam } from '../models/exam/exam.model';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {}

  public async index(): Promise<Exam[]> {
    return this.examRepository.find();
  }

  public async show(id: number): Promise<Exam> {
    const exam = this.examRepository.findOneOrFail(id);
    if (!exam) throw new NotFoundException();
    return exam;
  }

  public async store(body: IExam): Promise<Exam> {
    const exam = this.examRepository.create(body);
    return this.examRepository.save(exam);
  }

  public async update(id: number, body: IExam): Promise<Exam> {
    await this.examRepository.findOneOrFail(id);
    this.examRepository.update(id, body);
    return this.examRepository.findOneOrFail(id);
  }

  public async destroy(id: number): Promise<void> {
    await this.examRepository.findOneOrFail(id);
    this.examRepository.delete(id);
  }

  public async preloadActiveExams(exams: Exam[]): Promise<Exam[]> {
    return Promise.all(
      exams.map((exam: Exam) => {
        return this.show(exam.id).then((exam: Exam) => {
          console.log(exam);
          if (exam.status === Status.active) {
            return exam;
          }
        });
      }),
    );
  }
}
