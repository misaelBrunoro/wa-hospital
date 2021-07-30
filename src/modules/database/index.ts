import {
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Connection, getConnectionManager } from 'typeorm';

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
      logging: true,
      autoLoadEntities: true,
      migrations: ['./src/modules/database/migrations/*.ts'],
      cli: {
        migrationsDir: './src/modules/database/migrations/',
      },
    }),
  ],
})
export class DatabaseModule
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private connection: Connection;

  public async onApplicationBootstrap() {
    const connectionManager = getConnectionManager();
    if (connectionManager.has('default')) {
      this.connection = connectionManager.get('default');
      await this.connection.runMigrations({
        transaction: 'all',
      });
      console.log('DATABASE READY');
    }
  }

  public async onApplicationShutdown() {
    await this.connection.close();
  }
}
