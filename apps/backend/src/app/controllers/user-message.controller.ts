import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserMessageService } from '../services/user-message.service';
import { CreateUserMessageDto } from '../models/create-user-message.dto';
import { UserMessage } from '../models/user-message.entity';
import { ValidationPipe } from '@nestjs/common';

@Controller('messages')
export class UserMessageController {
  constructor(private readonly userMessageService: UserMessageService) {}

  @Post()
  async create(
    @Body(new ValidationPipe({ whitelist: true }))
    createUserMessageDto: CreateUserMessageDto
  ): Promise<UserMessage> {
    return this.userMessageService.create(createUserMessageDto);
  }

  @Get()
  async findAll(): Promise<UserMessage[]> {
    return this.userMessageService.findAll();
  }
}
