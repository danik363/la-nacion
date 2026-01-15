import { Router } from 'express';
import { calculateLifeQuote, calculateHomeQuote } from './controllers/quoteController';

const router = Router();

router.post('/quotes/life', calculateLifeQuote);
router.post('/quotes/home', calculateHomeQuote);

export default router;
