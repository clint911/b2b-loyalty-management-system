const router = require('express').Router()
import { Request, Response } from 'express';
import { getTokenBalance } from "../controllers/getTokenBalanceController";

router.get('/getTokenBalance/:acc_addr', (req: Request, res: Response) => getTokenBalance(req, res));

