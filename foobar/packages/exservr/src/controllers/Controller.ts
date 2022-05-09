import { CrudController } from './CrudController';
import { Request, Response } from 'express';
import Repo from '../repo/repo';

export class Controller<T> extends CrudController {
  private repo: Repo<T>;

  constructor(collectionName: string) {
    super();
    this.repo = new Repo<T>(collectionName);
  }

  async create(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): Promise<void> {
    const entity = req.body as T;
    const result = await this.repo.add(entity);
    res.send({ ...entity, id: result });
  }

  async delete(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): Promise<void> {
    const id = req.params.id;
    const result = await this.repo.remove(id);
    console.log('__Result', result);
    res.send(result);
  }

  async read(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): Promise<void> {
    const temp = await this.repo.get();
    const arr = temp?.map(m => {
      return { ...m, id: m._id };
    }) ?? [];
    res.send(arr);
  }

  update(req: Request<import('express-serve-static-core').ParamsDictionary>, res: Response): void {
  }
}