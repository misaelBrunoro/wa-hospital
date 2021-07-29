import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ListValidator } from '../validators/exam/list.validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from '../models/exam/exam.model';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {}

  async find(options?: FindManyOptions<Exam>): Promise<Exam[]> {
    return this.examRepository.find(options);
  }

  async index(query: ListValidator): Promise<Pagination<Exam>> {
    const queryBuilder = this.examRepository.createQueryBuilder('Exam');
    queryBuilder.select(['Exam']);

    if (query.name) {
      queryBuilder.where(`LOWER(Exam.name) LIKE LOWER('%${query.name}%')`);
    }

    if (!query.orderBy) query.orderBy = 'Exam.name';
    if (!query.orderDirection) query.orderDirection = 'ASC';

    queryBuilder.orderBy(
      query.orderBy,
      query.orderDirection.toUpperCase() as 'ASC' | 'DESC',
    );

    return paginate<Exam>(queryBuilder, {
      page: Number(query.page) + 1,
      limit: query.limit,
    });
  }

  async get(id: number, options?: FindOneOptions<Exam>): Promise<Exam> {
    const exam = await this.examRepository.findOne(id, options);
    if (!exam) throw new NotFoundException('not-found');
    return exam;
  }

  async store(exam: Exam): Promise<Exam> {
    const isExamAvailable = await this.isUniqueColumnAvailable(
      'name',
      exam.name,
    );

    if (!isExamAvailable) throw new ConflictException('name-unavailable');

    const saved = this.examRepository.save(exam);

    return saved;
  }

  async destroy(id: number): Promise<DeleteResult> {
    return this.examRepository.delete(id);
  }

  async update(id: number, exam: Exam): Promise<UpdateResult> {
    return this.examRepository.update(id, exam);
  }

  public async isUniqueColumnAvailable(
    column: string,
    value: string,
  ): Promise<boolean> {
    const query = this.examRepository
      .createQueryBuilder('Exam')
      .select('COUNT(Exam.id) AS count')
      .where(`Exam.${column} = :value`, { value });

    const result: any = await query.getRawOne();
    return Number(result.count) === 0;
  }
}
