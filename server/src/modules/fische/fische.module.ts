import { Module } from '@nestjs/common';
import { FischeController } from './fische.controller';

@Module({
  controllers: [FischeController],
})

export class FischeModule {
}