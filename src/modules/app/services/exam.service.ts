import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    return this.examRepository
      .createQueryBuilder('exam')
      .where(`exam.status = '${Status.active}'`)
      .leftJoinAndSelect('exam.laboratories', 'laboratory')
      .getMany();
  }

  public async show(id: number): Promise<Exam> {
    const exam = await this.examRepository
      .createQueryBuilder('exam')
      .where(`exam.status = '${Status.active}' and exam.id = '${id}'`)
      .leftJoinAndSelect('exam.laboratories', 'laboratory')
      .getOne();
    if (!exam) throw new NotFoundException();
    return exam;
  }

  public async store(body: IExam, id?: number): Promise<Exam> {
    let exam: Exam;

    if (id) {
      exam = await this.examRepository.preload({
        id,
        ...body,
      });
    } else {
      exam = this.examRepository.create(body);
    }
    return this.examRepository.save(exam);
  }

  public async destroy(id: number): Promise<void> {
    const exam = await this.examRepository.findOne(id);

    if (!exam) throw new NotFoundException();

    if (exam.status === Status.active) {
      this.examRepository.delete(id);
    } else {
      throw new ForbiddenException('Exam is not active');
    }
  }

  public async preloadActiveExams(exams: Exam[]): Promise<Exam[]> {
    return Promise.all(
      exams.map((exam: Exam) => {
        return this.show(exam.id).then((exam: Exam) => {
          if (exam.status === Status.active) {
            return exam;
          }
        });
      }),
    );
  }
}
