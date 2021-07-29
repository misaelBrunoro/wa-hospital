import { HttpModule, Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { ExamService } from './services/exam.service';
import { LaboratoryService } from './services/laboratory.service';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [],
  providers: [ExamService, LaboratoryService],
})
export class AppModule {}
