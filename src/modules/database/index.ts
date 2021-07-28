import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

const ENV_FILE = dotenv.config().parsed || {};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: ENV_FILE.TYPEORM_HOST,
      port: parseInt(ENV_FILE.TYPEORM_PORT),
      username: ENV_FILE.TYPEORM_USERNAME,
      password: ENV_FILE.TYPEORM_PASSWORD,
      database: ENV_FILE.TYPEORM_DATABASE,
      entities: [],
    }),
  ],
})
export class DatabaseModule {}
