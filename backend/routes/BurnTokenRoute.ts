const router = require('express').Router()
import { Request, Response } from 'express'

import { BurnTokens } from "../controllers/burnTokensController"

router.post('/BurnTokens', (req: Request, res: Response) => BurnTokens(req, res))

