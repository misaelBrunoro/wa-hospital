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
import { ListValidator } from '../validators/laboratory/list.validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Laboratory } from '../models/laboratory/laboratory.model';

@Injectable()
export class LaboratoryService {
  constructor(
    @InjectRepository(Laboratory)
    private laboratoryRepository: Repository<Laboratory>,
  ) {}

  async find(options?: FindManyOptions<Laboratory>): Promise<Laboratory[]> {
    return this.laboratoryRepository.find(options);
  }

  async index(query: ListValidator): Promise<Pagination<Laboratory>> {
    const queryBuilder =
      this.laboratoryRepository.createQueryBuilder('Laboratory');
    queryBuilder.select(['Laboratory']);

    if (query.name) {
      queryBuilder.where(
        `LOWER(Laboratory.name) LIKE LOWER('%${query.name}%')`,
      );
    }

    if (!query.orderBy) query.orderBy = 'Laboratory.name';
    if (!query.orderDirection) query.orderDirection = 'ASC';

    queryBuilder.orderBy(
      query.orderBy,
      query.orderDirection.toUpperCase() as 'ASC' | 'DESC',
    );

    return paginate<Laboratory>(queryBuilder, {
      page: Number(query.page) + 1,
      limit: query.limit,
    });
  }

  async get(
    id: number,
    options?: FindOneOptions<Laboratory>,
  ): Promise<Laboratory> {
    const laboratory = await this.laboratoryRepository.findOne(id, options);
    if (!laboratory) throw new NotFoundException('not-found');
    return laboratory;
  }

  async store(laboratory: Laboratory): Promise<Laboratory> {
    const isLaboratoryAvaliable = await this.isUniqueColumnAvailable(
      'name',
      laboratory.name,
    );

    if (!isLaboratoryAvaliable) throw new ConflictException('name-unavailable');

    const saved = this.laboratoryRepository.save(laboratory);

    return saved;
  }

  async destroy(id: number): Promise<DeleteResult> {
    return this.laboratoryRepository.delete(id);
  }

  async update(id: number, laboratory: Laboratory): Promise<UpdateResult> {
    return this.laboratoryRepository.update(id, laboratory);
  }

  public async isUniqueColumnAvailable(
    column: string,
    value: string,
  ): Promise<boolean> {
    const query = this.laboratoryRepository
      .createQueryBuilder('Laboratory')
      .select('COUNT(Laboratory.id) AS count')
      .where(`Laboratory.${column} = :value`, { value });

    const result: any = await query.getRawOne();
    return Number(result.count) === 0;
  }
}
