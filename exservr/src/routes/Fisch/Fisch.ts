import express, { Request, Response } from 'express';
import { fischController } from '../../controllers';

export const router = express.Router({
  strict: true,
});

router.post('/', (req: Request, res: Response) => {
  fischController.create(req, res);
});
router.get('/', (req: Request, res: Response) => {
  fischController.read(req, res);
});
router.patch('/', (req: Request, res: Response) => {
  fischController.update(req, res);
});
router.delete('/:id', (req: Request, res: Response) => {
  fischController.delete(req, res);
});
