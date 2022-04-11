import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Messung } from 'shared-types';
import aquaRepo from '../../repos/aquaRepo';
import messungRepo from 'mongo/repos/messungRepo';

@Controller('messungen')
export class MessungenController {
  constructor() {
  }

  @Get()
  async index() {
    return await aquaRepo.get();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() messung: Messung) {
    return await messungRepo.add(messung);
  }
}