import { TransferTokens } from "../controllers/transferController";

import { Request, Response } from 'express'

const router = require('express').Router()

router.post('/Transfer/:from&to&money', (req: Request, res: Response) => TransferTokens(req, res))
