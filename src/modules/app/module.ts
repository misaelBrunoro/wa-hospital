import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common';
import { DatabaseModule } from '../database';
import { ExamController } from './controllers/exam.controller';
import { Exam } from './models/exam/exam.model';
import { Laboratory } from './models/laboratory/laboratory.model';
import { ExamService } from './services/exam.service';
import { LaboratoryService } from './services/laboratory.service';

@Module({
  imports: [
    HttpModule,
    CommonModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Laboratory, Exam]),
  ],
  controllers: [ExamController],
  providers: [ExamService, LaboratoryService],
})
export class AppModule {}
