import express, { Request, Response } from 'express';
import { notizController } from '../../controllers';

export const router = express.Router({
  strict: true,
});

router.post('/', (req: Request, res: Response) => {
  notizController.create(req, res);
});
router.get('/', (req: Request, res: Response) => {
  notizController.read(req, res);
});
router.patch('/', (req: Request, res: Response) => {
  notizController.update(req, res);
});
router.delete('/:id', (req: Request, res: Response) => {
  notizController.delete(req, res);
});
