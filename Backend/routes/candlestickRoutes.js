import express from 'express';
import { createCandlestickData, getCandlestickData } from '../controllers/candleStickController.js';

const router = express.Router();

router.get('/api/candlestick', getCandlestickData);

router.post('/api/candlestick', createCandlestickData);

export default router;