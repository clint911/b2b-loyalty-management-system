import { LoyaltyTokenContract } from "./config";
import { Request, Response } from 'express'

/**
 * @params { address _tokenAddress}
 * @returns { uint256 tokenAmount}
 *
 */
export async function getTotalTokenSupply(req: Request, res: Response) {
    const { tokenAddress, tokenAmount } = req.body;

    if (!tokenAddress) {
        return res.status(400).json({ error: 'missing required' })
    }

    try {
        const tokenAmount = await LoyaltyTokenContract.read.getTokenBalance([
            tokenAddress
        ])
        return res.status(201).json({ tokenAmount });
    } catch (error) {
        return res.status(500).json({ error: 'Error' })

    }
}
