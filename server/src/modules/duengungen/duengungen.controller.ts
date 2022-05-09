import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { Duengung } from 'shared-types';
import Repo from 'src/repos/repo';

@Controller('duengungen')
export class DuengungenController {
  repo: Repo<Duengung>;

  constructor() {
    this.repo = new Repo<Duengung>('duengung');
  }

  @Get()
  async index() {
    console.log("Duengung");
    const temp = await this.repo.get();
    return temp.map(m => {
      return {
        id: m._id,
        menge: m.menge,
        datum: m.datum,
        duenger: m.duenger,
        aquarium: m.aquarium,
      };
    });
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await this.repo.remove(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() duengung: Duengung) {
    const id = await this.repo.add(duengung);
    return {
      id: id,
      menge: duengung.menge,
      datum: duengung.datum,
      duenger: duengung.duenger,
      aquarium: duengung.aquarium,
    };
  }
}