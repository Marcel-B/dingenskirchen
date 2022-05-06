import express, { Request, Response } from 'express';
import { aquariumController } from '../../controllers';

export const router = express.Router({
  strict: true,
});

router.post('/', (req: Request, res: Response) => {
  aquariumController.create(req, res);
});
router.get('/', (req: Request, res: Response) => {
  aquariumController.read(req, res);
});
router.patch('/', (req: Request, res: Response) => {
  aquariumController.update(req, res);
});
router.delete('/', (req: Request, res: Response) => {
  aquariumController.delete(req, res);
});
