import { CrudController } from './CrudController';
import { Request, Response } from 'express';
import Repo from '../repo/repo';
import { Aquarium } from 'shared-types';

export class AquariumController extends CrudController {
  private repo: Repo<Aquarium>;

  constructor() {
    super();
    this.repo = new Repo<Aquarium>('aquarium');
  }

  async create(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): Promise<void> {
    const aquarium = req.body as Aquarium;
    const result = await this.repo.add(aquarium);
    res.send({...aquarium, id: result });
  }

  delete(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
  }

  async read(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): Promise<void> {
    const temp = await this.repo.get();
    const arr = temp.map(m => {
      return { name: m.name, liter: m.liter, id: m._id };
    });
    res.send(arr);
  }

  update(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
  }
}