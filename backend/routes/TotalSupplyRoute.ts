import { getTotalTokenSupply } from "../controllers/totalSupplyController"
import { Request, Response } from 'express';


const router = require('express').Router()

router.get('/getTokenTotalSupply/:tokenAddr', (req: Request, res: Response) => getTotalTokenSupply(req, res))
