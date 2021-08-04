import { BadRequestException } from '@nestjs/common';
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

  public async store(body: ILaboratory[]): Promise<Laboratory[]> {
    const laboratories: Laboratory[] = [];

    await Promise.all(
      body.map(async (lab: Laboratory) => {
        let exams = [];
        let laboratory: Laboratory;

        if (lab.exams) {
          exams = await this.examService.preloadActiveExams(lab.exams);
        }

        if (lab.id) {
          laboratory = await this.laboratoryRepository.preload({
            ...lab,
            exams,
          });
        } else {
          laboratory = await this.laboratoryRepository.create({
            ...lab,
            exams,
          });
        }

        if (!laboratory) throw new NotFoundException();

        laboratories.push(await this.laboratoryRepository.save(laboratory));
      }),
    );

    return laboratories;
  }

  public async destroy(body: ILaboratory[]): Promise<void> {
    await Promise.all(
      body.map(async (lab: Laboratory) => {
        if (lab.id) {
          const laboratory = await this.laboratoryRepository.findOne(lab.id);

          if (!laboratory) throw new NotFoundException();

          if (laboratory.status === Status.active) {
            this.laboratoryRepository.delete(lab.id);
          } else {
            throw new ForbiddenException('Laboratory is not active');
          }
        } else {
          throw new BadRequestException(
            'One or more Laboratories dont have id',
          );
        }
      }),
    );
  }
}
