import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from '../models/exam/exam.model';
import { ILaboratory, Status } from '../models/laboratory/laboratory.interface';
import { Laboratory } from '../models/laboratory/laboratory.model';
import { ExamService } from './exam.service';

@Injectable()
export class LaboratoryService {
  constructor(
    @InjectRepository(Laboratory)
    private laboratoryRepository: Repository<Laboratory>,

    private examService: ExamService,
  ) {}

  public async index(): Promise<Laboratory[]> {
    const queryBuilder =
      this.laboratoryRepository.createQueryBuilder('Laboratory');
    queryBuilder.select(['Laboratory']).where(`status = '${Status.active}'`);
    return queryBuilder.getRawMany();
  }

  public async show(id: number): Promise<Laboratory> {
    const laboratory = await this.laboratoryRepository.findOneOrFail(id);
    if (!laboratory) throw new NotFoundException('not-found');
    return laboratory;
  }

  public async store(body: ILaboratory): Promise<Laboratory> {
    const exams =
      body.exams &&
      (await Promise.all(
        body.exams.map((exam: Exam) => this.examService.show(exam.id)),
      ));
    const laboratory = this.laboratoryRepository.create({
      ...body,
      exams,
    });
    return this.laboratoryRepository.save(laboratory);
  }

  public async update(id: number, body: ILaboratory): Promise<Laboratory> {
    const exams =
      body.exams &&
      (await Promise.all(
        body.exams.map((exam: Exam) => this.examService.show(exam.id)),
      ));
    const laboratory = await this.laboratoryRepository.preload({
      id,
      ...body,
      exams,
    });

    if (!laboratory) throw new NotFoundException('not-found');

    return this.laboratoryRepository.save(laboratory);
  }

  public async destroy(id: number): Promise<void> {
    const laboratory = await this.laboratoryRepository.findOneOrFail(id);

    if (!laboratory) throw new NotFoundException();

    if (laboratory.status === Status.active) {
      this.laboratoryRepository.delete(id);
    } else {
      throw new ForbiddenException('Laboratory is not active');
    }
  }
}
