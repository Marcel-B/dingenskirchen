import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import Repo from '../../repos/repo';
import { Fisch } from 'shared-types';

@Controller('fische')
export class FischeController {
  repo: Repo<Fisch>;

  constructor() {
    this.repo = new Repo<Fisch>('fisch');
  }

  @Get()
  async index() {
    const temp = await this.repo.get();
    if (temp)
      return temp.map(m => {
        return { ...m, id: m._id };
      });
    return [];
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await this.repo.remove(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() fisch: Fisch) {
    const id = await this.repo.add(fisch);
    return { ...fisch, id };
  }
}
