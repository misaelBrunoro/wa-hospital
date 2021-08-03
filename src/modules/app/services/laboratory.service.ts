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
    return this.laboratoryRepository
      .createQueryBuilder('laboratory')
      .where(`laboratory.status = '${Status.active}'`)
      .leftJoinAndSelect('laboratory.exams', 'exam')
      .getMany();
  }

  public async show(id: number): Promise<Laboratory> {
    const laboratory = await this.laboratoryRepository
      .createQueryBuilder('laboratory')
      .where(
        `laboratory.status = '${Status.active}' and laboratory.id = '${id}'`,
      )
      .leftJoinAndSelect('laboratory.exams', 'exam')
      .getOne();
    if (!laboratory) throw new NotFoundException();
    return laboratory;
  }

  public async store(body: ILaboratory, id?: number): Promise<Laboratory> {
    let exams = [];
    let laboratory: Laboratory;

    if (body.exams) {
      exams = await this.examService.preloadActiveExams(body.exams);
    }

    if (id) {
      laboratory = await this.laboratoryRepository.preload({
        id,
        ...body,
        exams,
      });
    } else {
      laboratory = await this.laboratoryRepository.create({
        ...body,
        exams,
      });
    }

    if (!laboratory) throw new NotFoundException();

    return this.laboratoryRepository.save(laboratory);
  }

  public async destroy(id: number): Promise<void> {
    const laboratory = await this.laboratoryRepository.findOne(id);

    if (!laboratory) throw new NotFoundException();

    if (laboratory.status === Status.active) {
      this.laboratoryRepository.delete(id);
    } else {
      throw new ForbiddenException('Laboratory is not active');
    }
  }
}
