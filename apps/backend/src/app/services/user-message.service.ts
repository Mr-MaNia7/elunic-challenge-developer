import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMessage } from '../models/user-message.entity';
import { CreateUserMessageDto } from '../models/create-user-message.dto';

@Injectable()
export class UserMessageService {
  constructor(
    @InjectRepository(UserMessage)
    private readonly userMessageRepository: Repository<UserMessage>
  ) {}

  async create(
    createUserMessageDto: CreateUserMessageDto
  ): Promise<UserMessage> {
    const message = this.userMessageRepository.create(createUserMessageDto);
    return this.userMessageRepository.save(message);
  }
}
