import { AquarienController } from './aquarien.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AquarienController],
})

export class AquarienModule {
}