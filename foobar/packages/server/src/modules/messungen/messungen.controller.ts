import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Messung } from 'shared-types';
import messungRepo from '../../repos/messungRepo';

@Controller('messungen')
export class MessungenController {
  constructor() {
  }

  @Get()
  async index() {
    const temp = await messungRepo.get();
    return temp.map(m => {
      return { wert: m.wert, datum: m.datum, aquarium: m.aquarium, typ: m.typ, id: m._id };
    });
  }

  @Post()
  @HttpCode(201)
  async create(@Body() messung: Messung) {
    console.log('add messung');
    const id = await messungRepo.add(messung);
    return { wert: messung.wert, datum: messung.datum, aquarium: messung.aquarium, typ: messung.typ, id };
  }
}