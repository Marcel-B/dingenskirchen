import { CrudController } from './CrudController';
import { Request, Response } from 'express';
import Repo from '../repo/repo';
import { Aquarium } from 'shared-types';

export class AquariumController extends CrudController {
  create(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
  }

  delete(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
  }

  async read(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): Promise<void> {
    const repo = new Repo<Aquarium>('aquarium');
    const temp = await repo.get();
    const arr = temp.map(m => {
      return { name: m.name, liter: m.liter, id: m._id };
    });
    res.send(arr);
  }

  update(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
  }
}