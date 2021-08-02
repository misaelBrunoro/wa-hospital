import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      body.exams && (await this.examService.preloadActiveExams(body.exams));
    const laboratory = this.laboratoryRepository.create({
      ...body,
      exams,
    });
    return this.laboratoryRepository.save(laboratory);
  }

  public async update(id: number, body: ILaboratory): Promise<Laboratory> {
    let exams = [];
    if (body.exams) {
      exams = await this.examService.preloadActiveExams(body.exams);
    }
    const laboratory = await this.laboratoryRepository.preload({
      id,
      ...body,
      exams,
    });

    if (!laboratory) throw new NotFoundException();

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
