const router = require('express').Router()
import { Request, Response } from 'express'

import { mintTokens } from "../controllers/mintTokensController"

router.post('/mintTokens', (req: Request, res: Response) => mintTokens(req, res))
