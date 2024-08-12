import { LoyaltyTokenContract } from "./config";
import { Request, Response } from 'express'

/**
 * param { string: addressTokenHolder} 
 * @returns { uint: value}
 *
 */
export async function getTokenBalance(req: Request, res: Response) {
  const { addressTokenHolder } = req.body;
  if (!addressTokenHolder) {
    return res.status(400).json({ error: 'Missing the only param required' })
  }
  try {
    const tokenBal: Promise<number> = await LoyaltyTokenContract.read.getTokenBalance([
      addressTokenHolder
    ])

    if (tokenBal === undefined) {
      return res.status(500).json({ error: 'undefined balance,err' })
    } else {

      res.status(201).json(tokenBal)
      return tokenBal;
    }

  } catch (error) {

  }
}
