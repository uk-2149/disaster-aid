import express from 'express';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'You have access!', user: (req as any).user });
});

export default router;
