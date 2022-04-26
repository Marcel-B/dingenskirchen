import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { Duengung } from 'shared-types';
import duengungRepo from '../../repos/duengungRepo';

@Controller('duengungen')
export class DuengungenController {
  constructor() {
  }

  @Get()
  async index() {
    const temp = await duengungRepo.get();
    return temp.map(m => {
      return { name: m.name, menge: m.menge, datum: m.datum, aquarium: m.aquarium, id: m._id };
    });
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await duengungRepo.remove(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() duengung: Duengung) {
    const id = await duengungRepo.add(duengung);
    return { menge: duengung.menge, datum: duengung.datum, typ: duengung.typ, aquarium: duengung.aquarium, id: id };
  }
}