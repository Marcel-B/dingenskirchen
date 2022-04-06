import { MessungenController } from './messungen.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MessungenController],
})

export class MessungenModule {
}