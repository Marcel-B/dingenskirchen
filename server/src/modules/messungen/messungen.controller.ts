import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import aquaRepo, { Messung } from '../../repos/aquaRepo';

interface CreateMessungDto {
  wert: number;
  typ: string;
}

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
  async create(@Body() createMessungDto: CreateMessungDto) {
    const messung: Messung = {
      wert: createMessungDto.wert,
      typ: createMessungDto.typ,
      zeitpunkt: new Date()
    }
    return await aquaRepo.add(messung);
  }
}