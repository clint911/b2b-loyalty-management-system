import { Request, Response } from 'express'
import { LoyaltyTokenContract, publicClient } from './config';
/**
 *@params { address _account, uint256 _value} 
 *
 */
export async function BurnTokens(req: Request, res: Response) {
    const { _account, _value } = req.body;
    if (!_account || !_value) {
        return res.status(400).json({ error: 'Missing required' })
    }
    try {
        await LoyaltyTokenContract.write.BurnTokens([
            _account,
            _value
        ])
        return res.status(201).json()
    } catch (error) {
        return res.status(500).json({ error: 'Serious Error brother' })

    }
}
/**Logic for Burning Tokens as part of Tokenomics **/
async function burningTokensHandler() {
    //conditions for burning tokens 
}
