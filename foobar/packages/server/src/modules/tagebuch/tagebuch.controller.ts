import { Body, Controller, Get, Post } from '@nestjs/common';
import { Eintrag } from 'shared-types';
import Repo from '../../repos/repo';

@Controller('tagebuch')
export class TagebuchController {
  repo: Repo<Eintrag>;

  constructor() {
    this.repo = new Repo<Eintrag>('tagebuch');
  }

  @Get()
  async index() {
    const temp = await this.repo.get();
    return temp.map(e => {
        return { text: e.text, datum: e.datum, tag: e.tag, aquarium: e.aquarium, id: e._id };
      },
    );
  }

  @Post()
  async create(@Body() eintrag: Eintrag) {
  }
}