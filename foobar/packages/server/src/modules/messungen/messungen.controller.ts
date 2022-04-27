import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Messung } from 'shared-types';
import Repo from '../../repos/repo';

@Controller('messungen')
export class MessungenController {
  repo: Repo<Messung>;

  constructor() {
    this.repo = new Repo<Messung>('messung');
  }

  @Get()
  async index() {
    console.log("Messung");
    const temp = await this.repo.get();
    return temp.map(m => {
      return {
        id: m._id,
        menge: m.menge,
        datum: m.datum,
        wert: m.wert,
        aquarium: m.aquarium,
      };
    });
  }

  @Post()
  @HttpCode(201)
  async create(@Body() messung: Messung) {
    const id = await this.repo.add(messung);
    return {
      id,
      menge: messung.menge,
      datum: messung.datum,
      wert: messung.wert,
      aquarium: messung.aquarium,
    };
  }
}