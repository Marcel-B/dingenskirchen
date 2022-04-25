import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { Aquarium } from 'shared-types';
import aquariumRepo from '../../repos/aquariumRepo';

@Controller('aquarien')
export class AquarienController {
  constructor() {
  }

  @Get()
  async index() {
    const temp = await aquariumRepo.get();
    return temp.map(m => {
      return { name: m.name, liter: m.liter, id: m._id };
    });
  }

  @Delete(':id')
  async delete(@Param() params) {
    const temp = await aquariumRepo.remove(params.id);
    return temp;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() aquarium: Aquarium) {
    console.log('add aquarium');
    const id = await aquariumRepo.add(aquarium);
    return { name: aquarium.name, liter: aquarium.liter, id };
  }
}