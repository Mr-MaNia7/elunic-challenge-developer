import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserMessage } from './models/user-message.entity';
import { UserMessageService } from './services/user-message.service';
import { UserMessageController } from './controllers/user-message.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.APP_DB_HOST || 'localhost',
      port: parseInt(process.env.APP_DB_PORT || '3306'),
      username: process.env.APP_DB_USER || 'app',
      password: process.env.APP_DB_PASS || 'app',
      database: process.env.APP_DB_NAME || 'app',
      entities: [UserMessage],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([UserMessage]),
  ],
  controllers: [AppController, UserMessageController],
  providers: [AppService, UserMessageService],
})
export class AppModule {}
