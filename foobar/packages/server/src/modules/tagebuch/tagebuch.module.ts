import { TagebuchController } from './tagebuch.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TagebuchController],
})

export class TagebuchModule {
}