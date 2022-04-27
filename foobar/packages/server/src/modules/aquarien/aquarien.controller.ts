import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { Aquarium } from 'shared-types';
import Repo from '../../repos/repo';

@Controller('aquarien')
export class AquarienController {
  repo: Repo<Aquarium>;

  constructor() {
    this.repo = new Repo<Aquarium>('aquarium');
  }

  @Get()
  async index() {
    const temp = await this.repo.get();
    return temp.map(m => {
      return { name: m.name, liter: m.liter, id: m._id };
    });
  }

  @Delete(':id')
  async delete(@Param() params) {
    return await this.repo.remove(params.id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() aquarium: Aquarium) {
    const id = await this.repo.add(aquarium);
    return { name: aquarium.name, liter: aquarium.liter, id };
  }
}