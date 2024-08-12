const router = require('express').Router()

import { CreateToken } from "../controllers/createTokenController"

router.post('/CreateToken', (req: Request, res: Response) => CreateToken(req, res))

