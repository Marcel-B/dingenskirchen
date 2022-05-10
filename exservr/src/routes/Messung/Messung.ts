import express, { Request, Response } from 'express';
import { messungController } from '../../controllers';

export const router = express.Router({
  strict: true,
});

router.post('/', (req: Request, res: Response) => {
  messungController.create(req, res);
});
router.get('/', (req: Request, res: Response) => {
  messungController.read(req, res);
});
router.patch('/', (req: Request, res: Response) => {
  messungController.update(req, res);
});
router.delete('/:id', (req: Request, res: Response) => {
  messungController.delete(req, res);
});
