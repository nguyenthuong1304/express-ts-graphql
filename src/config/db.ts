import { QueryLogger } from '../infrastructure/services/logger/QueryLoggerService';
import { User } from '../api/models/User';
import { env } from '../utils/env';
import { LoggerService } from '../infrastructure/services/logger/LoggerService';

export const dbConfig: any = {
  type: env('DATABASE_TYPE') || 'postgres',
  host: env('DATABASE_HOST'),
  port: env('DATABASE_PORT'),
  username: env('DATABASE_USERNAME'),
  password: env('DATABASE_PASSWORD'),
  database: env('DATABASE_NAME'),
  synchronize: env('DATABASE_SYNC'),
  logging: env('DATABASE_LOGGING'),
  logger: new QueryLogger(new LoggerService()),
  entities: [User],
  migrations: [env('DATABASE_MIGRATIONS')],
  cli: { migrationsDir: 'src/database/migrations' },
  extra: env('DATABASE_DRIVER_EXTRA'),
};

export default dbConfig;
