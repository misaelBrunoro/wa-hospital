import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

const ENV_FILE = dotenv.config().parsed || {};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ENV_FILE.TYPEORM_HOST,
      port: parseInt(ENV_FILE.DATABASE_PORT),
      username: ENV_FILE.TYPEORM_USERNAME,
      password: ENV_FILE.TYPEORM_PASSWORD,
      database: ENV_FILE.TYPEORM_DATABASE,
      synchronize: false,
      logging: true,
      autoLoadEntities: true,
      migrations: ['./dist/modules/database/migrations/*.js'],
      cli: {
        migrationsDir: './dist/modules/database/migrations/',
      },
    }),
  ],
})
export class DatabaseModule {}
