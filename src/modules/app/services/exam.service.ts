import {
  BadRequestException,
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

  public async store(body: IExam[]): Promise<Exam[]> {
    const exams: Exam[] = [];

    await Promise.all(
      body.map(async (ex: Exam) => {
        let exam: Exam;

        if (ex.id) {
          exam = await this.examRepository.preload({
            ...ex,
          });
        } else {
          exam = await this.examRepository.create(ex);
        }

        if (!exam) throw new NotFoundException();

        exams.push(await this.examRepository.save(exam));
      }),
    );

    return exams;
  }

  public async destroy(body: IExam[]): Promise<void> {
    await Promise.all(
      body.map(async (ex: Exam) => {
        if (ex.id) {
          const exam = await this.examRepository.findOne(ex.id);

          if (!exam) throw new NotFoundException();

          if (exam.status === Status.active) {
            this.examRepository.delete(ex.id);
          } else {
            throw new ForbiddenException(
              'Exam with id is not active: ' + ex.id,
            );
          }
        } else {
          throw new BadRequestException('One or more Exams dont have id');
        }
      }),
    );
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

  public async findByName(name: string) {
    const exam = await this.examRepository
      .createQueryBuilder('exam')
      .where(`exam.name LIKE '%${name}%'`)
      .leftJoinAndSelect('exam.laboratories', 'laboratory')
      .getOne();
    if (!exam) throw new NotFoundException();
    return exam;
  }
}
