import express, { Request, Response } from 'express';
import { duengungController } from '../../controllers';

export const router = express.Router({
  strict: true,
});

router.post('/', (req: Request, res: Response) => {
  duengungController.create(req, res);
});
router.get('/', (req: Request, res: Response) => {
  duengungController.read(req, res);
});
router.patch('/', (req: Request, res: Response) => {
  duengungController.update(req, res);
});
router.delete('/:id', (req: Request, res: Response) => {
  duengungController.delete(req, res);
});
