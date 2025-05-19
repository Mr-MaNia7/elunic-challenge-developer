import { DataSource } from 'typeorm';
import { UserMessage } from '../app/models/user-message.entity';
import { join } from 'path';

export default new DataSource({
  type: 'mysql',
  host: process.env.APP_DB_HOST || 'localhost',
  port: parseInt(process.env.APP_DB_PORT || '3306'),
  username: process.env.APP_DB_USER || 'app',
  password: process.env.APP_DB_PASS || 'app',
  database: process.env.APP_DB_NAME || 'app',
  entities: [UserMessage],
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
  synchronize: false,
});
