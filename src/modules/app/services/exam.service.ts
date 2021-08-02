import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IExam } from '../models/exam/exam.interface';
import { Exam } from '../models/exam/exam.model';

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
    if (!exam) throw new NotFoundException('not-found');
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
}
