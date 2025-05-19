import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.APP_DB_HOST || 'localhost',
      port: parseInt(process.env.APP_DB_PORT || '3306'),
      username: process.env.APP_DB_USER || 'app',
      password: process.env.APP_DB_PASS || 'app',
      database: process.env.APP_DB_NAME || 'app',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
