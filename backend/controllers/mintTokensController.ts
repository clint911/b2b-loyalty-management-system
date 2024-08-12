/**
 * @params {address to, uint256 amount} 
 * @returns {}
 */
import { Request, Response } from 'express'
import { LoyaltyTokenContract } from './config'

export async function mintTokens(req: Request, res: Response) {
    const { to, amount } = req.body;
    if (!to || !amount) {
        return res.status(400).json({ error: 'missing required' })
    }
    try {
        await LoyaltyTokenContract.write.mintTokens([
            to,
            amount
        ])
        return res.status(201);
    } catch (error) {
        res.status(500).json({ error: 'Error occured' })
    }



}
